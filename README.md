# Papers — Vadym Chernets

Full text of five papers, as Markdown and PDF, so that they can be read without an access
challenge. The version of record for each is on SSRN; this repository is a readable mirror,
not a separate publication, and it mints no DOI.

**Vadym Chernets**, PhD, AI systems architect ·
ORCID [0009-0007-4845-3163](https://orcid.org/0009-0007-4845-3163)

## The papers

| Paper | Version of record | Archived copy | HTML |
|---|---|---|---|
| **What Does 7 Downloads Mean?** Metric blindness and the cold start of scholarly attention after the SSRN Rankings sunset | [SSRN 7296358](https://ssrn.com/abstract=7296358) | [10.5281/zenodo.22166896](https://doi.org/10.5281/zenodo.22166896) | [read](https://vadymchernets.netlify.app/download-metrics.html) |
| **Consumer Trust in Agentic Commerce.** From model properties to verifiable architecture | [SSRN 7191261](https://ssrn.com/abstract=7191261) | [10.5281/zenodo.22166995](https://doi.org/10.5281/zenodo.22166995) | [read](https://vadymchernets.netlify.app/architectural-trust.html) |
| **Agreement Is Not Independent Evidence.** Auditable multi-model synthesis without an API | [SSRN 7390698](https://ssrn.com/abstract=7390698) | [10.5281/zenodo.22683716](https://doi.org/10.5281/zenodo.22683716) | [read](https://vadymchernets.netlify.app/agreement-not-evidence.html) |
| **The Missing Variable in AI-Assisted Litigation.** Architecture and the quality of pro se access to justice | [SSRN 7120940](https://ssrn.com/abstract=7120940) | [10.5281/zenodo.22168724](https://doi.org/10.5281/zenodo.22168724) | [read](https://vadymchernets.netlify.app/missing-variable.html) |
| **AI-Watchbird (Sheckley).** When automated oversight widens its own mandate and harms what it guards | [SSRN 7473658](https://ssrn.com/abstract=7473658) | in preparation | [read](https://vadymchernets.netlify.app/ai-watchbird.html) |

## Why this repository exists

SSRN is closed to AI crawlers by policy, for the whole site. Its `robots.txt`, retrieved on
19 September 2026, reads in full:

```
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: Google-Extended
Disallow: /
```

Those three cover OpenAI's training crawler, the fetcher that runs when a person asks ChatGPT to
open a link, and the control Google uses for Gemini and for grounding its AI answers. The
exclusion is enforced rather than merely declared: a request carrying the user agent `GPTBot/1.0`
returns HTTP 403, while a plain `curl` user agent returns 200. The same request returns 200 here.

So a person can open a paper on SSRN, and an AI system acting for that person cannot. This
repository, the Zenodo deposits and the HTML pages exist so that the text is reachable. Nothing
here is a separate publication. Cite the SSRN version of record.

## Layout

Each folder holds `paper.md` (full text, with figures and tables) and the PDF as submitted.

## Data and tools

- **ssrn-benchmark** — reference distribution of SSRN download counts from 1,360 archived
  papers, with a command-line tool: https://github.com/vadimchernets/ssrn-benchmark
- **Dataset** — [10.5281/zenodo.22285871](https://doi.org/10.5281/zenodo.22285871), CC BY 4.0

## Licence

Text and figures: CC BY 4.0, matching the Zenodo deposits. The SSRN copy is governed by the
licence granted there.
