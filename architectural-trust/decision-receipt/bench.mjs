// Size and time of agent decision receipts by evidence tier .
// usage: node bench.mjs   -> prints a Markdown table
// Builds receipts from Case A of Online Resource 2 with consideration sets of 5, 30, and 100 options,
// applies selective disclosure (a salted SHA-256 hash per top-level field, as in SD-JWT),
// signs with Ed25519, and measures size (raw and gzip) and signing and verification time.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const or2 = null; // receipts are read from ./receipts/*.json
const A = ['A','B','C'].map(c => JSON.parse(fs.readFileSync(path.join(here, 'receipts', `case-${c}.json`), 'utf8')))[0];

const canon = v => Array.isArray(v) ? '[' + v.map(canon).join(',') + ']'
  : v && typeof v === 'object' ? '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'
  : JSON.stringify(v);
const h = s => crypto.createHash('sha256').update(s).digest('base64url');
const key = crypto.generateKeyPairSync('ed25519');

// Light tier (DR8): mandate hash, selected item, closest alternative.
const LIGHT = ['receipt_id', 'created_at', 'producer', 'binding', 'selected_option', 'rejected_alternatives', 'commercial_relationships', 'flags', 'evidence_tier', 'disclosure_map'];

function receipt(tier, n) {
  const r = structuredClone(A);
  r.evidence_tier = tier;
  r.consideration_set = Array.from({ length: n }, (_, i) => ({
    id: `option-${String(i).padStart(3, '0')}`, price_usd: 90 + (i * 7) % 80, color: 'black', size: 42,
    merchant: `merchant-${i % 6}`, rating: 3.5 + (i % 15) / 10, delivery_days: 2 + i % 6,
    source: `sha256:${h('catalog' + i)}` }));
  const ids = r.consideration_set.map(o => o.id);
  r.constraints_applied = r.constraints_applied.map(c => ({ ...c, pass: ids, fail: [] }));
  r.search_scope.response_hashes = Array.from({ length: Math.ceil(n / 10) }, (_, i) => 'sha256:' + h('page' + i));
  if (tier === 'full') {
    r.verification_paths.push({ path: 'second_model', result: 'agrees', independence: 'different model', blind: true, confidence: 0.9, source: 'manufacturer data' });
    r.instruction_context.disclosable_excerpts = ['black running shoes, size 42, under $150', 'nothing too flashy'];
  }
  if (tier === 'light') for (const k of Object.keys(r)) if (!LIGHT.includes(k)) delete r[k];
  delete r.signature;
  return r;
}

// Selective disclosure: each field becomes a salted hash in the signed payload; disclosures travel separately.
function sdIssue(r) {
  const disclosures = Object.entries(r).map(([k, v]) => Buffer.from(JSON.stringify([crypto.randomBytes(16).toString('base64url'), k, v])).toString('base64url'));
  const payload = { _sd: disclosures.map(h).sort(), _sd_alg: 'sha-256' };
  const sig = crypto.sign(null, Buffer.from(canon(payload)), key.privateKey).toString('base64url');
  return { payload, sig, disclosures, token: [Buffer.from(canon(payload)).toString('base64url'), sig, ...disclosures].join('~') };
}
function sdVerify({ payload, sig, disclosures }) {
  if (!crypto.verify(null, Buffer.from(canon(payload)), key.publicKey, Buffer.from(sig, 'base64url'))) return false;
  const set = new Set(payload._sd);
  return disclosures.every(d => set.has(h(d)));
}
const time = (f, reps) => { const t = process.hrtime.bigint(); for (let i = 0; i < reps; i++) f(); return Number(process.hrtime.bigint() - t) / 1e6 / reps; };

const rows = [];
{ const w = sdIssue(receipt('standard', 30)); for (let i = 0; i < 2000; i++) { sdIssue(receipt('light', 5)); sdVerify(w); } } // warm-up
for (const [tier, n] of [['light', 5], ['standard', 5], ['standard', 30], ['full', 30], ['full', 100]]) {
  const r = receipt(tier, n);
  const sd = sdIssue(r);
  const kb = b => (b / 1024).toFixed(1);
  const raw = Buffer.byteLength(sd.token), gz = zlib.gzipSync(sd.token).length;
  const reps = 500;
  const tSign = time(() => sdIssue(r), reps), tVer = time(() => sdVerify(sd), reps);
  rows.push(`| ${tier} | ${tier === 'light' ? '–' : n} | ${kb(Buffer.byteLength(JSON.stringify(r)))} | ${kb(raw)} | ${kb(gz)} | ${tSign.toFixed(2)} | ${tVer.toFixed(2)} | ${(gz * 1e6 / 1024 ** 3).toFixed(1)} |`);
}
console.log(`Node ${process.version}, ${process.platform} ${process.arch}, ${new Date().toISOString().slice(0, 10)}; mean of 500 runs\n`);
console.log('| Tier | Options in consideration set | Plain JSON, KB | Signed with selective disclosure, KB | Same, gzip, KB | Issue (hash + sign), ms | Verify, ms | Storage per million receipts, GB (gzip) |');
console.log('|---|---|---|---|---|---|---|---|');
console.log(rows.join('\n'));
