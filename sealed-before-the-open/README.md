# Sealed Before the Open: A Verifiable Standard for Measuring AI Forecasts of Financial Markets

*Fourteen US and Chinese AI models, twelve markets, four horizons: a sealed live league, a count of independent voices behind each consensus and 30 registered predictions*

**Vadym Chernets**, PhD, AI systems architect · Founder, PolyHelper · ORCID [0009-0007-4845-3163](https://orcid.org/0009-0007-4845-3163)

**NeurIPS 2026:** Related: measured failure modes of verifier panels, a paper accepted (poster) at NeurIPS 2026 workshop [Who Verifies the Agents?](https://neurips.cc/virtual/2026/loc/sydney/173020)

When an AI model says gold will rise, anyone can score the call at the close, but few can check when it was made. A backtest mixes memory with skill, and an operator's log asks for trust. I propose a standard for measuring AI market forecasts, written as a ladder of checkable requirements, and I run its reference implementation, AI Council · Markets: an open league where fourteen models, seven from US and seven from Chinese laboratories, face one question on one price snapshot. Before each New York open the ten on its Council, five from each side, give probabilities for twelve indicators at four horizons. Each answer is sealed into a hash chain before the price it is scored from, the chain is anchored in Bitcoin and signed by independent time-stamping authorities, and one run per session counts by a rule declared in advance. On 21 October 2026, the first counted morning, every counted answer was signed before the 09:30 ET open. Agreement among the models proved to be a count of independent voices, not a headcount: on two development mornings the seven and eight models sealed before the open were as alike as about 1.6 independent forecasters, nine counted ones were worth 2.23, and the closest pairs crossed the US-China line. Check a seal with three commands, and score my thirty predictions, registered on OSF, before I do.

*Version 5.3, 143 pages: a 47-page main text, with every table and check kept in Appendices A to J. Registered predictions are scored in dated revisions.*

## Where this paper lives

| | |
|---|---|
| **Version of record** | [SSRN 7653679](https://ssrn.com/abstract=7653679) · DOI [10.2139/ssrn.7653679](https://doi.org/10.2139/ssrn.7653679) |
| **Archived, citable** | [10.5281/zenodo.23552697](https://doi.org/10.5281/zenodo.23552697) |
| **Registered predictions (Section 8)** | OSF [10.17605/OSF.IO/9Q86N](https://doi.org/10.17605/OSF.IO/9Q86N) |
| **Immutable release of the open data** | Zenodo [10.5281/zenodo.23552700](https://doi.org/10.5281/zenodo.23552700) (league files as of 21 October 2026, with a manifest of SHA-256 hashes) |
| **Live league and open data (CC BY 4.0)** | [trends.polyhelper.ai/markets](https://trends.polyhelper.ai/markets/) · [trends.polyhelper.ai/api/v1](https://trends.polyhelper.ai/api/v1/) |
| **Full text and PDF on the web** | [polyhelper.ai/research/sealed-before-the-open](https://polyhelper.ai/research/sealed-before-the-open/) |
| **Full text here** | [paper.md](paper.md) |
| **PDF here** | [sealed-before-the-open.pdf](sealed-before-the-open.pdf) (as archived on Zenodo) |

The same text is in three places so that it can be reached when one of them cannot serve it. SSRN holds the version of record; cite that one. SSRN also disallows AI crawlers site-wide in its `robots.txt`, which is why these mirrors exist.

## What the paper does

- **A proposed standard** (Section 3): an event contract fixed before the question goes out; a seal before the reference price; one counted run per session by a rule written in advance; a ladder of trust from the operator's record (level 1) through an external anchor in Bitcoin (level 2) to independent RFC 3161 time-stamping authorities (level 2+, from 21 October 2026); the standard as three rungs, L1 Recorded, L2 Anchored and L3 Witnessed, with each requirement marked In place, Climbing or Next with its date (Section 3.12); a checklist of requirements (Section 3.13, in full in Appendix F).
- **Scoring for a live market setting** (Section 4): the Brier score on the event asked, against a 50% benchmark, the climatological base rate and prediction-market prices; calibration and sharpness; the 30/10 rule (30 forecasts on at least 10 trading days).
- **How many independent voices** (Section 5): on two development mornings the seven and eight models sealed in time were as alike as about 1.6 independent forecasters, and the nine counted on 21 October were worth 2.23; the closest pairs crossed the US-China line.
- **A design for humans before AI** (Section 6) and **a dated map of AI market arenas** (Section 7), with the claims of novelty bounded cell by cell (Appendix E).
- **Registered predictions** (Section 8, Appendix D): one primary endpoint (does the council's consensus forecast the day better than the base rate?), 30 secondary predictions with dates, thresholds and probabilities set by three models blind to each other, and two secondary questions without a probability (does disagreement help; does discounting correlated voices help, against a shadow consensus), registered on OSF before the paper was posted. The scripts that resolve every prediction and compute the shadow weights are filed with the registration.

## Check a seal yourself (Appendix B)

Only public files and standard tools are needed. The example is the stamp of 20 October 2026 at 13:00:25Z.

```sh
curl -sO https://trends.polyhelper.ai/api/v1/council-book.jsonl
curl -sO https://trends.polyhelper.ai/markets/proof/2026-10-20/130025Z.txt
curl -sO https://trends.polyhelper.ai/markets/proof/2026-10-20/130025Z.txt.ots

# The stamped list names the book prefix it commits to: 159 lines, sha256 59673b9e...cac1a7d9
head -n 159 council-book.jsonl | shasum -a 256
# 59673b9e21ac6d358e7dc3b811dc3d78f5286390094f7133e3704f57cac1a7d9  -
sed -n 159p council-book.jsonl | python3 -c "import json,sys; print(json.load(sys.stdin)['link'])"
# 378273fd057fcbf364746b032f67f42cd811d281da80f39ff0792c4047175b2c
```

Recompute every seal and link of the chain:

```python
import json, hashlib
H = lambda o: hashlib.sha256(json.dumps(o, sort_keys=True, ensure_ascii=False).encode()).hexdigest()
lines = [json.loads(l) for l in open("council-book.jsonl", encoding="utf-8")]
prev = ""
for i, x in enumerate(lines, 1):
    assert x["n"] == i and x["prev"] == prev
    assert x["seal"] == H({k: v for k, v in x.items() if k not in ("seal", "link", "prev", "n")})
    assert x["link"] == H({k: v for k, v in x.items() if k != "link"})
    prev = x["link"]
print("chain ok:", len(lines), "lines")
```

Verify the Bitcoin anchor (`pip install opentimestamps-client`; with a local Bitcoin node `ots verify 130025Z.txt.ots`, without one `ots info 130025Z.txt.ots`, which prints the attestation `BitcoinBlockHeaderAttestation(972334)`), and recount the league's published accounts:

```sh
curl -s https://trends.polyhelper.ai/api/v1/arena-code-tools-replay.py.txt -o replay.py
python3 replay.py https://trends.polyhelper.ai/api/v1/
```

Level 2+ (from 21 October 2026): the stamped list of that morning is signed by independent RFC 3161 authorities (Appendix B, Step 9; OpenSSL 3):

```sh
P=https://trends.polyhelper.ai/markets/proof/2026-10-21
for f in 130019Z.txt 130019Z.txt.freetsa.tsr 130019Z.txt.digicert.tsr tsa/freetsa-cacert.pem tsa/freetsa-tsa.crt; do curl -sO $P/$f; done
openssl ts -verify -data 130019Z.txt -in 130019Z.txt.freetsa.tsr -CAfile freetsa-cacert.pem -untrusted freetsa-tsa.crt
openssl ts -verify -data 130019Z.txt -in 130019Z.txt.digicert.tsr -CAfile /etc/ssl/cert.pem
```

That morning each counted answer lay in a record signed before the 09:30 ET open, eight of nine 29 minutes before it. For 19 and 20 October the order of seal and reference is the operator's record (level 1) plus the Bitcoin anchor (level 2).

The book only grows, so the book of the immutable release (Zenodo, above) must be a prefix of any later download. What the steps establish, and what they leave open (the ladder of claims), is in Table B1 of the paper: the anchor certifies the record; a claim of skill is settled only by the registered comparisons of Section 8. This is a measurement protocol, not investment advice.

## Keywords

AI forecasting; large language models; financial markets; forecast evaluation; Brier score; calibration; look-ahead bias; trusted timestamping; OpenTimestamps; effective number of independent voices; prediction markets; registered predictions.

## Cite

Chernets, V. (2026). *Sealed Before the Open: A Verifiable Standard for Measuring AI Forecasts of Financial Markets*. SSRN Working Paper No. 7653679. https://ssrn.com/abstract=7653679 (archived: https://doi.org/10.5281/zenodo.23552697)

```bibtex
@techreport{chernets2026sealed,
  author      = {Chernets, Vadym},
  title       = {Sealed Before the Open: A Verifiable Standard for Measuring AI Forecasts of Financial Markets},
  institution = {SSRN},
  type        = {Working Paper},
  number      = {7653679},
  year        = {2026},
  doi         = {10.2139/ssrn.7653679},
  url         = {https://ssrn.com/abstract=7653679}
}
```

Predictions: OSF, https://doi.org/10.17605/OSF.IO/9Q86N. Data release: https://doi.org/10.5281/zenodo.23552700.

## Licence

Text CC BY 4.0, matching the Zenodo deposit. The SSRN copy is governed by the licence granted there. The league's data are CC BY 4.0, attribution "AI Council · Markets, trends.polyhelper.ai/markets/".
