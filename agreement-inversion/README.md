# Agreement Inversion Is Not a Mid-Tier Property: Precision of Agreed LLM Answers Follows Pair Accuracy

**Vadym Chernets**, PhD, AI systems architect · ORCID [0009-0007-4845-3163](https://orcid.org/0009-0007-4845-3163)

When two flagship models, asked separately, give the same answer to one of the hardest SimpleQA questions, that answer is usually wrong. On the 106 SimpleQA questions where July mid-tier panels failed, 45 flagship pairs without the client-served GPT arm, where web search cannot be excluded, are right on 96 of 691 agreements (13.9%). Answering only when a second model agrees needs no labels or parameters, and earlier work attributed the failures of this rule to mid-tier models. On both tiers I measured, the precision of agreed answers follows the accuracy of the pair, so inversion is not a mid-tier property. In the hardest quintile, defined the same way for each tier, precision is 17.3% in July and 15.5% in August; across all five quintiles, at the precision expected from each pair's two accuracies, flagship pairs differ from mid-tier pairs by -0.2 points [-3.1, +2.7]. The data are SimpleQA, fresh two-hop questions and product facts, collected in July, August and October 2026 with flagship models from eleven laboratories. A partner from a second laboratory catches more errors but opens the gate less often: for one released model, a same-laboratory partner catches 2 of 29 errors and a partner from another laboratory 20 of 29 (-62.1 points [-79.3, -43.8]), with the gate open on 96% and 61% of questions. When the wider gate is thinned by stated confidence to equal coverage, this advantage holds only where the partner's model is far more accurate. A small model fed measured accuracies predicts out-of-sample precision with mean absolute error 0.037 against 0.099 for the best single model, level with an independent-errors baseline at 0.032, and runs high on product facts and public data. On the same 100 questions the identifier gpt-5.6-sol scores 92.0% in its client-served wave and 46.3% through the API at another effort setting, while eight other models move by at most 4 points.

## Where this paper lives

| | |
|---|---|
| **Version of record** | [SSRN 7682960](https://ssrn.com/abstract=7682960) |
| **Archived, citable** | [10.5281/zenodo.24090580](https://doi.org/10.5281/zenodo.24090580) |
| **Data and code** | [10.5281/zenodo.24090584](https://doi.org/10.5281/zenodo.24090584): per-call responses, analysis scripts and the mapping from every reported number to its source table (CC BY 4.0) |
| **Full text here** | [paper.md](paper.md) |
| **PDF here** | [agreement-inversion.pdf](agreement-inversion.pdf) |
| **Web page** | [polyhelper.ai/research/agreement-inversion](https://polyhelper.ai/research/agreement-inversion/) |

## Related papers

[*Verification Theater*](../verification-theater) measured where mid-tier verifier panels fail; this paper measures the same agreement gate on flagship pairs and shows the inversion follows pair accuracy, not tier.
