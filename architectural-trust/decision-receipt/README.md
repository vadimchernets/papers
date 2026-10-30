# Agent decision receipt: reference verifier, schema, and example receipts

Companion code for *Architectural Trust* (Chernets, SSRN 7191261, version of 30 October 2026, REV12), section "Decision evidence at dispute time".

An **agent decision receipt** is a signed record, produced when an AI agent commits to a purchase, of the options it considered, the criteria it applied and their sources, the closest rejected alternatives, any commercial relationship, and the checks the choice passed. It is bound by hash to the agent credential, the signed mandate, and the final order.

## Contents

| File | What it is |
|---|---|
| `receipt.schema.json` | JSON Schema (2020-12) of the receipt: fields, independence classes, evidence tiers |
| `receipts/case-A.json` | In-mandate steering (dispute class D3a): a sponsored $149 pair over an identical $95 pair |
| `receipts/case-B.json` | Remorse (D4): a faithful choice the consumer later regrets |
| `receipts/case-C.json` | Shared error on a single source (D3b): every check relied on one product description |
| `verify.mjs` | Signs the receipts (Ed25519), registers them with a simulated attestor that keeps a snapshot of the queried catalog, runs the adjudicator's checks, and runs seven attacks |
| `bench.mjs` | Size and time of receipts by evidence tier (light, standard, full) with selective disclosure |

## Run

Node.js 18 or later, no dependencies:

```
node verify.mjs
node bench.mjs
```

`verify.mjs` prints, for each honest receipt and each attack, which integrity checks pass and which faithfulness indicators it raises. Seven attacks are run: a field altered after signing, a receipt presented against a different mandate, a compliant option omitted with a plausible reason, a receipt re-signed later with its original date, a second-opinion model that saw the agent's choice, a signature by another key, and a check falsely declared blind (its answer committed only after the choice was shown). Each triggers the check designed for it; the honest receipts pass every integrity check. Blindness is established by commit-reveal: the checker's answer hash is registered with the attestor before the agent's choice is shown to it.

`bench.mjs` reports, on the machine it runs on, the size of a signed receipt with selective disclosure (about 2 KB at the light tier, 5 to 33 KB at the standard and full tiers with 5 to 100 options) and the time to issue and verify one (well under a millisecond).

## Licence

Code: MIT (see `LICENSE`). Schema and example receipts: CC BY 4.0.
