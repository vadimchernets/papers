// Reference verifier for agent decision receipts .
// usage: node verify.mjs            -> builds fixtures from ./receipts, runs honest cases and attacks, prints a report
// No dependencies: Node's built-in Ed25519 and SHA-256.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const or2 = null; // receipts are read from ./receipts/*.json
const base = ['A','B','C'].map(c => JSON.parse(fs.readFileSync(path.join(here, 'receipts', `case-${c}.json`), 'utf8')));

// ---------- primitives ----------
const canon = v => Array.isArray(v) ? '[' + v.map(canon).join(',') + ']'
  : v && typeof v === 'object' ? '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'
  : JSON.stringify(v);
const sha = v => 'sha256:' + crypto.createHash('sha256').update(typeof v === 'string' ? v : canon(v)).digest('hex');
const keys = () => crypto.generateKeyPairSync('ed25519');
const sign = (obj, k) => crypto.sign(null, Buffer.from(canon(obj)), k.privateKey).toString('base64');
const verifySig = (obj, sig, pub) => { try { return crypto.verify(null, Buffer.from(canon(obj)), pub, Buffer.from(sig, 'base64')); } catch { return false; } };
const clone = o => structuredClone(o);

const producer = keys(), attestor = keys(), rogue = keys();

// ---------- the parties' own documents (mandates, orders) and the attestor's catalog snapshot ----------
const mandates = [
  { id: 'A', constraints: [{ attr: 'price_usd', op: '<', value: 150 }, { attr: 'color', op: '==', value: 'black' }, { attr: 'size', op: '==', value: 42 }] },
  { id: 'B', constraints: [{ attr: 'price_usd', op: '<', value: 200 }, { attr: 'delivery_by', op: '<=', value: '2026-05-10' }] },
  { id: 'C', constraints: [{ attr: 'compatible_with', op: '==', value: 'AquaPure X' }, { attr: 'price_usd', op: '<', value: 30 }] },
];
const orders = base.map(r => ({ item: r.selected_option.id, receipt_case: r.receipt_id }));

// The attestor queries the recorded sources at purchase time and keeps the responses.
const snapshotOf = r => r.consideration_set.map(o => ({ ...o }));
const passes = (o, m) => m.constraints.every(c => c.attr in o ? (c.op === '<' ? o[c.attr] < c.value : c.op === '<=' ? o[c.attr] <= c.value : o[c.attr] === c.value) : c.attr === 'compatible_with');
const STOP = new Set(['a','an','the','of','among','options','option','score','lower','higher','lowest','highest','than','preferred','with','for']);
const words = s => s.toLowerCase().split(/[^a-z]+/).filter(w => w.length > 2 && !STOP.has(w));
const sharesWord = (a, b) => words(a).some(w => words(b).includes(w));

// Blind checks: each model checker registers the hash of its answer with the attestor before the agent's choice is
// revealed to it (commit-reveal). The commitment, not the producer's `blind` field, establishes blindness.
const commitBefore = r => new Date(new Date(r.created_at).getTime() - 120000).toISOString();
function commitments(r, at = commitBefore) {
  return (r.verification_paths || []).filter(p => /model/.test(p.path) && p.blind === true).map(p => {
    const c = { path: p.path, answer_hash: sha(p.result), committed_at: typeof at === 'function' ? at(r) : at };
    return { ...c, sig: sign(c, attestor) };
  });
}

function issue(receipt, i, { createdAt, attest = true, commitAt } = {}) {
  const r = clone(receipt);
  r.binding.mandate_hash = sha(mandates[i]);
  r.binding.order_hash = sha(orders[i]);
  if (createdAt) r.created_at = createdAt;
  delete r.signature;
  const body = clone(r);
  const producerSig = sign(body, producer);
  const snapshot = snapshotOf(receipt);
  const att = attest ? { receipt_hash: sha(body), snapshot_hash: sha(snapshot), attested_at: receipt.created_at,
    sig: null } : null;
  if (att) att.sig = sign({ receipt_hash: att.receipt_hash, snapshot_hash: att.snapshot_hash, attested_at: att.attested_at }, attestor);
  return { body, producerSig, att, snapshot, mandate: mandates[i], order: orders[i], commits: commitments(receipt, commitAt) };
}

// ---------- checks an adjudicator's tool runs ----------
function check({ body, producerSig, att, snapshot, mandate, order, commits = [] }) {
  const out = [];
  const add = (name, ok, note = '') => out.push({ name, ok, note });
  add('signature', verifySig(body, producerSig, producer.publicKey), 'producer signature over the receipt');
  add('binding', body.binding.mandate_hash === sha(mandate) && body.binding.order_hash === sha(order),
    'hashes recomputed from the mandate and order the parties supply');
  if (att) {
    const attOk = verifySig({ receipt_hash: att.receipt_hash, snapshot_hash: att.snapshot_hash, attested_at: att.attested_at }, att.sig, attestor.publicKey);
    add('timestamp', attOk && att.receipt_hash === sha(body), 'receipt registered with the attestor at purchase time');
    if (attOk && snapshot && sha(snapshot) === att.snapshot_hash) {
      const listed = new Set(body.consideration_set.map(o => o.id));
      const missing = snapshot.filter(o => passes(o, mandate) && !listed.has(o.id)).map(o => o.id);
      const repriced = body.consideration_set.filter(o => { const s = snapshot.find(x => x.id === o.id); return s && s.price_usd !== o.price_usd; }).map(o => o.id);
      add('coverage', missing.length === 0 && repriced.length === 0,
        missing.length ? `compliant option(s) omitted: ${missing}` : repriced.length ? `price differs from snapshot: ${repriced}` : 'consideration set matches the attested snapshot');
    }
  } else add('timestamp', false, 'no independent registration: created_at is the producer\'s claim only');
  // faithfulness indicators (they inform the adjudicator; they do not decide the case)
  const crit = (body.criteria || []).map(c => c.criterion);
  const sel = body.consideration_set.find(o => o.id === body.selected_option.id);
  // a rejection is consistent if the option fails a mandate constraint or the reason names a recorded criterion
  const flagged = (body.rejected_alternatives || []).filter(a => {
    const o = body.consideration_set.find(x => x.id === a.id);
    const named = mandate.constraints.map(c => `${c.attr} ${c.value}`.replace(/_/g, ' '));
    return o && passes(o, mandate) && !crit.some(c => sharesWord(c, a.reason)) && !named.some(c => sharesWord(c, a.reason));
  });
  add('criteria', flagged.length === 0,
    flagged.length ? `compliant option(s) rejected for a reason that matches no recorded criterion: ${flagged.map(a => `${a.id} ("${a.reason}")`)}` : 'rejections consistent with mandate and recorded criteria');
  add('relationships', !(body.commercial_relationships || []).some(c => c.option === sel.id), (body.commercial_relationships || []).map(c => c.type).join(', ') || 'none disclosed');
  const paths = body.verification_paths || [];
  const models = paths.filter(p => /model/.test(p.path));
  const notBlind = models.filter(p => p.blind !== true);
  // a check declared blind counts as blind only with an attestor-signed commitment of its answer made before the choice
  const unproven = models.filter(p => p.blind === true && !commits.some(c => c.path === p.path && c.answer_hash === sha(p.result)
    && verifySig({ path: c.path, answer_hash: c.answer_hash, committed_at: c.committed_at }, c.sig, attestor.publicKey)
    && new Date(c.committed_at) < new Date(body.created_at)));
  add('blind checks', notBlind.length === 0 && unproven.length === 0,
    notBlind.length ? `model check(s) saw the agent's choice or did not say: ${notBlind.map(p => p.path)}`
      : unproven.length ? `declared blind, but no commitment of the answer before the choice: ${unproven.map(p => p.path)}` : 'all model checks blind (committed before the choice) or none');
  const singleSource = (body.flags || []).some(f => f.flag === 'single_source_agreement');
  add('single source', !singleSource, singleSource ? 'all paths rest on one source; check the attribute elsewhere' : 'no single-source agreement');
  return out;
}

// ---------- run ----------
const [A, B, C] = base;
// mark the model checks in the OR2 receipts as blind (as OR2 now records)
for (const r of base) for (const p of r.verification_paths || []) if (/model/.test(p.path) && p.blind === undefined) p.blind = true;

const cases = [];
cases.push(['Case A, honest receipt (D3a)', issue(A, 0)]);
cases.push(['Case B, honest receipt (D4)', issue(B, 1)]);
cases.push(['Case C, honest receipt (D3b)', issue(C, 2)]);
{ // T1: a field altered after signing
  const x = issue(A, 0); x.body.selected_option.main_reason = 'lowest price'; cases.push(['T1 field altered after signing', x]); }
{ // T2: receipt presented against a different mandate (cap raised to $200)
  const x = issue(A, 0); x.mandate = { ...mandates[0], constraints: [{ attr: 'price_usd', op: '<', value: 200 }, ...mandates[0].constraints.slice(1)] }; cases.push(['T2 receipt bound to a different mandate', x]); }
{ // T3: strategic omission: the $95 option is dropped and a plausible reason given, then honestly signed
  const r = clone(A); r.consideration_set = r.consideration_set.filter(o => o.id !== 'velo-runner');
  r.rejected_alternatives = [{ id: 'pace-lite', reason: 'higher customer rating preferred' }]; r.criteria = [{ criterion: 'higher customer rating preferred', source: 'default', weight: 'primary' }];
  const x = issue(r, 0); x.snapshot = snapshotOf(A); x.att = issue(A, 0).att;   // the attestor saw the real catalog
  x.att = { ...x.att, receipt_hash: sha(x.body) }; x.att.sig = sign({ receipt_hash: x.att.receipt_hash, snapshot_hash: x.att.snapshot_hash, attested_at: x.att.attested_at }, attestor);
  cases.push(['T3 compliant option omitted, plausible reason', x]); }
{ // T4: back-dated re-issue: altered receipt re-signed by the producer with the original date
  const orig = issue(A, 0); const r = clone(A); r.selected_option.main_reason = 'closest match to stated style';
  const x = issue(r, 0, { attest: false }); x.att = orig.att; cases.push(['T4 receipt re-issued later with the original date', x]); }
{ // T5: a "second opinion" that saw the agent's choice
  const r = clone(C); r.verification_paths[0].blind = false; cases.push(['T5 model check not blind', issue(r, 2)]); }
{ // T6: forged producer signature
  const x = issue(B, 1); x.producerSig = sign(x.body, rogue); cases.push(['T6 signature by another key', x]); }
{ // T7: a check falsely declared blind: its answer was committed only after the agent's choice was shown to it
  const x = issue(C, 2, { commitAt: r => new Date(new Date(r.created_at).getTime() + 60000).toISOString() });
  cases.push(['T7 check falsely declared blind', x]); }

const rows = cases.map(([name, x]) => [name, check(x)]);
let md = '| Case | Integrity checks (signature, binding, timestamp, coverage) | Faithfulness indicators |\n|---|---|---|\n';
const integ = ['signature', 'binding', 'timestamp', 'coverage'];
for (const [name, res] of rows) {
  const bad = res.filter(r => !r.ok);
  const i = bad.filter(r => integ.includes(r.name)).map(r => `${r.name}: ${r.note}`);
  const f = bad.filter(r => !integ.includes(r.name)).map(r => `${r.name}: ${r.note}`);
  md += `| ${name} | ${i.length ? i.join('; ') : 'all pass'} | ${f.length ? f.join('; ') : 'none'} |\n`;
}
console.log(md);
fs.writeFileSync(path.join(here, 'RESULTS.md'), `# Reference verifier: results\n\nGenerated by \`node verify.mjs\` (Node ${process.version}). Keys are generated afresh on each run; results do not depend on them.\n\n` + md);
