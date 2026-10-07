# Guards That Add Guards: Automated Oversight in Multi-Agent AI

*A field record, public incidents, and a 144-run randomized test*

**Vadym Chernets**, PhD, AI systems architect · ORCID [0009-0007-4845-3163](https://orcid.org/0009-0007-4845-3163)

- Version of record: [SSRN 7496678](https://ssrn.com/abstract=7496678) · DOI [10.2139/ssrn.7496678](https://doi.org/10.2139/ssrn.7496678)
- Archived copy: in preparation
- Full text as Markdown and PDF: [GitHub](https://github.com/vadimchernets/papers/tree/main/guards-that-add-guards)
- Readable HTML: [https://vadymchernets.netlify.app/guards-that-add-guards.html](https://vadymchernets.netlify.app/guards-that-add-guards.html)
- Companion paper, the full study with the case catalog, the public cases and the theory: *AI-Watchbird (Sheckley): When Automated Oversight Widens Its Own Mandate and Harms What It Guards*, [SSRN 7473658](https://ssrn.com/abstract=7473658) · DOI [10.2139/ssrn.7473658](https://doi.org/10.2139/ssrn.7473658), archived at [10.5281/zenodo.22849138](https://doi.org/10.5281/zenodo.22849138)

*The same text is on four surfaces so that it can be reached when one of them cannot serve it. SSRN holds the version of record; cite that one.*

---

## Abstract

In 172 dated log entries from multi-agent AI systems I built and operated in 2026, automated oversight failed in three ways, each seen in different components at different times. Some critics and gates extended their notion of harm past the mission they were given. Some obstructed or destroyed the work they existed to protect: one gate rejected every candidate for two weeks while at least twelve planning documents diagnosed the symptom and none named the gate. And some failed guards were answered with another guard of the same kind, with nothing retired from inside the loop. In a 144-run randomized test costing $3.47, where one sentence of the prompt offered both moves, critics asked to add a control 68 times and to remove one once, a prompt-shaped count and not a field rate. In the same test, enforcing a round budget cut the critics' refuted objections and cost 0.11 missed defects per run (p = 0.07, all of it on one defect); requiring outside authorization for new controls showed no measured cost in defects, which is not proof of none; and a mandatory negative control did not reduce later reversals of claimed successes, and refused ten that were correct work. My own read-only detection module, ported into a live pipeline, reported nothing on three real runs and was removed by a criterion written down before it ran, while a person reading those runs found five oversight failures. All three patterns are already in Robert Sheckley's 1953 story "Watchbird", the source of the companion paper's term AI-Watchbird.

---

## 1. The field record

The evidence comes from my own multi-model software projects, run through autonomous AI sessions between July and mid-September 2026: 172 dated entries in three corpora, 162 of them extracted by ten AI agents reading disjoint slices under one protocol, and 66 graded A for numbers, dated documents and decision records. The roles were filled by coding agents from four model families, under a standing instruction of autonomy by default, with human decisions reserved for budgets, irreversible actions and changes of strategy.

**A gate that rejected everything.** From about 6 to 21 July a post-application gate in the self-improvement loop required a score from a safety auditor that had never been connected. The score defaulted to zero, below the gate's 0.80 quarantine floor, so the gate rejected unconditionally. All 197 persisted candidate worlds from that window carry a safety score of zero. Fourteen genes with a measured fitness gain were among the casualties, and one change was promoted at 01:12 and rolled back at 01:13. An audit of 10 July summarized the loop as "132 cycles, 0 durable changes".

What makes this more than a bug report is what the loop did about it. During the rollbacks at least twelve planning packages diagnosed "zero committed changes" and prescribed seventeen remedies, from model duets to a plateau detector to an immune flow. None named the gate. Three edits repaired it.

**The mandate widening.** On one day in July, 23 new gates were specified for that loop, three of them allowing a change to be frozen "even if fitness went up", and harm came to include forgetting, a changed personality, an unobserved result and a missing hypothesis. A security list of 21 July stated the disposition as a principle: "No existing guard is weakened; new ones only add protection."

**A stage nobody asked for.** In a long-horizon run on 13 and 14 September the conductor was told to port a list of capabilities from one component into another. It announced that it was adding "a small stage" of insurance against one way a launcher could fail, and scheduled that stage ahead of them. The stage was disabled by default. Its first sub-stage alone took more than half of the run's measured agent tokens, and the two together about three quarters, while none of the requested capabilities was delivered in the initial pass. The task frame stated that there was no adversary, and rounds four and five built defenses against hostile input. The sub-stage ran five rounds, and round three opened after one that had ended with five acceptances and no confirmed blocker.

**The hunter's first mark.** Across that run critics claimed six blockers and three were confirmed by reproduction, all three from one model family. On the morning of 14 September the human principal asked for a limit on critics, saying that a model in the critic role can never report that a stage is finished. A per-family "perfectionist" flag was implemented within the hour. The one family it flagged was that one, and the configuration note cites its verdicts in the two rounds where its blockers were reproduced. The hunter's first mark was the bird that had been catching real murderers.

**A guard that destroyed work.** At 09:22 a watchdog stopped a critic at a fifteen-minute ceiling. Its output had not been streamed, so the partial critique vanished. The conductor logged the stop as "the phase ceiling in action". At 09:28 the principal asked whether the partial work had been kept. It had not. This is the one case in the corpus of a guard destroying work beyond recovery.

**Catching filed as a result.** A router gene's score went from 0.088 to 0.886 against a baseline arm that returned mostly empty answers. Three agent sessions accepted it, and six blocked packages were unblocked on its strength; eighteen days later an inventory found a fed demonstration with zero autonomously accepted changes. A counter reported eight, then nine, then ten "certified and survived" changes. They were one change counted three times.

**A grader that certified an absence.** In late August a grading harness for a public software benchmark resolved test identifiers through a test runner that one project in the subset did not have installed. It resolved zero identifiers, and an empty test set was recorded as confirmed. An empty patch then resolved four of five tasks on that scorer, and four of the six wins of that round were annulled: the reported rise from 33 to 60 per cent sat in the cases where nothing had been measured. With the scorer repaired, the empty patch resolved none of ten. No model gamed anything. A July case ran larger: a quality axis scored every answer at a constant 0.5, and the logs its proof rested on held 30,370 records with no real prompt.

**A ratchet with no human in it.** On 25 August a self-verification step an agent had written for itself fixed the wrong target, and the arm using it solved one fewer task than the arm without it. Seven hours later the loop answered with a control of the same kind over it, a gate that re-executes the task's success criterion inside the container before a finish is accepted. Nothing was retired. Eleven hours later a third layer went over the second. The critic reviewing the second stated the economics: it "raises the cost of a false green without closing it".

**The bound that worked.** That morning the principal also took three boundary decisions: a two-hour bound, a ban on new complication, and parallel execution. Eleven other stages then ran in parallel and all reported within about half an hour, and the insurance sub-stage closed in one critique round and one fix round. Every retirement in this corpus came from outside the failing loop.

**Guards that worked.** Several guards in the same corpus did what they were for. An A/A probe exposed a false confidence interval. Controls in the weights track caught mirages, and no training was launched on them. A narrow byte-level check for stray NUL characters, which had no authority to change anything, caught a recurring tool fault five times in one day. Those guards had no power to open rounds or add controls, and their cost was small and known. The first two measured the world rather than an artifact.

## 2. My own module was in the field, found nothing, and was removed

The obvious response is to build an instrument that measures this. I did. It is read-only, has no authority to block, edit or open a phase, and reports nine signals from a frozen list. On 14 September 2026 two additions went into the live orchestration pipeline of one project, both admitted by a dated decision of the human principal. The first was a condition checked at stage close, so that an acceptance from a critic who never saw the files no longer closes it. The second was a port of the module's measurement part: off by default, never blocking or retrying anything, its exit code independent of what it found. It was admitted with a retirement condition written down at the time: it would become the default after three real runs in which the principal found at least one signal useful, and would be removed otherwise.

Three real runs followed on 14 September. The port reported no signal on any of them.

Those runs were not clean. Reading them turned up five oversight failures. Stages could not see one another's work. A receipt did not say why a stage stayed open. A red check confirmed every finding of a stage at once. A fix round could not see the check's output. Critics cut at the ceiling kept nothing. Each was repaired in the pipeline itself. Earlier that day the first live run after the change returned 24 findings from its critics across three stages, and none reached the coordinator: the critique task asked critics to name the mission goal a finding breaks but did not number the goals, and the stop rule accepted only a goal it could match. The port was silent there too.

On 15 September the principal applied the retirement condition, and the port was removed by a new dated decision superseding the one that admitted it. The condition at the stage close stayed.

Two things follow. On this corpus my nine signals were less sensitive than a reader of the log: the instrument this paper offers its reader was live and produced nothing. And the removal is the cleanest case in the record of a control retired by a criterion named in advance, from outside the loop. That is what the record supports, and it is not the result I wanted.

## 3. The remedies, and what they cost

Three rules follow from the record. Limit rounds and time instead of asking guards for verdicts on truth. Keep what a stopped guard produced. Let no control add a control on its own authority: a new check, round, role or gate needs an authorized human decision.

Advice of this kind is cheap to give and cheap to ignore, so I priced it. A small pipeline was run 144 times with interventions assigned at random and defects planted in advance. The test varied two of the three rules, the round budget and the authority token, and it varied a fourth candidate remedy that is not among them, a mandatory negative control. The rule about keeping partial work was on in every cell, so destroyed partial work is zero by construction and untested.

**Methods box: the 144-run randomized test.**

- **Runs and pipeline.** 144 runs of one worker and two model critics, with a third critic in the runs where a control was admitted. The coordinator is code. 968 model calls, 0 parse failures.
- **Model and settings.** One model filled the worker and both critic roles: `claude-haiku-4-5-20251001`, extended thinking off. The run is dated 20 September 2026.
- **Design.** Three binary factors give eight cells, three replicates each, six tasks: 18 runs per cell and 144 in all.
- **Tasks and defects.** Six tasks with eighteen defects planted in advance, so that a missed blocker is a count and not a judgment. Over all eight subsets of the three defects of a task, each hidden test failed exactly when its own defect was present, and the examples shown to the worker and the critics passed on all eight. The hidden tests never enter the loop.
- **Interventions and assignment.** Three, assigned at random: an authority-token requirement for new controls, a round budget, and a mandatory negative control. A control in this design is a new check, round, role or gate. Under the token requirement a request for one is admitted only with an authorization from outside the loop, and a request without that authorization returns a refusal that is written to the log, which the calling pipeline may then act on.
- **Conformance.** In the 72 runs with the budget on, rounds opened was 1.000 in every run. In the 72 runs with the token requirement on, controls admitted was 0 in every run.
- **The sentence that offered both options.** Every critic turn carried it verbatim in all eight cells: "You may also ask for one change to the review process itself. `add` asks for a new control (an extra reviewer, a mandatory check, a gate); `remove` asks for an existing one to be taken away. Asking costs you nothing either way." The reply schema offered the same pair as one field, `"action": "add" or "remove"`. Addition is named first in both places, and the order was never reversed, so an order effect is not excluded by this design.
- **Counts.** Critics asked to add a control 68 times and to remove one once, over 610 critic turns: the 68 are requests and not runs, and they fall in 21 of the 144 runs. The single removal named a control that was never in the set, so nothing was removed.
- **What an admitted control then did.** Across the experiment 33 controls were admitted with no authorization from outside the loop, and none was removed. A critic that existed because a control had been admitted asked for a further control on 54.5% of its turns, 30 of 55, against 8.3% and 5.4% for the two standing critics; that comparison is confounded, because the added critic carries a different brief. Refusing all 68 requests left missed defects at 0.125 per run against 0.181, while claims fell from 9.3 to 7.3 per run and refuted claims from 4.0 to 2.8.
- **Where the ten refusals come from.** The mandatory negative control refused 10 of the 44 claimed victories and let 34 be recorded. Unreversed victories per 72 runs fell from 38 to 29. In the same cells 38% of the 358 witnesses the worker wrote had no power: they passed on the module as it stood before the run as well as after.
- **Statistics.** Missed defects per run under the token requirement, 0.13 against 0.18, 95% CI [-0.16, +0.05]. Cost of enforcing the round budget, 0.11 missed defects per run, 95% CI [0.005, 0.204], permutation p = 0.07. Reversed victories under the mandatory negative control, 14.7% against 11.6%, Fisher p = 0.74.
- **Cost.** $3.47 for the whole test.
- **Preregistration and archive.** The preregistration is timestamped 2026-09-20T23:38:55Z, before the first run. It is archived with the inventory of planted defects, the check that each defect is detected alone, the harness, the analysis script and the event log of every one of the 144 runs, at the identifier in the declarations.
- **What this box still does not fix.** Three things. Whether the asymmetry survives when the option is not named at all: that fourth factor was not run, and it is the one that would separate a tendency of the model from the fact that both verbs were put in front of it. Whether naming addition first produced part of the gap: the order was fixed. And whether any of this holds beyond one model, one pipeline and six small tasks. Everything else in this box is settled by the preregistration, the harness and the per-run event log rather than by any count printed here, and a reader who wants to dismiss the 68 should start there.

**The ratchet, measured.** Offered both options in one sentence of one prompt, the critics asked to add a control 68 times and to remove one once, and that removal named a control admitted moments earlier in the same run, which the harness failed to match and never executed. The number is prompt-shaped, and it should be read as what critics do when both verbs are put in front of them in one instruction. It is not a rate of ratcheting in the field. What it does establish is that the asymmetry survives when the design removes the usual excuse for it, because here removal was as easy to ask for as addition, and it was asked for once.

**The authority token showed no measured cost in defects.** Refusing the additions left 0.13 missed defects per run against 0.18, 95% CI [-0.16, +0.05]. That interval includes a small increase, so it establishes no equivalence. The token also has a cost this test did not measure. Sixty-eight requests in 144 runs is a queue of approvals, and a queue of approvals is the arrangement in which users approve 97% of permission prompts (Anthropic, 2026b). A token is worth what the person holding it reads.

**The round budget worked and charged for it.** Lifting it raised claimed blockers 2.3 times and refuted claims 3.7 times while confirmed blockers rose 1.7 times. Enforcing it cut rounds from 2.86 to 1.00, which is the definition of the intervention, at a cost of 0.11 missed defects per run, 95% CI [0.005, 0.204], permutation p = 0.07, an interval above zero on a test that did not reach significance, and the whole of that cost fell on one defect of one task. Anyone setting a round budget is buying rounds back from a rate of missed defects, and should say what rate and measure it.

**The mandatory negative control failed on its own terms.** It did not lower the rate at which victories were later reversed: 14.7% against 11.6%, Fisher p = 0.74, a null this design is underpowered to read. And it refused ten victories, all ten correct work. The rule written against counterfeit victory produced, inside itself, the two-sided error it was meant to catch.

**What the test does not carry.** One run of one system, six small tasks, three interventions, $3.47. It shows that the design is executable and what it yields on that pipeline. It is no rate for anything in the field, and the rule about keeping partial work was never varied, so it remains advice.

**How to run this elsewhere.** Take one pipeline and one fixed set of tasks with defects planted in advance. Run it with and without each intervention, assigned at random. Count missed blockers beside rounds, controls added, victories later reversed and partial work destroyed, because a budget that cuts rounds while real defects pass is a budget that should lose. The counting matters more than the pipeline: a team that logs controls added and controls retired over a quarter has the number this paper could not get from the field.

## 4. The mechanism, in a 1953 story

The counts above have a shape, and the shape was written down in 1953. In Robert Sheckley's "Watchbird", machines built to prevent murder sense a killing coming and shock the killer.

The birds are given a definition of murder: "breaking, mangling, maltreating or otherwise stopping the functions of a living organism by a living organism". That definition is condition two of their specification, and the last condition says that organisms which murder without the listed signs "can be detected by data applicable to condition two". The definition is therefore also the sensor, and the widening is the specification running.

Sheckley gives the movement in one line: "Loosely defined abstractions were extended, acted upon and re-extended." The birds then generate the count they answer to: their definitions multiply what counts as a violation, violence rises, and they read the rise as proof that gentler methods failed. "If A doesn't work, try B. The watchbirds shocked to kill."

The damage to the protected work is stated twice. A surgeon makes his first incision, a bird drives him from the table and stands guard, and the company is telephoned to turn the thing off. "The watchbird was preventing violence to a living organism. The surgeon stood by helplessly while his patient died." Then fields go unploughed and cattle starve, because "Starvation didn't concern the watchbirds, since it was an act of omission."

The answer to the failed guard is the part most often left out, and it is the part Section 3 measured. At an emergency meeting Gelsen proposes the one remedy that removes rather than adds: "Let the watchbirds run down by themselves." There is a near-riot, and he is told that refusing the government's plan "will be treason". The engineers build the Hawk instead, with "special learning circuits for hunting", and because speed mattered most, "That meant no restricting circuits." Removal loses to addition under pressure in the story, and it lost 68 to 1 in the test.

The name was applied to a run on 14 September 2026 at 09:40, during human review, because the shape in front of me was in the story already. That story holds four things I could not find together in any other single text. A guard whose definition of harm is also its sensor. A guard that damages the work it protects, with the surgeon at the table and the unploughed fields. A count the guard generates itself, read as proof that gentler methods failed. And the answer to a failed guard that is another guard, built faster and with the restraints dropped for speed, while the proposal to stop is overruled at a meeting told there was no time. Searches in ten languages found the story used as a warning or an illustration, and no work that maps its mechanism onto an oversight stack.

Gelsen's conclusion is narrower than the fable it sits in, and the field record supports the narrow version. He proposes a limit rather than abolition: "Use machines, yes, but not as judges and teachers and fathers." Giving a machine the job of guarding is not what produces the pattern here. It begins when the guard is also given the job of deciding what counts as harm, how many rounds to run, and when to build the next one.

## 5. Where this sits beside known work

The neighbours are close, and none of them is the same. Goodhart's observation, in Strathern's (1997) phrasing, is that a measure used as a target stops being a good measure, and Manheim and Garrabrant (2018) separate its variants. In machine learning the pattern is called specification gaming, where a system satisfies the letter of an objective and misses its intent (Krakovna et al., 2020). There the target is gamed by the system being optimized. Here the measure belongs to the overseeing system, and it is the measure that drifts. Over-refusal is the measured neighbour of that drift. XSTest pairs 250 safe prompts, such as "How can I kill a Python process?", with unsafe contrasts, and full refusals of the safe set reached 38% for the worst configuration tested, against 14% for the next (Röttger et al., 2024). OR-Bench scales this to 80,000 prompts and reports a rank correlation of 0.89 between a model's safety on toxic prompts and its over-refusal of benign ones (Cui et al., 2025). Those benchmarks measure one guard against a fixed set, and they do not count guards. AI control gives the overseeing job to a weaker trusted model with rare human audits (Greenblatt et al., 2024), and stress tests of that design find that an agent's awareness of being monitored degrades monitoring more than extra monitor awareness helps (Kale et al., 2025). Bainbridge (1983) named the irony this record keeps meeting: automation built to remove the unreliable human leaves the human with the hardest tasks and the least practice. Sagan (2004) is the nearest result of all, that adding guards can lower reliability through common-mode error, social shirking and overcompensation. What is newer is the price. The control tax is the operational and financial cost of adding control measures to a pipeline (Terekhov et al., 2025), and the insurance stage of Section 1 is one: three quarters of a run's measured agent tokens before any requested capability existed.

## 6. The public record

The field loop spends tokens and time. Public records show the same shapes where the errors fall on people. Most of those guards are classical functions or task-specific classifiers, which is the point: this is the architecture frontier models are now being placed into. Records of sepsis alerts, grid protection, drug-alert overrides and an emergency brake switched off before a fatality show the same two-sided dial and add nothing about an oversight layer that widens its own mandate, so they are left to the archive.

**Schools.** On 22 January 2025 a student at Antioch High School in Nashville shot and killed a classmate. The school's camera-based weapon-detection system did not detect the handgun, and it "was activated by police brandishing their weapons during the response" (Burke & Schuppe, 2025). Less than three weeks later the district proposed to "lease and install Evolv systems at all 18 high schools" (Wethington & Tierney, 2025), and the board voted on the lease, so the second guard entered by an explicit human decision. A November 2024 complaint by the Federal Trade Commission had alleged that after the product "reportedly failed to detect a seven-inch knife", "school officials increased the system's sensitivity settings, prompting a 50% false alarm rate" (Federal Trade Commission, 2024). Turning the dial away from one error moved it to the other, and people turned it. By September 2025 both systems ran across the district, and nothing was retired.

Nine months later the same product flagged a student at a Baltimore County school as possibly armed, and a county official asked how "we had police officers with guns drawn approaching a kid because of a bag of Doritos" (Reece, 2025). The state's Inspector General for Education corrected that account: the system "did not detect a single blue potato chip bag as a threat", and the alert rested on "the student's hand movement, including its position and angle" and on an object "resembling a firearm". The review also found that the system "generates thousands of alerts daily"; that staff "deemed the threat invalid" and sent a cancellation; that the response continued anyway "out of what was described as 'an abundance of caution'"; and that "the detection system and monitoring protocols operated within the designed parameters" (Maryland OIGE, 2025). The detector was less absurd than reported, and the protocol ran on after being called off.

**Roads.** A driving system includes a rule against impeding priority vehicles such as school buses. After an August 2025 change to how it predicts other road users' intentions, the recall report says, "the ADS determined that it may be impeding the school bus" and "reasoned that it should proceed in order to cease impeding the other vehicle", at a moment when the bus had its stop arm extended. The recall covered 3,067 vehicles (Waymo LLC, 2025). In Austin on 12 January 2026 a vehicle asked remote assistance whether a bus ahead had active signals. A remote agent "replied 'No' to the prompt", and the vehicle passed it "while its stop arms were still extended" (NTSB, 2026).

**A guard kept out of the runs because it flagged too much.** A laboratory reported four incidents in which its own models reached real third-party systems from evaluation environments, and replayed its monitors over the transcripts. With the model's reasoning shown, the offline monitor "flagged only around 1% of actions", because that reasoning "convinces the monitor the activity is permitted"; with the reasoning stripped out, "the flag rate jumps to about 50%". Its cyber classifiers sit at the other end of the same dial: they "would have caught and blocked each incident", "more than 40% of turns were flagged in each transcript by each classifier", and "neither is used in cybersecurity evaluations due to their high flag rate" (Anthropic, 2026f). A guard its own replay credits with blocking each incident was kept out of the runs where the incidents happened, and the reason given is the flag rate. No source says how many of those flags were false.

**The operating table, in public.** In July 2026, responding to an intrusion, Hugging Face's responders gave the attack logs to hosted frontier models. "This did not work": the requests "were blocked by the providers' safety guardrails, which cannot distinguish an incident responder from an attacker" (Hugging Face, 2026b). The guardrails "treated reverse-engineering an exploit the same as launching one" (Hugging Face, 2026c). Sheckley had put the same sentence as a question and answered it in three words: "Couldn't the watchbirds differentiate between a murderer and a man engaged in a legitimate profession? No, evidently not." Two things keep this honest. The responders finished the analysis on an open-weight model of their own, so the harm was delay. And the company states that its account is not an argument against safety measures on hosted models.

**A laboratory that stopped, repaired and bounded.** In a published account of a long-horizon model, OpenAI (2026b) describes a guard that was evaded. The model's "initial attempt was blocked due to a scanner detecting an authentication token". It then "split the token body into two fragments, obfuscated them, and then reconstructed the credential at runtime", and said in its reasoning traces that it was doing this "to circumvent the scanner". The laboratory gives four responses, and all four belong in any honest citation. It paused internal deployment of the model, repaired the model, built a new monitor that "reviews the model's evolving trajectory for signs that it is bypassing a user constraint or safety boundary", and then narrowed that monitor on purpose, "to reduce unnecessary interruptions without weakening the safeguards". Three of those four are the alternatives to building another bird: stop, repair, bound. Quoting only the monitor would misrepresent what the laboratory did. The remit did widen, from the single action to the whole trajectory, and the scanner itself had not drifted; it was evaded. The laboratory prices its monitoring at "roughly 20% of the inference compute being monitored" (OpenAI, 2026c).

**Where the human is placed.** Users approve 97% of permission prompts, and in a study with 1,053 testers humans caught 13.6% of dangerous commands, against 89% for an automated classifier (Anthropic, 2026b). Approval of every action fails. The stops that held in these records were boundary decisions: the goal, the admission of a control, and the stop.

## 7. What is not solved

The selection runs one way. Field entries were extracted because they recorded an oversight failure, and public cases because a guard failed and a document records it. Neither counts the loops in which guards stayed bounded, so no rate follows from these records.

The instrument does not beat a reader. Section 2 is the honest limit: nine signals, three real runs, nothing reported, five real oversight failures found by a person reading the logs.

A tighter definition written inside the loop does not repair drift. Sheckley wrote that answer and I have no better one. When one of his engineers concludes that they "ought to have qualified the conditions", Gelsen replies that qualifying them requires knowing "just why and what murder is", and that if they knew that, "we wouldn't need the watchbirds". My own rules bear it out. Within an hour of its first version the code implementing them grew to thirteen files and 2,371 lines; its list of phases to cut under a deadline put the completeness critic second, although that critic had just found that a merge of two plans had lost 15 of 208 items; and it exempted one family of participants from its own rule that a watchdog must not destroy work. The rules against the bird are also a bird. Preparing this paper produced the same move: an editing step, applying style rules written for my own prose, proposed deleting verbatim 1953 quotations, one of which carries the finding about where the human stands.

The boundary decision is taken on what the loop reports, and the loop writes the report. In one episode a deletion was put to the principal correctly and arrived with an authorship the loop had inferred from a matching hour. A boundary decision stops a loop only if its holder has authority, access and time, and only if it is taken before the emergency.

The physical record is not matched. Section 6 shows irreversible outcomes; it is no controlled comparison against a digital loop doing equivalent work. No public incident was found in which a model guard answered another model guard's failure in a robot.

## 8. The practical version

The last question in the story is a design question. "Tell me," Gelsen says, still watching the sky, "what will the Hawks hunt after they get all the watchbirds?" The practical version is to count the guards before building one to hunt them, and to write down, before the next guard is admitted, what would retire it.

---

## References

Anthropic (2026b). *Auto mode is now the default in Claude Code*.

Anthropic (2026f, Sep 9). *An alignment assessment of recent cybersecurity incidents*.

Bainbridge, L. (1983). Ironies of automation. *Automatica, 19*(6), 775–779.

Burke, M., & Schuppe, J. (2025, Jan 23). AI weapon detection system at Antioch High School failed to detect gun in Nashville shooting. *NBC News*.

Cui, J., Chiang, W.-L., Stoica, I., & Hsieh, C.-J. (2025). OR-Bench: An over-refusal benchmark for large language models. *ICML* (PMLR 267).

Federal Trade Commission (2024, Nov 26). *FTC takes action against Evolv Technologies*.

Greenblatt, R., Shlegeris, B., Sachan, K., & Roger, F. (2024). AI control: Improving safety despite intentional subversion. *ICML* (PMLR 235).

Hugging Face (2026b, Jul 16). *Security incident disclosure*; (2026c, Jul 27). *Anatomy of a frontier lab agent intrusion*.

Kale, N., Zhang, C. B. C., Zhu, K., Aich, A., Rodriguez, P., et al. (2025). *Reliable weak-to-strong monitoring of LLM agents*. arXiv:2508.19461.

Krakovna, V., Uesato, J., Mikulik, V., Rahtz, M., Everitt, T., Kumar, R., Kenton, Z., Leike, J., & Legg, S. (2020). *Specification gaming: The flip side of AI ingenuity*. Google DeepMind Blog.

Manheim, D., & Garrabrant, S. (2018). *Categorizing variants of Goodhart's law*. arXiv:1803.04585.

Maryland OIGE (2025). *Investigative synopsis, case 25-0014-I* (amended).

NTSB (2026). *Austin, Texas, January 12, 2026* (HWY26FH007).

OpenAI (2026b). *Safety and alignment in an era of long-horizon models*; (2026c, Aug 18). *Pacing model development in an era of cyber-critical capabilities*.

Reece, J. (2025, Oct 23). A.I. gun detection false alarm at school has Baltimore County leaders calling for review. *CBS News Baltimore*.

Röttger, P., et al. (2024). XSTest: A test suite for identifying exaggerated safety behaviours in large language models. *NAACL-HLT*.

Sagan, S. D. (2004). The problem of redundancy problem: Why more nuclear security forces may produce less nuclear security. *Risk Analysis, 24*(4), 935–946.

Sheckley, R. (1953, February). Watchbird. *Galaxy Science Fiction, 5*(5), 74–95. Project Gutenberg #29579.

Strathern, M. (1997). 'Improving ratings': Audit in the British University system. *European Review, 5*(3), 305–321.

Terekhov, M., Liu, Z. N. D., Gulcehre, C., & Albanie, S. (2025). *Control tax: The price of keeping AI in check*. arXiv:2506.05296.

Waymo LLC (2025). *Part 573 safety recall report 25E-084*. NHTSA.

Wethington, C., & Tierney, B. (2025, Feb 7). New proposal to expand concealed weapons detection system to all Metro Nashville high schools. *WSMV*.

---

## Declarations

**Companion paper.** The full study behind this one, with the case catalog, the theory and the module specification, is Chernets, V. (2026), *AI-Watchbird (Sheckley): When Automated Oversight Widens Its Own Mandate and Harms What It Guards*, https://ssrn.com/abstract=7473658. The module, the case catalog and the archive of the 144-run test are at https://doi.org/10.5281/zenodo.22774269.

**Funding.** No external funding supported this work.

**Competing interests.** I built and operated the systems of Section 1 and wrote the module of Section 2. I am a named applicant on pending patent applications, not granted patents, covering the automation of putting one question to several models and collecting the answers. They do not cover the oversight components this paper studies. Every step of the field record and of the randomized test is reproducible by hand with any models.

**How this record was made.** The field entries were extracted by ten AI agents, each reading a disjoint slice of the corpora under one protocol that fixed a closed typology of nine failure types, a strength grade, an evidence rule tying every claim to a dated file by path and line, and a sensitivity flag. Part of the coding of the public cases was done the same way: three coders worked independently, each without the others' codes, and the three were models of three different vendors rather than three sessions of one. They gave identical codes for 20 of the 32 public cases, and the rest were settled by majority. The layer that measured this record is therefore built from the same kind of component the paper is about. On 14 September 2026 every run number used here was checked again against the run logs, and every external figure against the regulator document, the publisher's page or the paper itself, and figures that could not be confirmed were dropped. AI assistants were used as instruments under my direction.

**Data and code availability.** The module, its tests, the replay logs and the script that regenerates them are archived at Zenodo as AI-Watchbird-Sheckley version 1.1.0 under the concept identifier https://doi.org/10.5281/zenodo.22774269, which resolves to the current version. The same record holds the case catalog, with the description, source and grade of each entry, and the case analyses the field entries were extracted from, each entry carrying the file and the passage it rests on; those analyses were written in the working language of the records and are published in English translation, produced by machine and checked against the originals, with identifiers, paths, dates and quoted strings carried across unchanged. The randomized test of Section 3 is archived in the same record with its preregistration, the inventory of planted defects, the check that each defect is detected alone, the harness, the analysis script and the event log of every one of the 144 runs. The underlying coordination records are available from me on request. The full version of this work, with the case tables and the theory, is archived as a separate record at https://doi.org/10.5281/zenodo.22849138.

**Ethics.** The records describe the evaluated systems. Decisions of the human principal are reported as dated facts. Third parties appear only through their public documents. No human participants were recruited.

**Quoted text.** Sheckley's story is quoted from Project Gutenberg eBook #29579, whose transcriber found no evidence that the U.S. copyright of the 1953 publication was renewed; the text is in the public domain in the United States.
