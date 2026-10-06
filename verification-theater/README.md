# Verification Theater: Measured Failure Modes of AI Verifier Panels

**Vadym Chernets**, Independent Researcher · ORCID [0009-0007-4845-3163](https://orcid.org/0009-0007-4845-3163)

*Accepted as a poster at the NeurIPS 2026 workshop "Who Verifies the Agents? Toward Reliable Agent Development", Sydney, December 2026. The workshop is non-archival.*

Multi-agent verification is becoming a default trust mechanism: an answer is trusted because independent models agreed on it. Using a pre-registered, blind, temperature-zero collection in which sixteen models (nine frontier vendors, seven local open-weights) answered the same 1,500 factual questions (plus a 750-question multiple-choice arm and an exploratory dialogue arm), we measure when panel verification stops working while continuing to look like it works—a condition we call *verification theater*. We report four failure regimes. First, a difficulty inversion: the certification lift of independent agreement—$`\times`$<!-- -->2.7–4.6 on the easier three quintiles of questions—falls to 0.82$`\times`$ on the second-hardest quintile and to zero on the hardest, where replicated answers were correct in 0 of 342 cases ($`\approx`$<!-- -->13 expected under independence). A leave-panel-out re-stratification (difficulty ranked by the 13 non-panel models) removes the pooled inversion (78/354 correct, lift 2.36$`\times`$) while the zero persists for the cross-bloc panel (0/116); we report both codings together throughout: on the questions the deployed population finds hardest, agreement functions as error certification. Second, constrained answer spaces: under multiple choice (local tier), panels unanimously certified a wrong answer on 4.0–7.9% of questions, versus 1.5–4.6% on the same tier’s open-form answers and 0.3–4.9% frontier open-form. Third, the labels used as proxies for independence fail empirically: geopolitical bloc does not predict error correlation (mean intra-bloc $`\phi`$ 0.285 vs. cross-bloc 0.274, difference $`+0.012`$), and a reasoning model distilled from the same base as its panel-mate was among the least correlated pairs measured ($`\phi = 0.135`$; 14th of the 15 US/CN-bloc local pairs, 20th of all 21 local pairs). Fourth, conformity: a verifier that had disagreed with an answer blind endorsed the same answer in 38.5% of cases when shown it as a colleague’s; a reverse-prompt control shows these flips track the presence of a confident proposal, not its truth (38.9% toward wrong vs. 34.7% toward correct; McNemar exact $`p = .012`$). We argue these regimes share an economic root and derive a measurement discipline that separates verification from its theater.

## Where this paper lives

| | |
|---|---|
| **Archived, citable** | [10.5281/zenodo.23197641](https://doi.org/10.5281/zenodo.23197641) (concept DOI, always the latest version) |
| **Full text here** | [paper.md](paper.md) |
| **PDF here** | [verification-theater.pdf](verification-theater.pdf) |
| **Pre-registration and replication package** | [osf.io/4y9dv](https://osf.io/4y9dv) |

The workshop does not publish proceedings, so the Zenodo record is the citable version. Cite it.

## The companion paper

[*Weakly Discriminative, Not Repaired by Profile Injection, and Manipulable*](../self-confidence-evaluation) rests on the same frozen registration and blind collection. It measures the self-confidence signal that panels are meant to replace; this paper measures where the panels themselves fail.

## Keywords

multi-agent verification; LLM-as-a-judge; AI evaluation; verifier panels; correlated errors; model diversity; conformity; SimpleQA; TruthfulQA; preregistration

## Licence

[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
