# Weakly Discriminative, Not Repaired by Profile Injection, and Manipulable: Self-Confidence in LLM Evaluation

**Vadym Chernets**, Independent Researcher · ORCID [0009-0007-4845-3163](https://orcid.org/0009-0007-4845-3163)

*Accepted as a poster at the NeurIPS 2026 workshop "TAE (Trust-AI-Eval): Can We Trust AI Evaluation?", Sydney, December 2026. The workshop is non-archival.*

Evaluation pipelines increasingly consume a model’s own stated confidence as a trust signal—as a judge-reliability weight, an abstention trigger, or a self-reported competence profile. We test whether that signal deserves the weight, using a pre-registered, protocol-frozen collection (16 models—one budget/mid-tier API model from each of nine providers, plus seven local open-weights; 22,248 graded answers at temperature zero with stated 0–100 confidence). Four findings. (1) Overconfidence is consistent across all sixteen evaluated models: typical stated confidence sits at 85–95 for seven of nine API models while accuracy spans 16.5–66.5%, and 60.1% of frontier answers stated with confidence $`\geq`$<!-- -->80 are wrong. (2) Self-confidence is weakly discriminative: its AUROC for predicting the model’s own correctness spans 0.532–0.788 and sits below 0.62 for six of nine models. (3) A panel of independent models reaches AUROC 0.832 where self-assessment gives 0.545 ($`\Delta`$ $`+0.287`$, 95% CI $`[+0.265, +0.309]`$); under a stricter label-free recoding of panel agreement the panel still leads (0.775 vs. 0.545). (4) Injecting the model’s own measured per-domain accuracy profile did not demonstrably improve discrimination on the one confirmatory rung of a placebo-controlled single-vendor ladder ($`\Delta`$AUROC $`+0.041`$, Holm-adjusted $`p = 0.085`$), while the same injection channel is causally manipulable: a false profile drove an exploratory rung’s self-assessment AUROC to chance level (0.474) and, once items are topic-labeled, degraded calibration in four of five local models. We conclude that self-assessed confidence, as currently elicited and measured here on verbalized integer confidence in open-form factual recall, is a target for measurement, not an input to trust: harnesses that ingest self-reported competence inherit an unauthenticated input channel. The three clauses of the title rest on different evidence and we label them as such throughout: *weakly discriminative* is confirmatory across sixteen models; *not repaired by profile injection* is one confirmatory rung on one vendor family, underpowered for the effect observed; *manipulable* is exploratory, with the causal direction shown on matched items but no tested attack on a deployed harness. Judge-style self-assessment, where a model rates another model’s answer, is a different task and is not tested here.

## Where this paper lives

| | |
|---|---|
| **Archived, citable** | [10.5281/zenodo.23197651](https://doi.org/10.5281/zenodo.23197651) (concept DOI, always the latest version) |
| **Full text here** | [paper.md](paper.md) |
| **PDF here** | [self-confidence-evaluation.pdf](self-confidence-evaluation.pdf) |
| **Pre-registration and replication package** | [osf.io/4y9dv](https://osf.io/4y9dv) |

The workshop does not publish proceedings, so the Zenodo record is the citable version. Cite it.

## The companion paper

[*Verification Theater: Measured Failure Modes of AI Verifier Panels*](../verification-theater) rests on the same frozen registration and blind collection. It measures the failure regimes of the panel-based alternative that this paper points to.

## Code in this folder

`oracle_auroc.py` reproduces the oracle-ceiling numbers in Section 5 (standard library only). The per-item scored rows it reads are in `data/` (four subjects, one row per item, arm and replicate). Run: `python3 oracle_auroc.py data`.

## Keywords

LLM confidence; verbalized confidence; calibration; discrimination; AUROC; AI evaluation; self-assessment; profile injection; preregistration

## Licence

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
