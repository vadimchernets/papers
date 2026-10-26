# Verification Theater: Measured Failure Modes of AI Verifier Panels

**Vadym Chernets**, Independent Researcher · ORCID [0009-0007-4845-3163](https://orcid.org/0009-0007-4845-3163)

*Accepted as a poster at the NeurIPS 2026 workshop "Who Verifies the Agents? Toward Reliable Agent Development", Sydney, December 2026. The workshop is non-archival.*

Multi-agent verification is becoming a default trust mechanism: an answer is trusted because independent models agree on it. Using a pre-registered, blind collection in which sixteen models (nine API, mostly mid-tier; seven local) answered the same 1,500 SimpleQA questions, plus a 750-question TruthfulQA multiple-choice arm and an exploratory dialogue arm, we measure when panel verification stops working while continuing to look like it works—verification theater. We report three measured failure regimes and one exploratory one. First, a difficulty inversion: under population difficulty (ranked by all sixteen models) the certification lift of agreement is 2.7–4.6× on the three easiest quintiles, 0.82× on the second-hardest, and zero on the hardest: 0 of 342 replicated answers correct (106 unique questions; ≈13 expected at the stratum's base rate). Under leave-panel-out difficulty (the 13 non-panel models), the pooled inversion disappears (78/354 correct, lift 2.36×), while the zero persists for the cross-bloc panel (0/116). Here, agreement fails as certification on what the deployed population finds hard, and for the cross-bloc panel under panel-independent difficulty too. These panels are mid-tier: in a post hoc re-analysis of a companion flagship collection (5 August 2026 snapshot), a gpt-5.6-sol + claude-fable-5 pair agreed on 37 of the 106 zero-stratum questions and 34 of its agreed answers were correct, so the zero is measured for mid-tier panels only (with a benchmark-exposure caveat). Second, under multiple choice (local tier), panels unanimously and confidently certified a wrong answer on 4.0–7.2% of questions, versus 1.5–4.6% on the same tier's open-form and 0.3–4.9% for the API-tier open-form; as the formats come from different benchmarks, a same-question swap would be the direct test of format. Third, independence labels fail: geopolitical bloc showed no detectable effect on error correlation (φ 0.2854 intra- vs. 0.2736 cross-bloc; p = .210), and in the pairs measured neither did lineage: the same-base distilled pair ranked 14th of 15 US/CN local pairs (ordered from most to least correlated; φ = 0.135). Fourth, in an exploratory conformity arm, verifiers that had disagreed blind endorsed the answer in 38.5% of cases once shown it as a colleague's; a reverse-prompt control on local models shows these flips track the presence of a proposed answer, not its truth (38.9% toward wrong vs. 34.7% toward correct; McNemar p = .012). We derive a measurement discipline that separates verification from theater.

## Where this paper lives

| | |
|---|---|
| **Archived, citable** | [10.5281/zenodo.23197641](https://doi.org/10.5281/zenodo.23197641) (concept DOI, always the latest version) |
| **Full text here** | [paper.md](paper.md) |
| **PDF here** | [verification-theater.pdf](verification-theater.pdf) |
| **Pre-registration and replication package** | [osf.io/4y9dv](https://osf.io/4y9dv) |

The workshop does not publish proceedings, so the Zenodo record is the citable version. Cite it.

## Accepted at NeurIPS 2026 workshop

Accepted (poster) at NeurIPS 2026 Workshop “Who Verifies the Agents? Toward Reliable Agent Development”.

- [NeurIPS page](https://neurips.cc/virtual/2026/loc/sydney/173020)
- [OpenReview](https://openreview.net/forum?id=Mg9RtDWcK4)
- [OpenReview profile](https://openreview.net/profile?id=~Vadym_Chernets1)

## The companion paper

[*Weakly Discriminative, Not Repaired by Profile Injection, and Manipulable*](../self-confidence-evaluation) rests on the same frozen registration and blind collection. It measures the self-confidence signal that panels are meant to replace; this paper measures where the panels themselves fail.

## Code (reference implementation)

An open-source reference implementation of cross-lab verification on a smartphone (ChatGPT and Claude side by side; no server, no API key): [github.com/vadimchernets/poly-duo](https://github.com/vadimchernets/poly-duo) · [polyhelper.ai/duo/](https://polyhelper.ai/duo/). Its modes are not evaluated in the paper.

## Keywords

multi-agent verification; LLM-as-a-judge; AI evaluation; verifier panels; correlated errors; model diversity; conformity; SimpleQA; TruthfulQA; preregistration

## Licence

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
