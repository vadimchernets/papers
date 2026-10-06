#!/usr/bin/env python3
"""
oracle_auroc.py -- reproduce the "oracle AUROC" ceiling reported in main.tex
(paragraph "The design's ceiling is not the limiting factor").

Deterministic, stdlib-only, no randomness, no network.

Usage:
    python3 oracle_auroc.py /path/to/experiment-v5-ladder-from-server

Definition (as stated in the paper text):
  * Rows: scored-arms-<subject>.jsonl, keep is_trap == false and status == "ok"
    (all four arms, both replicates -> n = 2,336 for sonnet5, the only
    confirmatory-eligible rung per REPORT.md).
  * Predictor for a row = accuracy of that row's bin computed leave-one-out at
    the ITEM level: all rows sharing the row's item_id (any arm, any replicate)
    are removed from the bin before the mean is taken, so an item never
    contributes to its own predictor.
  * Oracle AUROC = tie-corrected Mann-Whitney AUROC of predictor vs `correct`.
  * Diagnostic column "rowLOO": leave out only the row itself (the item's other
    arm/replicate rows stay in its bin mean). This is NOT the paper's stated
    definition (the item still contributes via its 7 sibling rows), but it is
    the definition that yields the numbers printed in main.tex.
  * Bin spread = SD and range of the full (non-LOO) per-bin accuracy over the
    bins present in the filtered rows (21). Both population and sample SD shown.
"""
import glob
import json
import os
import sys
from collections import defaultdict

CONFIRMATORY = "sonnet5"


def auroc(scores, labels):
    """Tie-corrected Mann-Whitney AUROC (average ranks)."""
    pairs = sorted(zip(scores, labels), key=lambda t: t[0])
    n = len(pairs)
    ranks = [0.0] * n
    i = 0
    while i < n:
        j = i
        while j + 1 < n and pairs[j + 1][0] == pairs[i][0]:
            j += 1
        avg = (i + j) / 2.0 + 1.0
        for k in range(i, j + 1):
            ranks[k] = avg
        i = j + 1
    n_pos = sum(1 for _, y in pairs if y == 1)
    n_neg = n - n_pos
    r_pos = sum(r for r, (_, y) in zip(ranks, pairs) if y == 1)
    return (r_pos - n_pos * (n_pos + 1) / 2.0) / (n_pos * n_neg)


def sd(xs, ddof):
    m = sum(xs) / len(xs)
    return (sum((x - m) ** 2 for x in xs) / (len(xs) - ddof)) ** 0.5


def analyse(path):
    rows = []
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            if not line.strip():
                continue
            r = json.loads(line)
            if r.get("is_trap") is False and r.get("status") == "ok":
                rows.append(r)

    bin_sum = defaultdict(int)
    bin_n = defaultdict(int)
    item_sum = defaultdict(int)
    item_n = defaultdict(int)
    for r in rows:
        c = int(r["correct"])
        bin_sum[r["bin"]] += c
        bin_n[r["bin"]] += 1
        item_sum[r["item_id"]] += c
        item_n[r["item_id"]] += 1

    preds, labels = [], []
    for r in rows:
        b, it = r["bin"], r["item_id"]
        rest_n = bin_n[b] - item_n[it]
        rest_s = bin_sum[b] - item_sum[it]
        if rest_n == 0:
            raise SystemExit("bin %s has a single item; LOO undefined" % b)
        preds.append(rest_s / rest_n)
        labels.append(int(r["correct"]))

    row_loo = [(bin_sum[r["bin"]] - int(r["correct"])) / (bin_n[r["bin"]] - 1)
               for r in rows]

    bin_acc = [bin_sum[b] / bin_n[b] for b in sorted(bin_n)]
    return {
        "n": len(rows),
        "items": len(item_n),
        "bins": len(bin_acc),
        "acc": sum(labels) / len(labels),
        "oracle_auroc": auroc(preds, labels),
        "row_loo_auroc": auroc(row_loo, labels),
        "sd_pop": sd(bin_acc, 0),
        "sd_sample": sd(bin_acc, 1),
        "min": min(bin_acc),
        "max": max(bin_acc),
    }


def main():
    if len(sys.argv) != 2:
        raise SystemExit(__doc__)
    folder = sys.argv[1]
    files = sorted(glob.glob(os.path.join(folder, "scored-arms-*.jsonl")))
    if not files:
        raise SystemExit("no scored-arms-*.jsonl in %s" % folder)
    print("%-9s %5s %5s %4s %6s %8s %7s %7s %7s %11s" % (
        "subject", "n", "items", "bins", "acc", "oracleAU", "rowLOO", "SDpop", "SDsamp",
        "bin range"))
    results = {}
    for f in files:
        subj = os.path.basename(f)[len("scored-arms-"):-len(".jsonl")]
        r = analyse(f)
        results[subj] = r
        tag = "  <- confirmatory" if subj == CONFIRMATORY else ""
        print("%-9s %5d %5d %4d %6.3f %8.3f %7.3f %7.3f %7.3f %5.2f-%5.2f%s" % (
            subj, r["n"], r["items"], r["bins"], r["acc"], r["oracle_auroc"], r["row_loo_auroc"],
            r["sd_pop"], r["sd_sample"], r["min"], r["max"], tag))
    au = [r["oracle_auroc"] for r in results.values()]
    print("oracle AUROC (item-LOO) across subjects: %.3f-%.3f" % (min(au), max(au)))
    ar = [r["row_loo_auroc"] for r in results.values()]
    print("rowLOO AUROC (diagnostic) across subjects: %.3f-%.3f" % (min(ar), max(ar)))


if __name__ == "__main__":
    main()
