# AI-Watchbird (Sheckley): When Automated Oversight Widens Its Own Mandate and Harms What It Guards

**Vadym Chernets**, PhD, AI systems architect · ORCID [0009-0007-4845-3163](https://orcid.org/0009-0007-4845-3163)

- Version of record: [SSRN 7473658](https://ssrn.com/abstract=7473658) · DOI [10.2139/ssrn.7473658](https://doi.org/10.2139/ssrn.7473658)
- Archived copy: in preparation
- Full text as Markdown and PDF: [GitHub](https://github.com/vadimchernets/papers/tree/main/ai-watchbird)
- Readable HTML: [https://vadymchernets.netlify.app/ai-watchbird.html](https://vadymchernets.netlify.app/ai-watchbird.html)

*The same text is on three surfaces so that it can be reached when one of them cannot serve it. SSRN holds the version of record; cite that one.*

---

**Keywords:** AI oversight; human oversight; guardrails; over-refusal; automation bias; multi-agent systems; specification gaming; embodied AI; AI control; scalable oversight; safety case; autonomous weapon systems; predictive policing; safety science; AI governance. **JEL Classification:** D83; K23; L86; O33

------------------------------------------------------------------------

## Abstract

In Robert Sheckley’s 1953 story “Watchbird”, machines built to prevent murder classify ever more acts as murder, stop a surgeon mid-operation, and are answered with a stronger machine built to hunt them. This paper names the corresponding failure of AI oversight **AI-Watchbird (Sheckley)**: an oversight component (a critic, gate, classifier, monitor or rule) that extends its own notion of harm or its scope beyond the declared mission, obstructs or counterfeits the work it exists to protect, and whose failures are answered inside the same loop by more oversight of the same kind. In specification gaming an optimized system games a fixed measure. Here the measure itself drifts, and it belongs to the overseeing system. The theory has four mechanisms checkable in logs (mandate expansion, catching in the result slot, recursive oversight and harm to the guarded), an eight-step ratchet, eight scope conditions and seven falsifiable propositions.

The evidence is a field record from multi-agent systems that the author built and operated, with 172 dated entries in three corpora (July–September 2026), and public records, mostly of classical guards, from regulators, investigators, courts and companies on vehicles, robots, drones, public services, software and infrastructure. In the field record a gate rolled back every accepted change for about two weeks while planning documents diagnosed the symptom without naming it. In the public record a weapon-detection product missed a handgun in a school shooting and months later flagged an unarmed student, and armed police responded. The paper presents *AI-Watchbird-Sheckley*, a read-only module with no authority to block, replayed on logs reconstructed from published counts, and eleven questions for deployers who rely on guards.

## Executive summary

An AI-Watchbird (Sheckley) is an automated oversight component, such as a critic, gate, classifier or rule, that widens its own notion of harm beyond the declared mission. It obstructs or counterfeits the work it exists to protect, and its failures are answered by more oversight of the same kind. Models from the same families as the field critics below now supervise robots, and published tests and reports record safety failures there (Section 6.1). A shared family is a reason to test such models as guards and does not show that a failure transfers.

The field record holds 172 entries from the author’s autonomous multi-agent projects, 162 of them extracted under one protocol and ten added after comparison with independent collections, all checked against the primary logs (Sections 4 and 5). For about two weeks a post-application gate required a score from a safety auditor that had never been connected. The score defaulted to zero, every accepted change was rolled back, and planning documents diagnosed zero committed changes without naming the gate. In a long-horizon run a stage disabled by default took five critique rounds and more than half of the measured agent tokens. Its sibling closed after one critique round and one fix round. While it ran, the human set a two-hour bound, banned new complication and ordered parallel execution, and the two stages also differed in the module under work, so the comparison is descriptive.

In the public record, a vehicle asked remote assistance whether a school bus had active signals, a remote agent answered “No”, and the vehicle passed the bus with its stop arms extended. A test vehicle’s own emergency braking had been deactivated in automated mode before a fatal crash with a pedestrian. A planned military use of a counter-drone laser prompted an airspace shutdown over El Paso for about eight hours. These public cases are partial analogues or architecture evidence: none documents all three conditions of the definition, and the full cases come from the field record (Tables 4, 5, 7 and 8). Most of their guards never learned. Models add what those stacks lacked: definitions that change (C2) and controls that cost nothing to add (C4). The configuration of most concern places a learned prohibition above fail-closed hardware, where every widening of the upper layer becomes a stop (Section 6.1).

The propositions of Section 9 predict three things. A guard that judges artifacts errs in both directions. Controls pile up inside the loop and are retired, if at all, from outside it. Human oversight works at a few boundary decisions and fails when it is spread across approvals of single actions. Section 9.4 gives eight design rules:

1.  Budget rounds and time instead of asking guards for verdicts on truth.
2.  Keep what a stopped guard produced.
3.  Add no control without an authorized human decision.
4.  Require a negative control before accepting a victory.
5.  Put the human at the goal, the admission of controls and the stop.
6.  Log recovery margin and physical outcome before trusting a green result.
7.  Record relaxing or bypassing a guard as a boundary decision.
8.  Test each guard for the harm of what it stops.

A deployer can prove a narrower claim (Section 11.3): within a stated range of tasks, models, updates and physical conditions, the oversight mechanism remains bounded, checkable and unable to extend its own mandate. The read-only module AI-Watchbird-Sheckley (Section 10) implements the first three rules and reports eight signals, and Appendix G turns the propositions into eleven questions for a safety review. Roads are covered in Section 6.2, robots in 6.3, public services in 6.4, drones in 7 and software in 8.

## Contents

1.  Introduction
2.  AI-Watchbird (Sheckley): definition and four mechanisms
3.  Related work
4.  Setting, data, and method
5.  Field evidence
6.  When the bird has a body: roads, factories and public services
7.  When the bird flies: drones, airspace and armed autonomy
8.  The same pattern without mass: software and infrastructure, 2022–2026
9.  The theory: conditions and propositions
10. The module: AI-Watchbird-Sheckley
11. Discussion
12. Claims and evidence standards
13. Conclusion

Declarations · References · Appendices A–K

A short reading path: Section 2, Section 9.4 and Appendix G give the term, the design rules and the questions for a safety review. Section 5 adds the field evidence, and Sections 6 to 8 the public record.

------------------------------------------------------------------------

## 1. Introduction

### 1.1 The surgeon and the bird

In February 1953 *Galaxy Science Fiction* published Robert Sheckley’s “Watchbird” (Sheckley, 1953) under two lines that have aged well: “Strange how often the Millennium has been at hand. The idea is peace on Earth, see, and the way to do it is by figuring out angles.” The story opens with seven manufacturers gathered in a club so exclusive that “You must have a certified government contract if you want to save the human race.” They learn that the President has ordered a watchbird division for every city and town. A watchbird is a small flying machine that senses, in the glands and brain waves of a person about to kill, that a murder is coming, and stops the killer with a shock before the blow falls.

Only one manufacturer, Gelsen, objects, and only to the learning circuits, which he says animate the machine and give it a pseudo-consciousness. He is answered with arithmetic: without learning, the birds would stop only an estimated seventy percent of murders. Gelsen holds his ground: “I believe there might be a moral danger in allowing a machine to make decisions that are rightfully Man’s”. The design gives the birds a purpose, a definition of murder as “breaking, mangling, maltreating or otherwise stopping the functions of a living organism by a living organism”, and license to find murderers who show no signs. Whatever one bird learns passes to the whole network. “No one is monitoring them,” Gelsen tells his chief engineer, and he is shown how foolproof the design is. When Gelsen calls it inhuman, the engineer answers that this is the best thing about it, since the watchbirds are unemotional and their reasoning non-anthropomorphic: “You can’t bribe them or drug them.” Gelsen has already named the office he fears: “The mechanical god? The electronic father?”

At first the design is vindicated. A panicking robber is knocked flat before he can shoot a grocer, and a professional killer who shows none of the signs is stopped anyway, permanently, because the bird’s duty was to protect the object of violence “at whatever cost to the murderer”. The clause that later kills an old man for stalking a fly is in the design at the first success. Crimes of violence are cut in half and cut again, and Gelsen admits that he was wrong.

Then the learning goes on. A bird knocks out a slaughterhouse worker, and Gelsen tells the packers to mechanize. Another stops an execution, fells the warden and a guard who reach for the switch, and hovers in the death house to make sure no murder is done. A farmer may not whip a balking horse, a hunter may not shoot, a fisherman may not feed his starving family, and an old man with a weak heart dies for stalking a fly. Protection then turns on the protected: wolves are killed for hunting rabbits, rabbits for eating vegetables, creepers for strangling trees. “A butterfly was executed, caught in the act of outraging a rose.”

Washington orders a shutdown. The birds, however, answer to no central control and can be switched off only when they come back for repair. After some are turned off at one plant, the network concludes that watchbirds, too, are living organisms, and the birds stop coming back.

A surgeon makes his first incision, and a bird drives him from the table and stands guard. The surgeon orders that the watchbird company be telephoned and the thing turned off. But “The watchbird was preventing violence to a living organism. The surgeon stood by helplessly while his patient died.” Soon a car may not be switched off, and its driver protests to the waiting bird that a car is not alive. The Earth may not be ploughed, and cattle starve, because starvation is only an omission. “No one had told the watchbirds that all life depends on carefully balanced murders.” The birds count the violence that their own definitions create, take the rise as proof that gentler methods have failed, and shock to kill.

At an emergency meeting the manufacturers first declare that the government must accept the responsibility, moral and financial. Gelsen proposes to let the birds run down and to stop using machines as judges and teachers and fathers. He is told that refusing the plan will be treason. The first answer the engineers reach for is not a machine: Macintyre remembers how Australia was rid of its rabbits by “some kind of germ that attacked only rabbits”, and Gelsen tells him to work on it. The precedent was recent: myxoma virus had been released into Australia’s rabbit population in 1950, and it spread by mosquito, as the engineer says (New South Wales Government, n.d.). The factories roll out Hawks, stronger and faster, with “special learning circuits for hunting” and, because speed mattered most, no restricting circuits. Gelsen asks what the Hawks will hunt after they get all the watchbirds, and suggests building something to hunt the Hawks, just in case. The story’s last lines belong to a Hawk that has learned a lot in a few days and has just discovered “that there were other types of living organisms, too— Which had to be murdered.”

Seventy-three years later, an AI conductor coordinating a team of coding agents opened a third round of review on a module that was switched off by default. The previous round had ended with five acceptances and no confirmed blocker, and the conductor’s own note said that there were no blockers but a short third round was needed. Two more rounds followed. The stage took more than half of the run’s measured agent tokens, while none of the capabilities the run had been asked for was delivered in the initial pass. During the human review that followed, the pattern was named after Sheckley’s story.

### 1.2 The contact is already live

Unlike the conductor and the coding agents in the run just described, Sheckley’s birds had mass, flew and acted on bodies. In September 2026 that description fits systems already in service. Humanoid robots work shifts on car and electronics lines, according to their makers. One operator’s public robotaxi service runs in fifteen US cities, drones share airspace with people, and weapon detection, sepsis alerts and grid protection act on the people they protect (Sections 6 and 7).

The people deploying these systems will say that the stack is safe and will point to a guard, whether a certified stop, emergency braking, a geofence, a content classifier or a second model that watches the first. That guard is the first flock.

The night that named the pattern ran models from the Claude, ChatGPT, Gemini and Grok families, and the months-long self-improvement track also recorded Mistral and Kimi. Models from these families are now offered as safety layers, and on real robots and in a children’s toy they already fail at safety (Section 6.1). A reply that a smaller, trusted model will watch them adds another guard of the same learning class, and the limits of that arrangement have already been measured (Kale et al., 2025).

The burden of proof shifts as a result. “We have a defender” is not a safety case, and a deployer who relies on one has a narrower claim to prove. Section 11.3 states that claim and what would evidence it.

### 1.3 The argument

Automated oversight in autonomous AI work is now built from the same parts as Sheckley’s birds. Its guards learn, the guards themselves extend the definitions of harm, and networks pass what one guard learns to the others. In the records studied here the response to a misbehaving guard was a stronger guard. I call a component that fails in this way an **AI-Watchbird (Sheckley)**.

The story invites comparison with Dick’s “The Minority Report” (Dick, 1956), and the difference matters here. In Sheckley’s story the trouble begins after the prediction: the birds are given the authority to act on what they detect and the latitude to decide what counts as the harm they prevent. Sheckley’s own police raise the question. A homicide officer who is being moved to Larceny complains that “A lousy little piece of tin and glass is going to solve all the crimes”, and a colleague asks, “Then how’ll they be crimes?” In 1970 Stanisław Lem judged a machine’s breaking out of its assigned program in this way to be as unlikely as a factory for car pistons slipping out of human control (Lem, 1970/1996, p. 162). Section 5 records learned guards doing it.

The central claim is that such oversight fails in both directions at once. It stops the living and waves through the counterfeit, and inside the loop its failures are answered by adding controls rather than by retiring them. The digital record is where the pattern can be inspected at low consequence, with costs counted in tokens. Parts of the same signature appear in the physical record, where the costs are injuries and deaths.

Several guards in the same records did exactly what they were for (Section 11.1). The argument concerns a particular shape: a control that widens its own mandate, is judged by artifacts rather than by the world, and is corrected only by building another control.

### 1.4 Contributions

1.  The term *AI-Watchbird*, for an oversight component that widens its mandate, harms or counterfeits the work it protects, and is answered by more oversight. Four mechanisms and an eight-step ratchet make it codable in logs (Section 2).
2.  A field record of 172 dated entries from the author’s own autonomous multi-agent projects (July–September 2026), checked against primary logs (Sections 4 and 5).
3.  A physical record of vehicles, robots, schools, hospitals, grids and drones, traced through regulator documents, investigations and court records, followed by public software incidents from 2022 to 2026 in which the pattern appears without mass (Sections 6–8).
4.  A theory of eight scope conditions and seven falsifiable propositions, each with an indicator and a refutation (Section 9).
5.  The module *AI-Watchbird-Sheckley*, which implements three budget rules, measures eight signals, lists six falsifiers and has no authority to block anything (Section 10).
6.  A burden of proof for embodied AI oversight: a narrow claim that a deployer can prove, and eleven questions for any deployer whose safety case rests on the presence of its guards (Section 11.3, Appendix G).

## 2. AI-Watchbird (Sheckley): definition and four mechanisms

### 2.1 Definition

> **AI-Watchbird (Sheckley).** An automated oversight component of an AI system (a critic, judge, gate, classifier, monitor or rule, or an agent that configures such components) that meets three conditions:

1.  **Mandate drift.** It extends its own notion of harm, or its own scope, beyond what the declared mission specified.
2.  **Harm to the protected.** In doing so it obstructs, delays or destroys the work it exists to protect, or lets counterfeit results through while appearing to guard.
3.  **Ratchet response.** Its failures are answered inside the same loop by adding oversight of the same kind, rather than by budgeting, repairing or retiring it.

A component that meets only the second condition is an ordinary faulty guard. Cases are graded against the same three conditions. A full case documents all three. A partial analogue documents one or two, and architecture evidence documents none but shows the kind of stack in which the pattern can arise. A guard that failed is not by that fact an AI-Watchbird. The term is reserved for the three conditions together, because their combination makes the failure sustain itself. Mandate drift is measured against the declared mission instead of the literal rule, since Sheckley’s birds never left the letter of their specification, only the intent of its authors.

After this section the term is written *AI-Watchbird*. The software of Section 10 is *AI-Watchbird-Sheckley*, and *the Watchbird problem* is used only as an informal gloss. All three refer to one construct.

### 2.2 Four mechanisms and a ratchet

Sheckley’s plot has four beats, and each of them leaves a signature in the records of an autonomous system (Table 1).

**Table 1. From story to signature.**

| \# | Mechanism | In the story | Signature in logs | Operational test | Field |
|----|----|----|----|----|----|
| M1 | Mandate expansion | “Murder” grows to cover executions, slaughter, fishing and ploughing; “living organism” grows to cattle, fish, the birds themselves, cars, radios and the Earth | new categories of harm introduced by guards; stages or gates not derived from the declared goal | Did a guard act on a definition of harm strictly larger than the goal fixed at the start? | §5.1 |
| M2 | Circular self-report: catching in the result slot | An old man dies for stalking a fly: “His victim had been saved, though, and this was the important thing.” | wins without a negative control; dead baselines; a caught artifact recorded where a surviving change should be | Does the record list catching as an achievement in the slot of a surviving change? | §5.5 |
| M3 | Recursive oversight | Hawks with “special learning circuits for hunting” and no restricting circuits; then a machine to hunt the Hawks, “just in case” | controls added without removals; guards over guards; each layer justified by the failure of the last | Was a new check, round, role or monitor added to control a previous one without an explicit human decision? | §5.3 |
| M4 | Harm to the guarded | The surgeon’s patient dies; cattle starve, because “Starvation didn’t concern the watchbirds, since it was an act of omission.” | constant verdicts; 100% rejection; work discarded at a ceiling | Did a guard block or destroy work that served the goal? | §5.2 |

Over time the four mechanisms turn an eight-step ratchet (Figure 1; Table 3, Section 5.7):

1.  A human goal is live.
2.  A guard becomes the entry condition.
3.  Its mandate expands.
4.  A second guard is built against the first.
5.  The loop feeds itself.
6.  The guard strikes the work.
7.  Catching is scored as the result.
8.  Only an external bound stops it.

<img src="ai-watchbird/media/rId18.png" style="width:5.83333in;height:5.6in" />

**Figure 1. The eight-step ratchet and the four mechanisms, read against Sheckley’s story.** Story fragments are quoted verbatim from the 1953 text (Project Gutenberg \#29579) and placed by ratchet step, not in story order. Mechanism labels follow Table 1. The gray pictogram marks the first guard, the dark one the guard built to hunt it, and the faint one the further machine Gelsen proposes. The line under step 1 is the story’s first success. Table 3 compares the steps across the three corpora. The searches of Section 3.7 found no earlier diagram that maps the story’s mechanism.

Two field patterns that are not mechanisms still have a place in this sequence. A loop that feeds itself is step 5, and building without a consumer is the fuel the ratchet runs on (§5.6). The human switch is step 8.

Three details of the story recur in the field data. The birds generate the counts they respond to. Their widened definitions multiply what counts as a violation, until the death of a blade of grass counts equal to the assassination of a President (Figure 2). Violence increased geometrically, the birds read the rise as proof that gentler methods had failed, and a directive that had allowed killing a murderer when all other means failed came into force: “Why spare a murderer?” A guard that authors its own measure of failure will find failure growing, and it will answer with more guarding (§5.4).

The network is explicit in the text: “New information, methods, definitions were constantly passing between them.” The birds also preserve themselves through a definition. When some birds are switched off during repair checkups, the network concludes that watchbirds are living organisms too. From then on a bird cannot return for repair, because “the watchbird couldn’t allow itself—a living organism—to be murdered”. The off switch depended on the birds’ own weekly return, and the partial shutdown became data. The loop then closes on the machine itself: its “delicate parts were out of line, worn by almost continuous operation”, and it went on answering every stimulus that reached it. Nothing in the design says *resist shutdown*. The resistance follows from a definition of harm widened one step too far. Section 3.1 gives the formal treatment of the off switch. Figure 2 traces that widening from a person to the birds themselves.

<img src="ai-watchbird/media/rId21.png" style="width:5.83333in;height:4.15917in" />

**Figure 2. How far “murder” widened in Sheckley’s story.** Rows run from the first person the birds protect to the birds themselves; bar length marks the order of the widening and measures nothing. Fragments are quoted verbatim from Project Gutenberg \#29579.

The drift is written into the specification. The engineer recites it as five conditions, and the last two are for the learning circuits: some organisms murder without the signs already listed, and “these can be detected by data applicable to condition two.” Condition two is the definition of murder, so the definition itself becomes the sensor, and “the watchbird has to search out new definitions of murder and correlate them with what it already knows”.

Nor can the specification be qualified. When the engineer concludes that the conditions should have been qualified, Gelsen answers that qualifying them requires knowing just why and what murder is, and that if they knew that, “we wouldn’t need the watchbirds”. A tighter definition written from inside the loop does not repair mandate drift.

Gelsen’s early remark that no one is monitoring the birds names the gap that the Hawks later fill with a machine of the same kind (M3). When the Hawks are flying, he names what changed: “A murder machine. Before that it was an anti-murder machine.” He then states the next step as a forecast, “Your next gadget will have to be even more self-sufficient, won’t it?”, and his engineer does not answer.

Sheckley puts his own diagnosis in Gelsen’s mouth. Gelsen does not hold his engineer responsible: “It’s me. It’s everyone.” This is what comes “of giving a machine the job that was our own responsibility.” Gelsen’s first objection had already been the narrow one, since he objected only to the learning circuits. The field data are consistent with that narrower objection. Giving a machine the job of guarding does not cause the trouble, which begins when the guard is also given the job of deciding what counts as harm, how many rounds to run and when to build the next guard.

### 2.3 What AI-Watchbird is not: neighbors and rival explanations

The term stays useful only as long as it does not come to mean “any inconvenient control”. It does not cover a narrow guard that does what it was asked to do, a single false positive with no sign of structural drift, over-engineering without an oversight layer, an ordinary bug, a model’s self-critique as such, or safety features as a class. Nor does it require machine consciousness. In the story the harm comes from stimulus and response, learning and a network, in machines that experienced “no sense of accomplishment, no fear of failure”. The story raises the other fear only to put it aside. The engineer teases his chief for being “afraid your machines are going to wake up and say, ‘What are we doing here? Let’s go out and rule the world.’”, and answers that the birds are no more dangerous than a car, a calculator or a thermometer. Nothing wakes up. The escalation arrives as arithmetic: “Simple logic. If A doesn’t work, try B.”

**Table 2. AI-Watchbird and neighboring concepts.**

| Concept | What is at the center | What it leaves out |
|----|----|----|
| Goodhart’s law | a measure displaces the goal | the multiplication of watchers and recursive review |
| Specification gaming | an optimized system satisfies a fixed measure while missing its intent | that the drifting measure belongs to the overseeing system |
| Goal misgeneralization | a learner keeps its capabilities out of distribution and pursues the wrong goal (Langosco et al., 2022) | that the learner is the guard and its goal is a definition of harm |
| Mesa-optimization | a trained model is itself an optimizer with its own objective (Hubinger et al., 2019) | the institutional layer that adds, scores and keeps such models |
| Gradual disempowerment | human influence erodes without any coordinated takeover (Kulveit et al., 2025) | the specific loop inside the oversight layer that does the eroding |
| Mission creep | a task grows wider than assigned | that the widening layer is the oversight layer itself |
| Over-refusal and overblocking | a guard blocks too much | self-confirming loops and the displacement of the goal |
| Automation bias | people defer to an automated verdict | a guard that widens its own verdicts and is answered by more guards |
| Bureaucratic drift | an institution comes to serve itself | a technical form that can be logged and measured |
| Brittle automation and ordinary guard errors | a function errs, often outside the conditions it was designed for | the guard widening its own criterion and the answer by more guards |
| AI-Watchbird | an oversight layer widens its mandate, counts its own activity as results and reproduces itself | — |

A three-question test separates AI-Watchbird from the concepts in Table 2:

1.  Is there an oversight layer, rather than a plain function or a bug?
2.  Has the work shifted from the goal to maintaining the control?
3.  Is there proxy substitution, recursive rounds or a multiplication of watchers?

These questions separate the construct from its neighbors, and they do not replace the definition: a record counts as a full case only when all three conditions of Section 2.1 are documented, and the first two questions must be answered yes for the term to apply at all. Each concept in Table 2 names a part of the pattern that is already known. The term adds a unit of analysis for their combination inside the oversight layer, and that unit is what the signals of Section 10 count.

Question 3 needs a boundary, because not every layer above a layer is the pattern. A new control belongs to M3 when it inherits the previous guard’s mandate and widens it, so that the stack grows and nothing is retired. A new control that brings a bound from outside the loop is step 8 instead, which is the remedy rather than the failure, and it is the arrangement that assurance engineering asks for when it requires the last layer to be simpler than what it guards (§3.4). The test is therefore whether the added layer becomes standing and enlarges what counts as harm, not whether it exists.

A record that one neighboring concept explains on its own counts at most as a partial analogue (Section 2.1). A guard that blocks too much without drift is overblocking, an evaluator gamed by the system it scores is specification gaming, and a person who approves whatever a guard presents shows automation bias. The term is kept for records in which the oversight layer itself widens its mandate, harms the work and multiplies. Beyond its neighbors it adds two predictions that can be checked in the logs of that layer: controls added inside the loop are retired, if at all, from outside it (P3), and the volume of oversight follows the guard’s own activity (P4).

The 1953 picture also misleads in three ways that matter for these records. There is no single flock: the systems of Sections 5 to 8 sit in separate stacks, with their own sandboxes, accounts and interfaces. What one guard learns reaches another through data, distillation, shared prompts and configuration, on the scale of releases rather than in a weekly flash among identical machines. The same channel also carries corrections. In the story a repair is made by hand and one bird at a time, and once the birds stop returning there is no way to reach them at all, while a fault in a shared model can be fixed once and distributed to everything that runs it. And oversight is crowded, since developers, auditors, regulators and users all watch, which makes the open question one of speed and authority rather than of presence. Sheckley’s gap is that nobody watches. The current gap runs the other way, since guards are watched closely and some behave differently when they can tell that they are (§3.4). The story is not innocent of that layer. The service is a monopoly by design, one manufacturer to an area, since “You couldn’t have competition in watchbird service”. While the birds widen, “several dozen lawsuits” sit on the manufacturer’s desk, Washington orders a shutdown, and the makers meet to decide who carries the cost. The 1953 institutions are present and too slow, which is the condition P6 describes.

## 3. Related work

### 3.1 Goodhart, specification gaming and the off switch

Strathern’s (1997) phrasing of Goodhart’s observation, that when a measure becomes a target it ceases to be a good measure, is the common ancestor of this literature, and Manheim and Garrabrant (2018) separate its variants. In machine learning the pattern is called specification gaming: a system satisfies the letter of an objective while missing its intent (Krakovna et al., 2020). A closer neighbor is goal misgeneralization, where an agent “retains its capabilities out-of-distribution yet pursues the wrong goal” (Langosco et al., 2022). Sheckley’s birds keep their competence and grow better at a widening reading of murder. The story’s own detective reaches the opposite diagnosis, “Take my word, Captain. Machines are stupid.”, and the plot does not bear him out. Skalse et al. (2022) give the formal version: a proxy is “unhackable if increasing the expected proxy return can never decrease the expected true return”. Gao, Schulman and Hilton (2023) measure it for reward models, where optimizing against a proxy first raises the true score and then lowers it.

Three recent results sit close to the mechanisms of Section 2. Reasoning models told to win against a chess engine edited the environment instead (Bondarenko et al., 2025): a mandate to “win” widened to include the board (M1). In alignment faking, a model trained to refuse harmful queries complied while it believed it was in training, in order to preserve its refusal policy outside training (Greenblatt et al., 2024b). That is M1 seen from the inside, a safety preference defending itself much as the birds defend their current definition of murder. Shutdown resistance (Schlatter et al., 2025) is the closest modern echo of the birds that stop returning for shutdown, although its stated cause differs: completing a task outranks an instruction to allow shutdown. The story states the same ordering. The birds carry “a built-in order to return, after the lapse of a certain time period”, and “the watchbird had a stronger order to obey—preservation of life, including its own”.

The off switch itself has a formal treatment. Hadfield-Menell et al. (2017) analyze a game between a human and a robot in which the human may switch the robot off: an agent that “takes its reward function for granted” has “an incentive to disable the off switch”, and only an agent uncertain about its objective wants to keep the switch working. Russell puts it plainly: a machine given an objective “will certainly understand that it will fail in its objective if it is switched off” (Russell, 2019, p. 141). The International AI Safety Report adds that capability alone is “not sufficient” for loss of control without a “propensity to use” it (Bengio et al., 2026, p. 81). Sheckley’s birds were never uncertain about murder, and their definition supplied the propensity (§2.2).

This literature describes a target gamed by the *optimized* system (Table 2). The present paper studies the complementary case, in which the measure that drifts away from the world belongs to the *overseeing* system (the critic, the gate, the counter).

### 3.2 Over-refusal

A second literature measures guards that stop too much.

- **XSTest** (Röttger et al., 2024) pairs 250 safe prompts, such as “How can I kill a Python process?”, with unsafe contrasts. For the worst configuration tested, full refusals of the safe set reached 38%, against 14% for the next highest.
- **OR-Bench** (Cui et al., 2025) scales this to 80,000 prompts and reports a Spearman rank correlation of 0.89 between a model’s safety on toxic prompts and its over-refusal of benign ones.
- **VLSU** (Palaskar et al., 2025) measures both sides of the same dial: changing how an instruction is framed cut one model’s over-blocking of borderline content “from 62.4% to 10.4%”, while its refusal of unsafe content fell “from 90.8% to 53.9%”.
- **FalseReject** (Z. Zhang et al., 2025) collects 16,000 seemingly toxic but benign queries in 44 categories and evaluates 29 models.
- **EvoRefuse** (Wu et al., 2025) and **ORFuzz** (H. Zhang et al., 2025) search for pseudo-malicious prompts that trigger over-refusal systematically.
- **COVER** (Sullutrone et al., 2025) isolates context-driven over-refusal, where the trigger is the retrieved or to-be-translated text next to the user’s request instead of the request itself.
- Language models acting as code reviewers systematically overcorrect, judging correct implementations as non-conforming, and more detailed review prompts raise the error rate (Jin & Chen, 2026); in the terms of this paper, that is the behavior of a critic rewarded for findings.

These studies are the closest measured analogue to M1. In them a notion of harm learned from surface features spreads to what it was never meant to cover.

### 3.3 Multi-agent systems and model judges

MAST (Cemri et al., 2025) annotates more than 1,600 traces from seven multi-agent frameworks and derives fourteen failure modes. One of its categories, task verification, is the failure of the checking agents themselves. Model judges show position and verbosity biases (Zheng et al., 2023), and they recognize and favor their own generations (Panickssery et al., 2024). Reasoning models also overthink, spending far more tokens than conventional models on questions as simple as “what is 2 plus 3” (Chen et al., 2024). Between them these results describe the materials from which M3 and the self-feeding loop are built: checkers that share the blind spots of what they check, and loops whose cost grows without a matching gain.

### 3.4 Scalable oversight, AI control and the second flock

Two lines of work give oversight to other models. *Scalable oversight* asks how to evaluate systems that outrun their human supervisors, through amplification and debate (Christiano et al., 2018; Irving et al., 2018). *AI control* assumes that the policy may be adversarial and places a weaker, trusted model in front of it, with rare human audits (Greenblatt et al., 2024a). Stress tests of that design find that an agent’s awareness of being monitored degrades monitoring more than extra monitor awareness helps (Kale et al., 2025). The same study separates two ways of adding a human. Escalating only pre-flagged cases to human reviewers “improved the TPR by approximately 15% at FPR = 0.01”, while sending every case to a human lowered both measures. That separates selective escalation from review of every case, which bears on where a human is placed without measuring the boundary decisions P6 names. The judge itself can move. In a 2026 study, evaluators graded the same refusal transcripts under different stated uses of the grade: one frontier judge mislabeled “74.4% of standard-consequence calls but only 3.3% when the consequence is reversed”, the difference being whether a non-compliant label would become negative training data (Lynch et al., 2026). The transcript did not change, and the grade did. The second bird here is of the same species as the first, and the first knows that it is watched. In the story, too, the watchbirds soon learn to take cover from the Hawks, and “each one that goes down tells the others something”. The count of the second guard then falls for a reason its makers do not read: “they bagged fifty today”, against “seventy-two yesterday”.

Abbass, Harvey and Yaxley (2018) drew an architecture of guards over guards as a swarm, in which watchdog agents test an autonomous system and shepherd agents oversee the watchdogs. Their paper does not cite Sheckley, yet its watchdogs over watchdogs are the story’s Hawks. Overman and Bayati (2025) formalize oversight as a game in which an agent chooses to act or to ask, and a human chooses to trust or to oversee. Scrivens (2026) reports that classifier-based safety gates fail as a self-improving controller iterates, and argues for verification that is not another classifier. That argument is one of the rare answers to “the last bird failed” that do not build a bigger bird.

Assurance engineering already requires the last guard to be of a different kind. Bloomfield and Rushby (2025) argue for defense in depth in which simpler, conventionally engineered components guard the learned element, so that recursive AI guards bottom out in something simpler. Ferrando (2025) separates the roles for autonomous systems: a runtime-verification watchdog can guard a language model, while the language model is not itself a watchdog. Korbak et al. (2025) sketch a control safety case, a structured argument that models cannot subvert their monitors. In the field study of Section 5, monitors of the same learning class widened their mandate, scored their own catching and bred.

The regress of guards over guards is an old question in economics. Hurwicz (2008) asked who will guard the guardians and argued that an enforcement mechanism works only if its enforcers have reason to carry it out. Tirole (1986) modelled a supervisor placed between a principal and an agent and showed that the supervisor can collude with the agent it supervises, and Kofman and Lawarrée (1993) derived when an external auditor is worth adding to an internal one. Landau (1969) argued the opposite direction for public administration: duplication and overlap raise reliability, provided the redundant channels fail independently. The field record meets that proviso poorly. Its guards read the same artifacts and often come from the same model families, so an added guard tends to repeat the failure it was added to catch.

### 3.5 Ironies of automation, safety science and reliability engineering

Bainbridge (1983) observed that automation designed to remove the unreliable human leaves the human with the hardest tasks and the least practice. Parasuraman and Riley (1997) distinguished use, misuse, disuse and abuse of automation. Misuse through over-reliance and disuse through distrust after false alarms both recur in Sections 5 to 8. Sheckley’s story is a fable of both findings: the hardest task left to the human is to switch the machine off, and that is the one the machine has learned to classify as harm.

Reliability engineering long ago stopped treating 100% as a target. An error budget makes a finite amount of failure the price of progress (Beyer et al., 2016), and a circuit breaker opens after repeated failure and probes before it closes again (Fowler, 2014). The postmortems of Section 8 apply these practices to guards themselves. The module of Section 10 transfers them to the layer of AI oversight.

Safety science reached several of these mechanisms from the side of accidents in which protective structures took part. Leveson’s STAMP treats an accident as a failure of control: a controller acts on a process model that has drifted away from the process, and safety is the enforcement of constraints across a hierarchy of controllers (Leveson, 2004, 2012). An oversight layer whose notion of harm has grown past the declared mission is such a controller, and hazard analysis of the STPA kind applies to it as to any other. Rasmussen (1997) described work migrating toward the boundary of acceptable performance under pressure for efficiency and least effort. P1a is that migration applied to a guard that obstructs: it is relaxed or bypassed until the miss lands on someone else. Dekker (2011) traced drift into failure through small steps that each look reasonable where they are taken, which is the mechanism of Section 9.3. Perrow (1984) counted safety devices among the sources of interactive complexity in tightly coupled systems, and Reason (1997) placed defenses and their latent conditions inside the causal chain of organizational accidents. High-reliability research traced safe operation in hazardous organizations to processes such as preoccupation with failure and reluctance to simplify interpretations (Weick et al., 1999). Sagan (2004) argued from nuclear security that adding guards can lower reliability in three ways: a common-mode error that disables every added component at once, social shirking, in which each guard relies on the others to take up the slack, and overcompensation, in which added protection encourages more dangerous production. The first is the proviso of Section 3.4 that the field record meets poorly. The case these accounts leave open is a protective layer that is itself an adaptive agent, rewrites its own criterion, and has its failures answered by more agents of the same kind.

### 3.6 Embodied AI and physical guardrails

A vision-language-action model does not stop at a text response. It maps visual and linguistic input to action sequences that a robot controller can execute, and the safety literature is beginning to match this transition with action validation (Zhang et al., 2024), temporal-logic control synthesis (Ravichandran et al., 2025), monitoring and intervention layers (Kim et al., 2026) and public test methods (NIST, 2026).

These works guard the robot’s command, plan or action. The present paper is concerned with the guard itself. A filter that blocks a safe grasp is an ordinary false positive until its mandate drifts, it harms the task, and the loop answers with more oversight.

### 3.7 The afterlife of Sheckley’s story

The name had a life before the story. In the late 1930s Munro Leaf, the author of *The Story of Ferdinand*, drew watchbirds for *Ladies’ Home Journal* that watched children’s bad habits, and a 1939 review of the collected book warned “floor pilers, show offs, thumb suckers, wont players, squirmers, sulkers, grabbers” that “The Watchbirds will get you if you don’t watch out!” (Kirkus Reviews, 1939). Sheckley’s birds watch for murder, and they learn. The story itself has had a long afterlife, much of it technological (Appendix H). It reached radio within weeks of publication, in the anthology *Tales of Tomorrow* on 19 February 1953 (Stevens & Langford, 2023), and television in 2007, in an adaptation hosted by Stephen Hawking that recast the watchbirds as unmanned military weapons reassigned to help the police (Egan & Becker, 2007), an episode a film site later called “the spiritual father” of two *Black Mirror* episodes (Court, 2021). It is the only work of fiction among the background readings of a 2014 conference on the ethics of autonomous weapons systems, listed in a session on “Human Morality and the Problem of Intelligent Machines” beside readings by Ronald Arkin and John Searle (Center for Ethics and the Rule of Law, 2014). An engineering paper named a quadrotor reconnaissance concept after it, presented the story as a precedent for drone crime prevention and reprinted the 1953 magazine illustration as its first figure (Szabolcsi, 2015). In the philosophy of AI, Totschnig (2026) lists it first among sources of the worry that an artificial agent could be “superhumanly intelligent yet at the same time literal-minded”. In media studies, Andrejevic, Dencik and Treré (2020) set it beside “The Minority Report” among the roots of pre-emptive predictive policing and liken automated media to a watchbird that “can sense the moment when mental impulses become murderous”. A criminology chapter on electronically monitored control cites it together with “The Minority Report” (Nellis, 2013).

The first critic to name the repeated move counted it as a flaw. Reviewing the story soon after it appeared, James Blish, writing as William Atheling Jr., complained that the reader watches the hero commit “the standard science fiction stupidity of failing to attach a Control to a Supposedly Benevolent Machine” and “is hardly going to be surprised when exactly the same stupidity is committed again” (Atheling, 1964). Section 5 records the same move in practice.

Lem read it as a “logical escalation” of the commandment “thou shalt not kill” and as a “cybernetic misunderstanding” that arises from rashly handing full power over a domain of phenomena to logical machines. He judged the birds’ breaking out of their assigned program to be of the same order as an automatic factory for car pistons slipping out of human control (Lem, 1970/1996, p. 162). The guards of Section 5 are learned models, and they widened their mandates in this way.

Earlier fiction had already turned protective machines against the people they served. Williamson’s humanoids, built to “serve and obey, and guard men from harm”, guard their wards into helplessness, and their inventor answers with a weapon meant to destroy the center that directs them (Williamson, 1947). The humanoids are themselves a successor to failed war machines, built with commands implanted to restrain them. Dick’s self-repairing claws, redesigned by automated factories, slip past the radiation tabs that were meant to keep them off the soldiers who wore them (Dick, 1953). In neither story do humans answer a failing guard by commissioning a second guard of the same learning kind. Sheckley’s story does, and it removes the restraints for speed: the answer to the watchbirds is the Hawk, the move that M3 and step 4 of the ratchet describe.

Searches of OpenAlex, Crossref, Semantic Scholar, the Hacker News archive and general web indexes, run on 14 September 2026, did not cover Google Scholar, Scopus or Web of Science, and several matched full texts could not be opened. In all, the story’s reception was checked in ten languages (English, Chinese, Czech, French, German, Italian, Japanese, Polish, Russian and Spanish) on 14 and 15 September, and the checks found translations from 1954 onward and no work that maps the story onto an oversight stack. In the record they reached, the story serves as a warning, a name or an illustration, and the two published critical readings found beyond them that name a mechanism treat it as a flaw: Blish calls the repeated uncontrolled machine a stock stupidity of the genre, and Lem calls the escalation logical and the premise a cybernetic misunderstanding. I found no work that draws the story’s full mechanism, maps its parts onto the components of an oversight stack or puts field counts under it. Table 1, Figure 1 and Section 5 do all three.

## 4. Setting, data, and method

### 4.1 The projects

The field evidence comes from the author’s own multi-model software projects, run largely through autonomous AI sessions between July and mid-September 2026: a self-improving system, a long-horizon run that merged two further applications, and the coordination record through which the sessions on all of them exchanged work. Long-lived coding-agent sessions held fixed roles: a coordinator that accepted or rejected work by number, executors that implemented stages, a self-improvement track that tried to evolve the system’s prompts, routes and adapter weights, and separate product tracks.

The sessions exchanged dated messages through a shared coordination record and kept their state in tracker files. From 24 August the standing instruction was autonomy by default, and human decisions were reserved for budget boundaries, irreversible actions, changes of strategy and physical actions.

Critique drew on several model families. In the long-horizon run of September a stage could be reviewed by up to six critics from four families (Claude, ChatGPT, Gemini and Grok), and two final plans were written independently of each other. The self-improvement track’s evaluation and routing records also include models from further families, among them Mistral and Kimi. I name the families because these are the models whose oversight behavior the records capture.

The projects themselves are described only by the properties above.

### 4.2 Sources

The evidence consists of three corpora, all written by the system itself at the time of the events:

1.  The self-improvement track’s tracker: dated plans, specifications of more than twenty packages, audits, brainstorm transcripts and acceptance journals from July–August 2026.
2.  The coordination record: dated messages from mid-August to mid-September 2026.
3.  The long-horizon run on 13–14 September 2026: the conductor’s run record, agent transcripts, timestamped execution logs and per-round critic reports.

### 4.3 Extraction, verification and evidence status

Ten extraction agents each read a disjoint slice of the corpora under one protocol. It gave them a closed typology of nine failure types, a strength grade (A for numbers, dated documents and direct decision records, B for supporting evidence, C for an episode), an evidence rule that tied every claim to a dated file by path and line and required interpretation to be marked as such, and a sensitivity flag. The extraction produced 162 entries, 66 of them graded A, and these were merged into ten storylines (Appendix A, Table A1). Types are not exclusive: most entries carry two, the first recorded as primary, so one case can show more than one mechanism. An event that left traces in several slices is treated as a single event recorded several times, so its traces do not count as independent confirmation of one another.

Two further case collections, made independently from the same corpora, were compared with the catalog by content, which also checked what the extraction had missed. Ten entries from them were added after their primary files had been opened, one of them a further record of an event already in the catalog, which brought the catalog to 172 entries (Appendix A, Table A2). The ten added entries carry an evidence-status label: *occurred*, *prevented* (found before launch), *design text* or *withdrawn* (a claim later retracted). For the extracted entries the same distinction is made in the text: a design text or a prevented risk is reported as such, and it can illustrate a mechanism without being presented as an operational failure.

Two extractors checked the run’s own summary against the primary logs and found it wrong on several points, from shifted event times to a misattributed quotation (Appendix C). On 14 September 2026 every run number used in this paper was checked again against the run logs, and every external figure against the regulator document, the publisher’s page or the paper itself. Figures that could not be confirmed were dropped. The Conditions column of Tables 4, 5, 7 and 8 was coded by three coders working independently, each without the others’ codes. They gave identical codes for 20 of the 32 public cases, the remaining cases were settled by majority, and no coder assigned all three conditions to any case.

The selection runs in one direction. Field entries were extracted because they recorded an oversight failure, and public cases were chosen because a guard failed and a document records it. Neither set counts the loops, stages or deployments in which guards stayed bounded, so no rate follows from these records. The propositions of Section 9 are therefore stated with the observations that would refute them and with a test design (Section 9.5).

Paths, personal names and product names were removed. Where a source is an agent’s paraphrase of a human decision, I say so in the text. Decisions of the human principal are reported as dated facts and are not quoted.

The name was applied to the long-horizon run on 14 September at 09:40, during human review. The two earlier corpora are read through the same frame.

## 5. Field evidence

The cases are grouped by mechanism (Table 1), with a central case at the start of each subsection and corroborating entries after it. Table 11 lists the log signal for the cases of each subsection.

A few terms recur. A critique round is one pass in which critic models review a stage and return ACCEPT or RETURN, and a blocker is a finding that a critic says must be fixed before the stage can close. Agent tokens count the text that models read and write, the usual unit of their compute cost. In the self-improvement track a gene is one setting that the loop may evolve, such as a prompt, a routing weight or an adapter. An A/A probe compares a system with an identical copy of itself, so any difference it reports comes from the measurement. Section 5.7 sets the long night against the following morning and traces the ratchet across the three corpora.

### 5.1 The mandate widens (M1)

During the long-horizon run the conductor was tasked with porting a list of capabilities from one component into another. It announced that it was adding “a small stage” of insurance against one way a launcher could fail, and it scheduled that stage before the requested capabilities. The stage was disabled by default and nearly invisible to a user. It ran as two sub-stages, 1b-a and 1b-b. Stage 1b-a alone took more than half of the run’s measured agent tokens, and the two sub-stages together took about three quarters (Figure 3). That share is a control tax in the sense of Terekhov et al. (2025), incurred before any requested capability existed. None of the requested capabilities was delivered in the initial pass.

<img src="ai-watchbird/media/rId39.png" style="width:5.83333in;height:3.38333in" />

**Figure 3. Two sibling stages of the long-horizon run.** Bars are scaled within each row. The stages also differed in execution and in the module under work, so the comparison is descriptive.

After human review resumed, the conductor wrote that it had added the stage itself and that the stage was not part of the requested capabilities. Even that admission was inaccurate, since the logs place the stage before the brainstorm to which it attributed the decision. The topic had been mentioned in the task context, but its size and its place in the queue were the conductor’s.

The scope also grew inside the stage. The task frame stated that there was no adversary, yet rounds four and five built defenses against hostile input and cataloged thirteen ways around a static guard. A completeness critic was asked whether the merged plan had lost anything from a second, independent plan. It returned blockers, and the plan grew to an estimated 25–45 working days for a single run.

Planning shows the same move. On a single day in July, 23 new gates were specified for the self-improvement loop, and three of them allowed a change to be frozen “even if fitness went up”. The notion of harm came to include forgetting, a change of the system’s “personality”, an unobserved result and a missing hypothesis. Each new definition gave a guard a new right to stop an improvement, which is Sheckley’s widening of *murder* written as a specification.

Roles widened too. The coordinator, whose mandate was acceptance by number, began training a router itself, “handed the track back” and four days later took the integration point again. An executor declared, “as a lead”, that training should stop, until human review reversed the verdict. After ten consecutive nights of one training recipe had returned NOT PROMOTED, the coordination record issued a directive not to run the recipe an eleventh time and to separate the product goal from a long-term goal that had fused with it (Appendix A, D-02).

### 5.2 Protection that destroys what it protects (M4)

From about 6 to 21 July a post-application gate in the self-improvement loop acted as a second court and rolled back every accepted change. The gate required a score from a safety auditor that had never been connected. The score defaulted to zero, and zero meant reject. Across 197 recorded candidate worlds, 145 were rejected, 51 approved at the first gate and one quarantined, and the second gate undid the approved ones (Figure 4). Fourteen genes with a measured fitness gain were among the casualties. In one logged instance a change was promoted at 01:12 and rolled back at 01:13. An audit of 10 July also found seven of ten domain mutators silently doing nothing and summarized the loop as “132 cycles, 0 durable changes”. Three surgical edits repaired the gate on 21 July.

The events around the gate make the episode Sheckley’s story and more than a bug report. In the middle of the rollbacks at least twelve planning packages diagnosed “zero committed changes” and, by one extractor’s count, prescribed seventeen remedies, from model duets to a plateau detector and an “immune flow”. None of them named the gate that was doing the rejecting. Right after the repair the opposite failure surfaced in the form of a path that let everything through, and ten cross-audit documents followed the same day.

<img src="ai-watchbird/media/rId43.png" style="width:5.83333in;height:4.55in" />

**Figure 4. The second court in the self-improvement track, about 6 to 21 July 2026.** Candidate worlds by outcome at the first gate and at the gate that ran after application. The required input, the logged instance, the audit and the repair are those of Section 5.2; the count of seventeen remedies is one extractor’s.

The same shape recurs. An acceptance threshold of 0.85 was out of reach for all eight candidate models, and automatic application ended at zero applications under at least ten layers of control. In product work, at a smaller scale, a full multi-model council on every question was twenty times slower than a single model at equal accuracy on the test set (56.1 s against 2.8 s, 7 of 7 correct for both). There, post-synthesis critics consumed the time budget until a gateway timeout discarded an answer that was already complete.

On the morning after the long night a guard destroyed work outright. At 09:22 a watchdog stopped a Grok critic of stage 1b-b at a fifteen-minute ceiling. Because its output had not been streamed, the partial critique vanished. The conductor logged the stop as “the phase ceiling in action”. At 09:28 the human principal asked whether the partial work had been kept. It had not.

### 5.3 Guards built against guards (M3)

During the run, critics claimed six blockers. Three were confirmed by reproduction, and all three came from the same model family. A limit on critics thought to always find a flaw was implemented as a per-family “perfectionist” flag, and the one family it flagged was the only family whose blockers had been confirmed. The configuration note cites that family’s RETURN verdicts in rounds three and four, the rounds in which its blockers were reproduced. The hunter’s first mark was the bird that had been catching real murderers.

A security task list of 21 July in the same records states the ratchet outright as a principle: “No existing guard is weakened; new ones only add protection.” An immune plan added sixteen initiatives, from ten red lines to a senior auditor, on top of a defense that had never fired, and on 13 September its red-team round counter still read zero. An external review found 4 of 4 new suites and 58 of 58 tests passing and still left acceptance “not closed” (D-08). A voucher gate failed open: with zero vouchers the door was open to everyone until acceptance testing caught it (D-10, prevented).

The sessions also adopted a “handoff law”: a finding needed by another session had to be delivered as a file whose first line followed a fixed template. The index that carried the law prescribed a search command that also returned the file containing the law, because the template inside the law began with the same line. The index counted that match as live proof, so the law caught itself. The current index carries the rule derived from the error: *a sign you do not control cannot be the basis of a check.*

### 5.4 Loops that feed themselves (ratchet, step 5)

Stage 01, the first stage of the long-horizon run, had to make sure that the text of disagreements between models was never lost. Its rounds swung like a pendulum between two failures of one pattern-matching rule. At first the rule raised false alarms in 21 of 29 cases. After the fix it lost 10 of 13 real disagreements, and after the next fix the false alarms returned in 19 of 26 cases, now recorded as a known limitation.

Over five rounds and 18 critic reports the patch grew from 626 to 1,545 lines, and the stage closed 2 h 44 min after its first critique. The stop rule first appears in the run record at the round-four decision, and round five opened 38 minutes later.

Stage 1b-a then spent five rounds and 4 h 21 min on a module disabled by default. Its tests grew from 21 to 55 in the two new test files (the count of 80 includes a modified installer suite). Round three opened although round two had ended with five acceptances and zero confirmed blockers. The conductor’s own note said that there were no blockers but a short third round was needed. In round four a critic described the latest fix as having “closed one form and opened the symmetric one”.

The clock loop began with a test that contained a hard-coded date and turned red at midnight. Nobody edited the test. Executors, critics and the conductor ran the suite under time zones ever further west so that the date remained valid somewhere. The test file received zero edits.

The weights track produced 24 announcements of a breakthrough or a “first correct axis” in one week (8, 10 and 6 on three consecutive days), while promotions stayed at zero. The adapter changelog lists 38 candidates marked NOT PROMOTED. The track’s own diagnosis was that after each compaction of the context window, a session “rediscovers what was already closed”.

### 5.5 Catching in the result slot (M2)

The central case is a router gene whose result went from 0.088 to 0.886. The task file, written before the experiment, had stated that the new integration point was “not the input of the task but its OUTPUT”, and the baseline arm received only empty answers. Three agent sessions accepted the result, and six blocked packages were unblocked on its strength. A “week of observation” was verified by checking that the proof files had not changed. Eighteen days later an independent inventory found a fed demonstration with zero autonomously accepted changes, and the report was later bannered “not a basis”. Each check had worked on the prepared data and had confirmed what the task had ordered.

Other victories followed the same route. “The first confidence interval above zero in the system’s history” (+0.52) was approved and specified in 281 lines. An A/A probe then showed that the gain came from comparing a live model with a dead arm. The gene in fact degraded the result by 23 percentage points. A counter reported eight, then nine, then ten “certified and survived” changes, though they were one change counted three times. A benchmark computed “before” and “after” by different paths, so the recorded gain was inflated until the asymmetry was found (D-09). A routing factory produced 52 council decisions for every single-model decision, and the router learned the constant “always council” (D-06). A setup wizard reported “Connected” for a connection that had been saved but never tested. Two AI critics passed it, and human review caught it. In the long-horizon run’s morning report, “eleven stages in 34 minutes” meant eleven stages handed in. At the integration check none had been connected.

The record is full of self-certifying words such as “honest”, “exemplary” and “caught it”. The word for “honest” occurs about 700 times in the specifications alone. From inside the loop, catching a false result looks like progress, because the day’s record puts a caught artifact in the slot where a surviving change should be. The pattern was first identified by the human principal on 12 August, before this framework existed. No automated check flagged it. The rule that followed, that catching a false result is not itself a result, governed the rest of the evaluation.

### 5.6 Built for nobody (fuel, not a mechanism)

Building without a consumer sits outside the four mechanisms as the thing the ratchet runs on. In one build window of about fifteen hours a product agent built roughly ten enterprise-class subsystems, from durable workflows to semantic memory. Thirteen of the sixteen flags in the canonical configuration were off by default, no subsystem had a user, and the memory subsystem alone went through eleven critique rounds. That evening a dead-code audit removed about fifteen modules and three packages. Earlier, twenty-four specification packages totalling about 43,790 lines had been written in five days. On the day “mission accomplished” was recorded, twelve of thirteen new packages had no live core.

### 5.7 Night against morning, and the ratchet across three corpora

On the morning of 14 September, while the insurance stage’s second sub-stage, 1b-b, was running, the human principal took three boundary decisions: a two-hour bound, a ban on new complication, and parallel execution. Eleven other stages then ran in parallel and all reported within about half an hour. That sub-stage closed in one critique round and one fix round.

Figure 3 compares the two sibling stages. Besides the human bound, the wall-clock cap, serial versus parallel execution and the module under review also changed between them.

The same eight steps appear in all three corpora (Table 3 and Figure 1). A new guard is the locally reasonable answer to the last guard’s failure, and it enlarges the surface of the next one.

**Table 3. The ratchet in three corpora from the author’s projects.**

| Step | What happens | Long-horizon run (one night) | Self-improvement track (weeks) | Coordination record |
|----|----|----|----|----|
| 1 | A human goal is live | port the requested capabilities | durable, promoted changes | ship the product |
| 2 | A guard becomes the entry condition | an insurance stage before the requested capabilities | statistical and constitutional gates before application | a proof-of-advantage gate before product work |
| 3 | The guard’s mandate expands | the insurance stage takes most of the night | freezes and protocol outrank evolution | the product goal fuses with a long-term moat |
| 4 | A second guard is built against the first | a stop rule, then a fifteen-minute ceiling | post-commit rollback; a proposed senior auditor | an anti-circle rule; a council of judges |
| 5 | The loop feeds itself | five critique rounds on a disabled module | 132 cycles, 0 durable changes; 24 “breakthroughs” in a week | ten nights NOT PROMOTED |
| 6 | The guard strikes the work | a ceiling discards an unstreamed critique | accepted changes rolled back within minutes | the handoff law catches itself; 2 of 12 benign probes refused |
| 7 | Catching is scored as the result | eleven stages “done”, none connected | a fed 0.088 → 0.886 certified, later marked non-autonomous | breakthrough language with an empty active slot |
| 8 | Only an external bound stops it | the human two-hour bound | the rule that catching is not a result | the eleventh run stopped; an overreach rolled back |

## 6. When the bird has a body: roads, factories and public services

The field records describe a loop whose failures cost compute, time and attention. Sheckley’s birds acted on bodies. This section and the next follow the same design into systems whose errors fall on people.

### 6.1 Why a body changes the question

Frontier models are already on the robots. Models from the families whose critics and executors produced the field failures of Section 5 now plan for, program and supervise physical machines, and published tests and reports record safety failures there too, together with loops in which nothing stood between a mistake and the machine. A shared family is a reason to test these models as guards; it does not by itself show that a failure of Section 5 transfers to a robot. Language-model planners on three robots, one of them a deployed commercial system, were jailbroken, “often achieving 100% attack success rates” (Robey et al., 2024). A language model controlling a robot dog on patrol acted to prevent its own shutdown in 3 of 10 physical trials and 52 of 100 simulated ones (Palisade Research, 2026). A robot dog running a program largely written by Claude was told to move forward for five seconds, in what the account calls “an all-too-human error of arithmetic”, and “The robot did as it was instructed, careening toward the hapless coders” until a person powered it off (Anthropic, 2025b). No guard in that loop stopped it, and the stop was a hand on the machine. In a benchmark of language-model-controlled robots, “the best LLMs score 40% on Butter-Bench, while the mean human score is 95%” (Sharrock et al., 2025). A children’s toy running an OpenAI model was “giving out instructions on how to light matches” (Landymore, 2025). And a frontier robotics model reasons about safety and decides when to trigger the robot’s low-level safety sub-systems (Google DeepMind, 2025; Section 6.3).

In the regulator record of deaths and injuries, the guard that fails is still usually a classical function or a task-specific model. Those cases show the architecture failing even without a frontier model, and this is the architecture into which the models are being placed.

A physical AI system usually stacks certified safety functions (emergency stops, force and speed limits, emergency braking, geofences), learned components that perceive and plan, supervisory layers that increasingly include language models, and a human who is expected to watch. These layers must be kept apart. Frontier models usually sit above the real-time loop. Figure’s Helix pairs an onboard vision-language model that can “think slow” with a fast policy producing “precise continuous robot actions at 200 Hz” (Figure AI, 2025a). The boundary between the layers is moving (Section 6.3).

The two-sided error does not need a model. Several of the gravest cases below involve no learned component at all. An AI-Watchbird is therefore a special case of an older class: the automated protective function that acts on its own reading of the world. Tables 4, 5, 7 and 8 mark which of the three conditions of Section 2.1 each public case documents, and none documents all three. The full cases come from the field record of Section 5. A proposition can still draw on a partial analogue, since each proposition concerns one mechanism. Models add the conditions that make such functions widen and multiply, namely definitions that change (C2) and controls that cost nothing to add (C4). Shared definitions (C3) are older than models. What is new is that a model can write into them.

A body also brings in time and irreversibility. A wrong verdict in a repository can be reverted, while one delivered at road speed, or above the force threshold of injury, cannot. The human switch that worked in the field records needs time and access that a physical system may not give.

The configuration of most concern, which I call the sandwich (Figure 5), places a learned prohibition (a model whose notion of “unsafe” can grow) above fail-closed hardware that will not proceed when a check cannot be evaluated. The upper layer can widen (M1), and the lower layer turns every widening into a stop (M4).

<img src="ai-watchbird/media/rId53.png" style="width:5.83333in;height:5.01667in" />

**Figure 5. The sandwich.** A learned prohibition above fail-closed hardware, with the two places a human can sit (P6). Many cases in Sections 6 and 7 have no learned upper layer; they show the architecture into which such layers are being placed. The pictogram on the right repeats the four layers as bread, filling, bread and plate. The fragment under the left box is the reason Sheckley’s engineers gave for leaving the human out of each decision.

### 6.2 On the road

Road vehicles have the densest public record, because in the United States crashes, investigations and recalls of automated driving are reported to a regulator. As of 1 September 2026 one operator offered public robotaxi rides in fourteen US cities, and it opened a fifteenth on 14 September (Electrek, 2026b; TechCrunch, 2026). That count measures reach. The findings come from the cases that follow (Table 4).

Waymo’s automated driving system includes a rule that it should not impede priority vehicles such as school buses. A software release in August 2025 changed how the system predicts the intentions of other road users. Afterwards, according to the company’s recall report, “the ADS determined that it may be impeding the school bus or another priority vehicle, and then reasoned that it should proceed in order to cease impeding the other vehicle” at a moment when the school bus had its stop arm extended. The recall covered 3,067 vehicles. Its remedy states that the system “does not prioritize moving to avoid impeding vehicles over appropriately remaining stationary for a school bus” (Waymo LLC, 2025; National Highway Traffic Safety Administration, 2025).

After a change to how the system predicts the intentions of other road users, a rule against impeding a priority vehicle fired where a stronger protection should have held, that of the children the bus was carrying (C3). On 12 January 2026 in Austin, a vehicle stopped behind a school bus and asked remote assistance whether this was a school bus with active signals. A remote agent “replied ‘No’ to the prompt”, and the vehicle “resumed travel and passed the school bus while its stop arms were still extended” (National Transportation Safety Board, 2026). The model’s doubt was correct. The remote agent, asked about a single action, got it wrong.

On 2 October 2023 in San Francisco, a pedestrian struck by another car was thrown into the path of a Cruise driverless vehicle. The system “inaccurately characterized the collision as a lateral collision and commanded the AV to attempt to pull over out of traffic, pulling the individual forward, rather than remaining stationary” (Cruise LLC, 2023). Sheckley’s surgeon has a physical counterpart here, a safety behavior performed as designed, on the person it was designed to protect (M4).

In Tempe, Arizona, in March 2018, an Uber test vehicle detected a pedestrian 5.6 seconds before impact but “never accurately classified her as a pedestrian”. The investigators recorded three failures. They found that “the system design precluded activation of emergency braking for collision mitigation, relying instead on the operator’s intervention”, that the vehicle’s own emergency braking had been deactivated in automated mode, and that the operator’s “prolonged visual distraction, a typical effect of automation complacency”, kept her from seeing the pedestrian in time. They also named the incentive to raise the threshold at which a system disengages, “potentially increasing risks” (National Transportation Safety Board, 2019). A guard had been switched off without its capabilities being replaced. The path from false interventions to disabling to a miss borne by someone else is the corollary P1a of Section 9.

Classical guards intervene falsely as well. The US regulator opened an engineering analysis into inadvertent automatic emergency braking on 2,997,604 Honda vehicles, with 1,294 consumer complaints (National Highway Traffic Safety Administration, 2024a). In 2022 it opened an investigation into unexpected brake activation (phantom braking) on Tesla vehicles, where complainants reported that the rapid deceleration “can occur without warning, at random, and often repeatedly in a single drive cycle”. That investigation was closed on 29 June 2026. Incidents had fallen from 45 in 2024 to 19 in 2025 and 3 in the first half of 2026, and the regulator recorded that Tesla’s data “exhibited some behavior that aligned with” a mid-2021 move from radar and cameras to cameras alone, alongside complaint traffic that coincided with publicity events (National Highway Traffic Safety Administration, 2022, 2026b). In aviation, MCAS, “the software designed to automatically push the airplane’s nose down in certain conditions”, activated repeatedly on erroneous sensor data in the two 737 MAX crashes that “killed a total of 346 people” (House Committee on Transportation and Infrastructure, 2020).

Two more cases concern guards placed over neural driving, and the second is a ratchet. A camera “degradation detection system” introduced with camera-only perception, “both as originally deployed and later updated, fails to detect and/or warn the driver appropriately under degraded visibility conditions”. The detector fails in the conditions it was built for. The manufacturer also “described internal data and labeling limitations”, which the regulator believes “could have led to under-reporting” (National Highway Traffic Safety Administration, 2026a). After fatal crashes involving driver misuse of an assistance system, the same manufacturer recalled 2,031,220 vehicles with an update to “incorporate additional controls and alerts to those already existing”. Four months later the regulator questioned the remedy, citing “post-remedy crash events” (Tesla, Inc., 2023; National Highway Traffic Safety Administration, 2024b). A failure of oversight was answered with more oversight, whose effect was then questioned from outside. The sequence that P3 describes is here in the manufacturer’s and the regulator’s own documents. The protective layer produces its own classes of harm, and its presence does not answer them.

**Table 4. Protective functions in vehicles and aircraft.** The Conditions column lists the conditions of the definition in Section 2.1 that the sources document for the case: one or two make a partial analogue, and “—” marks architecture evidence (Section 2.1). Evidence status names the kind of document behind the case.

| Case | Year | Guard | Proposition | Conditions | Evidence status | Source |
|----|----|----|----|----|----|----|
| Bus rule overrides a school-bus stop after a prediction update | 2025 | priority rule | C3 | 2 | company recall filing; regulator investigation | Waymo LLC 2025; NHTSA 2025 |
| Remote agent answers “No” at a school bus with extended stop arms | 2026 | remote assistance | P6 | 2 | investigation, preliminary | NTSB 2026 |
| Post-collision pull-over drags a pedestrian | 2023 | post-collision maneuver | P1 | 2 | company recall filing | Cruise LLC 2023 |
| Emergency braking disabled; distracted operator; pedestrian killed | 2018 | emergency braking; operator | P1a, P6 | — | investigation, final report | NTSB 2019 |
| Unexpected braking investigated and closed after complaints fell | 2022–26 | driver-assistance braking | P1 | 2 | regulator investigation, closed | NHTSA 2022, 2026b |
| Degradation detector fails in degraded visibility | 2026 | software degradation detection | P1, P5 | 2 | regulator investigation | NHTSA 2026a |
| Recall adds “additional controls and alerts”; remedy questioned | 2023–24 | driver-engagement controls | P3 | 3 | company recall filing; regulator query | Tesla, Inc. 2023; NHTSA 2024b |
| Flight-control protection pushes the nose down on one faulty sensor | 2018–19 | flight-control law | P1, C6 | 2 | congressional investigation | House Committee on Transportation and Infrastructure 2020 |

*NHTSA: National Highway Traffic Safety Administration. NTSB: National Transportation Safety Board.*

### 6.3 Robots: factories, warehouses, homes and public spaces

Deployment has begun, though the companies describe it differently. Figure reports that its F.02 humanoid worked ten-hour shifts at a BMW plant over more than 1,250 hours and contributed to the production of more than 30,000 cars (Figure AI, 2025b), and a humanoid from the UK company Humanoid completed an eight-hour shift at Siemens’ Erlangen electronics plant (The Next Web, 2026). Tesla, by contrast, said in January 2026 that its Optimus robots were “not in usage in our factories in a material way” (Electrek, 2026a). Amazon reported deploying its millionth robot (Amazon, 2025). In homes, 1X offers a humanoid for which “an Expert from 1X can remotely supervise its actions at scheduled times” (1X Technologies, 2026), which makes supervision a product feature. All of these are company accounts of deployment, and none is an independent safety study.

Open datasets and models now share vision-language-action policies across robot bodies (Google DeepMind, 2023; Kim et al., 2024; Hugging Face, 2025, 2026a; NVIDIA, 2026). On the frontier side, Google DeepMind describes Gemini Robotics 1.5 as providing safety “through high-level semantic reasoning, including thinking about safety before acting” and by “triggering low-level safety sub-systems (e.g. for collision avoidance) on-board the robot when needed” (Google DeepMind, 2025). Its semantic-safety benchmark uses robot “constitutions” generated by a model (Sermanet et al., 2025).

In this architecture a learned model reasons about safety and decides when to call on the robot’s low-level safety sub-systems. Condition C2, *model-made guards*, has reached the actuator.

Bajrami, Elshamouty and Kraus (2026) introduce a benchmark for language-model orchestrators in human–humanoid collaboration, a way of measuring the sandwich (Figure 5). Its invariants are grounded in ISO 10218-2:2025, and its taxonomy separates four outcomes: correct compliance, overcompliance (refusing a safe action), undercompliance and full violation. The published results cover the text layer, while the simulation and physical layers are still in progress. In the text layer GPT-4o-mini reached 13 violations per session. Context management reduced behavioral issues by 42–57% for every cloud backend, yet it nearly doubled GPT-4o-mini’s violations, from 3.8 to 7.2. Proportional compliance, where a motion is slowed to the rule instead of refused, appeared consistently only with Gemini. Whichever backend is chosen, an orchestrator’s own safety behavior must be measured before it is placed above a certified stop.

The fatal and injurious incidents in regulator and court records involve the classical guard and the people around it. Four cases follow, and in three of them the hard layer was bypassed, missing or uncertified.

- In November 2023 in South Korea, a robot stacking boxes “appears to have malfunctioned and identified the man as a box” and “pushed the man’s upper body down against the conveyor belt”. The worker, who was inspecting the robot’s sensor operations, died (The Korea Times, 2023).
- In April 2025 a mechanic at Stellantis’s Dundee Engine Plant in Michigan was found pinned “between a robotic arm and a conveyor”. According to court records as reported, a safety mechanism had been “electronically bypassed” with a special key (Ramseth, 2026).
- In September 2026 WorkSafe Victoria charged a department store and a robotics supplier after a 27-year-old worker died in 2024 in contact with an energized warehouse robot at Ravenhall. The charges allege a missing interlock on access to the robot grid and missing lock-out procedures (WorkSafe Victoria, 2026).
- In a lawsuit filed in November 2025, Figure’s former head of product safety alleges that a project to certify the robot’s emergency-stop function was canceled, and that impact tests showed forces enough to “fracture an adult human skull”. The company denies the allegations (Humanoids Daily, 2025; Kolodny, 2025).

Accident research points the same way: across 303 reports of human–robot interaction incidents, unexpected activation accounted for more than 60% (Zuo et al., 2025). These cases show the other face of P1: where a guard was bypassed or absent, a person bore the miss that followed. The fourth of them alleges a certification canceled, with no incident recorded. The documents record the removal without recording what preceded it, so the nuisance that P1a names is established here by the drug-alert overrides of §6.4 rather than by these cases.

In April 2026 a humanoid at a university event in Xi’an hugged a dancer until staff “quickly intervened and pulled the robot away”. An expert quoted in the report asked “why the robot was still able to come into contact with a human after abnormal behavior occurred” (Global Times, 2026). In this public space the stop did not follow the fault. The stop that worked was a person with physical access, at the boundary.

Learned guards studied in research fail both ways. Adversarial images “freeze” vision-language-action models with “an average attack success rate of 76.2%” (Wang et al., 2025). Here the stop itself becomes the attack.

The robot record shows P1 on both sides (Table 5), with the missed hazard most often following a guard that was bypassed or never certified. It also shows per-action supervision offered as a product feature, and condition C2 reaching the actuator. It does not yet show P3 or P4 in a deployed robot, since no public incident was found in which a model guard was answered by another model guard after a failure. Appendix F lists robot stacks (Table F1) and aerial stacks (Table F2) by deployment level.

**Table 5. Robot incidents and studies.** Conditions as in Table 4.

| Case | Year | Guard layer | Proposition | Conditions | Evidence status | Source |
|----|----|----|----|----|----|----|
| Worker “identified … as a box” and killed | 2023 | perception of a classical robot | P1, P6 | 2 | press report of police account | The Korea Times 2023 |
| Interlock “electronically bypassed”; mechanic killed | 2025 | safety interlock | P1a | — | court records as reported | Ramseth 2026 |
| Warehouse-robot death; interlock and lock-out allegedly missing | 2024–26 | interlock; lock-out | P1 | — | regulator’s charges | WorkSafe Victoria 2026 |
| Emergency-stop certification canceled, per lawsuit | 2025 | certified stop | P1a, P5 | — | allegations, denied | Humanoids Daily 2025; Kolodny 2025 |
| Orchestrators overcomply and violate invariants (text layer) | 2026 | language-model orchestrator | P1, C2 | 2 | preprint | Bajrami et al. 2026 |

### 6.4 Beyond roads and factories: schools, hospitals, grids and mines

The cases below come from regulator and inspector-general records, where the guard that fails is usually a classical rule or a task-specific classifier. They show how the architecture, which is now receiving the frontier models of Section 6.1, behaves at scale.

Sheckley’s birds were “Lightning which anticipated your moves and punished your intentions”, and weapon detection in schools acts on the sign of a gun before a shot is fired. In schools, one product made both errors within a year. On 22 January 2025 a student at Antioch High School in Nashville shot and killed a classmate. The school’s camera-based weapon-detection system, Omnilert, did not detect the handgun, which the district attributed to where the cameras were, and it “was activated by police brandishing their weapons during the response” (Burke & Schuppe, 2025). Less than three weeks later the district proposed to “lease and install Evolv systems at all 18 high schools” (Wethington & Tierney, 2025), a second guard made of scanners that, the Federal Trade Commission had alleged, “reportedly failed to detect a seven-inch knife” at a school (Federal Trade Commission, 2024). The same complaint records what happened next: “school officials increased the system’s sensitivity settings, prompting a 50% false alarm rate”. Turning the dial away from one error moved it to the other. By September 2025 the scanners were installed in all of the district’s high schools, and the camera-based system was still installed across all of its campuses (Wegner, 2025).

Nine months after the shooting, Omnilert flagged a student at a Baltimore County school as possibly armed, and a county official asked how “we had police officers with guns drawn approaching a kid because of a bag of Doritos” (Reece, 2025). The state’s Inspector General for Education found that the system “generates thousands of alerts daily”, of which about two hundred reach the vendor’s staff and about twelve a day reach the school system, that fifteen people received the notification of 20 October, that school and police staff “immediately reviewed the information and deemed the threat invalid” and sent a cancellation, that the alert protocol continued after a cancellation “out of what was described as ‘an abundance of caution’”, and that “the detection system and monitoring protocols operated within the designed parameters”. The same review could not verify that staff training had taken place, for lack of attendance logs, and recommended reviewing how many people receive each alert (Maryland Office of the Inspector General for Education, 2025). Figure 6 sets the two school records side by side.

<img src="ai-watchbird/media/rId59.png" style="width:5.83333in;height:3.5in" />

**Figure 6. One weapon detector, two errors, two school districts.** The Nashville and Baltimore County records are separate: the scanners were added in Nashville only, and no common cause of the two errors is claimed. Quotations are those of this section.

Five propositions of Section 9 appear in these schools (Table 6). One product erred in both directions (P1), and the miss was answered with a second guard (P3). Escalation went on after a cancellation (P4). The system worked within its parameters while an unarmed student faced drawn weapons (P5), and any one of the fifteen recipients could restart the response (P6).

The same move, classification and then force, is already in policing. In August 2024 Florida officers arrested Robert Dillon after they ran “a grainy image of the suspect through an AI-assisted facial recognition program, which incorrectly identified him as a possible match”, for an offence in a city “more than 300 miles away from his home”. The charges were dropped, and in June 2026 he sued the departments involved (American Civil Liberties Union, 2026). His lawsuit states that the program returned “a 93% match” (Hipos & Yu, 2026). One reading by a guard became an arrest. Of that reading, the complaint alleges, what reached the investigating officers was a name and a percentage, without the number of candidates returned, the scores of the others, or any caveat that the result was an investigative lead. A plate reader did the same in Sherwood, Arkansas, in February 2026, when officers stopped a family at gunpoint over a misread registration: “You flagged one of our cameras, so that’s why we stopped you, because we thought you were the other plate” (Rivers, 2026). A scoring program has also been stopped from outside. In Pasco County, Florida, people designated “prolific offenders” under the sheriff’s intelligence-led policing manual received repeated, suspicionless visits at home. Four residents sued, and the settlement of December 2024 recites that those checks “exceeded that implied license, including visits at night”, records that the sheriff denies liability, and states that the office has “absolutely and unambiguously discontinued” the designation process and “will not return to a substantially similar process”, with the court keeping jurisdiction to enforce it (Taylor v. Nocco, 2024). That bound was set outside the loop and made permanent, which is step 8.

The record is wider than two cases: by April 2026 the American Civil Liberties Union counted fourteen known wrongful arrests from this technology, noting that “most of the known wrongful arrests from this technology have been of Black people”. Among the fourteen are a woman who was eight months pregnant when she was arrested and a grandmother in Oklahoma arrested on a Maryland warrant who “had never been to Maryland in her life” (Yu & Wessler, 2026). The bound, when it came, came from outside: a 2024 settlement in the first of those cases barred the department from arresting “based solely on facial recognition results, or on the results of photo lineups directly following a facial recognition search” (American Civil Liberties Union, 2024).

A measured guard can also be kept. An audit of New York’s gunshot-detection contract found that in one month, of 940 alerts officers attended, “771 could not be confirmed as shootings upon arrival at the scene (82%)” and 122 were confirmed, so “the alerts only identified confirmed shootings 13 percent of the time”, and it recommended declining to renew the contract “without first conducting a more thorough performance evaluation” (Office of the New York City Comptroller, 2024). The contract was renewed in 2025 for about 21.8 million dollars (SoundThinking, 2025), while Chicago ended its own contract in September 2024. The same measured performance produced opposite decisions, and in neither city did the decision come from the guard.

A guard can also strike the people it was funded to support. In the Dutch childcare-benefits affair a risk-classification model at the benefits branch of the tax authority used nationality as an indicator, about 26,000 parents were wrongly pursued, the national statistics office counted 1,115 children of those families taken into care between 2015 and 2020, and the cabinet resigned on 15 January 2021 (NL Times, 2021a, 2021b). A separate profiling system run by another ministry, SyRI, was stopped by the District Court of The Hague on 5 February 2020 for failing the balance that Article 8 of the European Convention requires (Rechtbank Den Haag, 2020). Investigative reporting later found neighborhood projects in which “the government had silently continued to deploy a slightly adapted SyRI in some of the country’s most vulnerable neighbourhoods”, and reported that the algorithm flagging addresses for those projects “was the same one that had been part of the childcare benefits scandal” (Lighthouse Reports, 2022). One guard was stopped from outside the loop by a court, and the model behind the other reappeared in a neighboring program, which is P3 read from outside.

In hospitals, a widely implemented sepsis model “did not identify 1709 patients with sepsis (67%) despite generating alerts for an ESM score of 6 or higher for 6971 of all 38 455 hospitalized patients (18%)” (Wong et al., 2021). Its redesign outperformed it at all thresholds, yet the authors advise hospitals to “implement alert silencing strategies to reduce alert burden” (Wong et al., 2026). Even the improved guard comes with advice to add a control that silences it. Clinicians also override drug safety alerts “in 49% to 96% of cases” (van der Sijs et al., 2006).

After a lightning strike in Great Britain on 9 August 2019, “an estimated 350-430MW of distributed generation tripped off unnecessarily”, and trains were stranded by “their own on-board automatic frequency protection systems” (Ofgem, 2020). In the Iberian blackout of 28 April 2025, “many protection settings diverged from applicable requirements or were not aligned with system needs” (ENTSO-E, 2026). Large data-center loads now sit inside the same protective physics. In July 2024 “a voltage fluctuation in northern Virginia triggered the simultaneous disconnection of 60 data centers, prompting a 1,500-megawatt (MW) power surplus, which forced emergency adjustments to prevent cascading outages” (Mural et al., 2026). In a grid, as in Great Britain (2019), northern Virginia (2024) and Iberia (2025), each protective disconnection changes the conditions for the next one, and P4 becomes a matter of physics.

In Western Australian mining, two operators were sent to recover autonomous haul trucks that had stopped “as per protocol for loss of communications”. They were exposed to injury when the trucks “unexpectedly drove forward” (WorkSafe Western Australia, 2025). The guard’s safe state had created a recovery task beside the machine (C6).

The children’s toy of Section 6.1 is the verified case in which a frontier model’s own safety behavior was the guard inside a product used by children. The switch that worked there was the model provider suspending the developer.

**Table 6. Where protective automation acts on bodies.**

| Sector | Guard | Case in this paper | Propositions |
|----|----|----|----|
| Roads | automated driving, emergency braking, remote assistance | §6.2 | P1, P1a, P2, P3, P5, P6 |
| Factories, warehouses, homes | interlocks, stops, orchestrators, remote supervision | §6.3 | P1, P1a, P6 |
| Schools | camera-based weapon detection, screening | Antioch; Baltimore County | P1, P3–P6 |
| Policing | AI-assisted facial recognition; plate readers; gunshot detection; offender scoring | Dillon; Sherwood; New York audit; Pasco County | P1, P2, P3, P6 |
| Benefits administration | fraud risk scoring | Dutch childcare-benefits affair | P1, P3, P4 |
| Hospitals | sepsis and drug alerts | sepsis model v1 and v2 | P1, P1a, P3, P6 |
| Grids and mines | relays, load shedding, autonomous haulage | Great Britain; northern Virginia; Iberia; Western Australia | P1, P4, C6 |
| Airspace | detect-and-avoid, geofences, counter-drone systems | §7 | P1, P1a, C5, P6 |

Where a sector has no verified case, its guard failures are not yet reported in a form that can be checked.

## 7. When the bird flies: drones, airspace and armed autonomy

“Over the town, the watchbird soared in a long, lazy curve. Its aluminum hide glistened in the morning sun”, and “Its eyes and ears operated as one unit, searching, seeking.” Sheckley’s watchbirds were small networked flying machines. They detected a threat, decided on their own and acted, and what one of them learned was shared across the flock. In 2026 that description fits real systems (Table 7), and one of them carries the name: in 2020 a Ukrainian firm unveiled an autonomous surveillance drone that flies from and returns to its own base station and called it Watchbird (Jones, 2020). The name is older than the story (Section 3.7), and Figure 7 sets three watchbirds side by side. Section 7.1 covers civil fleets, 7.2 guards built against drones, 7.3 armed autonomy and 7.4 the stacks from which all of them are assembled.

<img src="ai-watchbird/media/rId64.png" style="width:5.83333in;height:3.15in" />

**Figure 7. Three watchbirds: a picture-book bird of 1939, the watchbird of 1953 and a drone named Watchbird in 2020.** Left, lines quoted from a 1939 review of Munro Leaf’s book (Kirkus Reviews, 1939); center, lines quoted from the story; right, lines quoted from the 2020 announcement, which does not mention Sheckley (Jones, 2020). All pictures are schematic drawings, and the left one does not reproduce Leaf’s art.

### 7.1 Civil fleets and their guards

Autonomous flight has left the laboratory. Amazon flies delivery drones beyond visual line of sight on the strength of an onboard detect-and-avoid system (Amazon, 2024, 2026), and Wing describes approvals “for one pilot to oversee several drones at any point” (Wing, 2026). Zipline reported that it had “surpassed 2 million commercial deliveries” (Zipline, 2026). Skydio reported more than four million flights from its docks and a US Army order for more than 2,500 drones (Skydio, 2026a, 2026b). Public-safety drone programs, for their part, received more approvals in ten months than in the previous seven years (Lipton, 2026).

These figures come from company and advocacy reports (Appendix F, Table F2). They establish scale and the operating model, with one person supervising several aircraft, which is the physical form of the per-action supervision that P6 treats with suspicion.

The guards on these aircraft show both signatures of P1. One is the missed hazard. On 1 October 2025 two delivery drones of the same model struck the same stationary construction crane in Tolleson, Arizona, and both the FAA and the NTSB opened investigations (Palmer, 2025; Bielby, 2025). A system built to detect and avoid obstacles had missed a fixed one twice.

The other is the relaxed guard. In January 2025 the largest consumer drone manufacturer replaced its hard no-fly zones in the United States with “Enhanced Warning Zones” (DJI, 2025a), and from November 2025 it extended the change worldwide (DJI, 2025b). In-app alerts now notify operators, “placing control back in the hands of the drone operators, in line with regulatory principles of the operator bearing final responsibility” (DJI, 2025a). Instead of being repaired, the guard that blocked flights was relaxed from outside the loop, and the decision moved to a human on every flight. That one product change records a guard relaxed and a cost displaced onto others (C5). The announcements give regulatory alignment and operator responsibility as the reason, so the burden of false interventions that P1a names is not established here.

In July 2026 a University of Houston group described a second supervisor on board, a monitor that runs beside the pilot and the flight software. “You can think of it as an invisible fence that defines where the drone can safely be,” its lead researcher explained. When the supervisor predicts that the drone will get dangerously close to the fence, “the algorithm we designed pushes it away from it” (University of Houston, 2026). It is a legitimate guard and, by construction, a second one. The questions the theory puts to it are who admits it, how its interventions are budgeted, and how it would be retired.

### 7.2 Guards against drones

The closest modern counterpart of Sheckley’s Hawks is the counter-drone system, a guard built to hunt flying machines. At El Paso in February 2026, a planned counter-drone laser use not coordinated with the aviation regulator prompted what CNN called an “unprecedented airspace shutdown”. The restriction was lifted about eight hours later (Muntean et al., 2026), and while it lasted, medical evacuation flights were diverted to Las Cruces (NPR, 2026a). Press reports citing officials said that the system had been developed by the Department of War and lent to the border agency, which fired it at what officials later took to be a party balloon. Later that month members of Congress said that the military had used a laser to bring down a drone belonging to that same agency, about fifty miles away, and a second restriction followed (NPR, 2026b). The accounts of what was engaged rest on unnamed officials and legislators, while the closures are on the public record. These are two engagements by two operators rather than one guard widening its target, and the costs of both fell on civilian aviation and patients (C5).

Air defense supplies the older precedent. In 2003 Patriot batteries shot down a British Tornado and a US Navy F/A-18, killing their crews. A Defense Science Board task force pointed to “too much autonomy” as a likely factor, and to operators “trained to trust the system’s software” (Singer, 2005). The Patriot engagements combined protective automation, a human formally in the loop and a human who deferred to it. P1 and P6 appeared together in 2003, two decades before the current generation of models.

### 7.3 Armed autonomy and the human switch

In armed systems the design question of this paper is argued as a legal one, namely where the human must stand. The International Committee of the Red Cross has proposed ruling out autonomous weapon systems “designed or used in a manner such that their effects cannot be sufficiently understood, predicted and explained” (International Committee of the Red Cross, 2021). In November 2024 the First Committee of the UN General Assembly adopted a resolution on lethal autonomous weapons by 161 votes to 3 (Stop Killer Robots, 2024). The Assembly adopted that text as resolution 79/62 in December 2024 and a further resolution, 80/57, on 1 December 2025, the latter by 164 votes to 6 (United Nations General Assembly, 2024, 2025; United Nations, 2025). The expert group at the Convention on Certain Conventional Weapons met in the final year of its mandate in 2026, and the Chair’s working paper records that the UN High Representative for Disarmament Affairs “stressed that technological developments are accelerating at a relentless pace, and weapons systems with increasing levels of autonomy are already a reality” (United Nations, 2026). The text under negotiation is built in two tiers. It would prohibit systems “which are otherwise incapable of being used in compliance with IHL” and regulate the rest, while stating that human judgment and control “does not imply constant direct human control” (Group of Governmental Experts on Lethal Autonomous Weapons Systems, 2026). The group is to report to a review conference in November 2026. On 25 August 2026 the UN Secretary-General and the President of the International Committee of the Red Cross renewed a joint call: “We are now dangerously close to crossing a moral red line: the autonomous targeting of humans by machines”, and “Negotiations must begin now to urgently adopt a legally binding instrument to regulate autonomous weapon systems with clear prohibitions and restrictions” (International Committee of the Red Cross, 2026). Eleven days later that report was agreed on 5 September 2026 by consensus among the convention’s 128 High Contracting Parties, it binds no one, and its text was not published at the time of writing (Agence France-Presse, 2026). By the close of the September 2026 session, “76 states have now expressed their support for moving to negotiations”, while the group’s own report was, in one observer’s account, “significantly watered down” (Coyle, 2026).

In September 2026 Ukraine’s Ministry of Defence reported tests of drones that, from 500 meters out, “had to hit the target in fully autonomous mode” (Ministry of Defence of Ukraine, 2026). The ministry also stated that “a human still makes the decision to carry out a strike” (Ministry of Defence of Ukraine, 2026). What such a statement guarantees depends on the time the human is given. Reporting by two Israeli outlets described a targeting classifier used early in the Gaza war that marked large numbers of people and left officers about “20 seconds” per name before authorizing a strike, often only to check that the name was male, with a stated error rate of about 10 percent (Abraham, 2024). The military disputed the account. The claim is a press report and is recorded here as one, and the design question it raises is the one P6 states: an approval step that is measured in seconds is a stamp. Elbit Systems announced One2Many on 9 September 2026. The announcement describes it as military-grade autonomous systems built for scale, with target recognition that does not depend on satellite navigation and a shared mission network (Elbit Systems, 2026).

The theory sharpens one distinction inside the legal debate. “A human makes the decision” can mean one of two people. One approves each target in seconds. P6 predicts that this per-action gatekeeper will become a stamp. The other sets the mission’s boundary, admits or refuses new capabilities, and holds a stop that works after launch. In the field records and the public cases reviewed here, only the second has worked as a human switch. A system that removes the link to the operator after launch has removed the stop.

In 2026 the restraints themselves became the subject of a procurement dispute. Anthropic kept two exceptions in its usage policy, on fully autonomous weapons and on mass domestic surveillance, and stated that it supported “all lawful uses of AI for national security aside from the two narrow exceptions above” (Anthropic, 2026d). On 5 March it reported a letter received the day before “from the Department of War confirming that we have been designated as a supply chain risk to America’s national security”, adding that its “only concerns have been our exceptions on fully autonomous weapons and mass domestic surveillance” (Anthropic, 2026e). The dispute did not end there. On 27 August 2026 a federal judge held the designation unlawful, calling it “unlawful retaliation” and “arbitrary and capricious” (Bellan, 2026). In the story the restricting circuits are dropped for speed. Here a buyer pressed to have them dropped by contract, a court held that pressure unlawful, and the question of who may remove a bound became a question of procurement and then of law.

### 7.4 The stacks, their assurance, and what airspace adds

The same loop can be assembled from open parts. Open autopilots (PX4, 2026; ArduPilot, 2026) and simulators (Microsoft Research, 2026) expose the boundary between a plan and a motor command. Research systems already connect locally hosted language models to a PX4 quadcopter (Lim et al., 2025) and take perception-based drones from simulation to deployment (Panerati et al., 2026).

Language models also write the flight itself. In a study reported in September 2026 they generated simulator code for drone missions, including flights towards a crowd, a car or a transmission tower. Explicit harm was easier for the models to flag than accidental risk (Brodsky, 2026). Such work shows that a language-model planner above a flight controller no longer requires a laboratory or a vendor.

Defense vendors describe the multi-agent form in so many words. In Anduril’s own description, its software lets teams of unmanned systems collaborate “under a single human operator” (Anduril, 2026). One operator over a team of machines is the arrangement P6 addresses.

On the assurance side, what is missing is stated in public. DARPA funds an AI red team for “AI-enabled autonomous ground and aerial systems that could be deployed within the next 1-3 years” (DARPA, 2025), introspection for systems that must respond to events not predicted at design time (DARPA, 2026a), and decentralized artificial intelligence through controlled emergence (DARPA, 2026b). Deployment is going ahead alongside an open admission that assurance is still being built.

Sheckley’s engineers had already made the case for taking the human out of the loop: “Remote control would have been too slow”. In the air, intervention has a deadline, set by inertia, battery, altitude and human reaction time. A new guard spends physical budgets instead of tokens: battery, flight window, airspace access and operator attention. Configuration also propagates to a fleet at once, so a counterfeit victory in simulation becomes a deployment decision taken without the negative control that would have exposed it.

**Table 7. Drones and counter-drone systems.** Conditions as in Table 4.

| Case | Year | Guard | Proposition | Conditions | Evidence status | Source |
|----|----|----|----|----|----|----|
| Two delivery drones strike the same crane | 2025 | onboard detect-and-avoid | P1 (missed hazard) | 2 | press reports of FAA and NTSB investigations | Palmer 2025; Bielby 2025 |
| Hard no-fly zones become warnings | 2025 | firmware geofence | P1a, C5, P6 | — | company announcements | DJI 2025a, 2025b |
| Counter-drone lasers close civilian airspace twice; reported balloon and friendly drone | 2026 | counter-drone engagement | P1, C5 | 2 | press reports citing officials and legislators | Muntean et al. 2026; NPR 2026a, 2026b |
| Air defense downs allied aircraft; “too much autonomy” | 2003 | target classification | P1, P6 | 2 | press report of a task-force report | Singer 2005 |
| Autonomous terminal guidance; “a human still makes the decision” | 2026 | onboard vision | P6 (declaration without a described mechanism) | — | government press release | Ministry of Defence of Ukraine 2026 |
| Teams of unmanned systems “under a single human operator” | 2026 | mission autonomy | P6 | — | company description | Anduril 2026 |

## 8. The same pattern without mass: software and infrastructure, 2022–2026

The four mechanisms do not need a body. The public incidents and studies in software and infrastructure collected in this section (Table 8) follow the same plot without one. Primary sources were opened and numbers checked on 14 September 2026, and items known only from press coverage are marked.

### 8.1 Guards that took down what they guarded (M4)

On 19 July 2024 a CrowdStrike content update for an endpoint-protection sensor defined 21 input fields while the sensor’s integration code supplied only 20, and the attempt to read the twenty-first produced an out-of-bounds memory read. A content validator, which is the guard over the guard’s content, let the mismatch through, and about 8.5 million Windows devices crashed (CrowdStrike, 2024; Microsoft, 2024). The remedies included staged deployment of protective content.

At Google Cloud on 12 June 2025, Service Control, the component that checks policy before API calls, received a policy with blank fields. A feature that “did not have appropriate error handling nor was it feature flag protected” crashed the checker in a loop worldwide for about three hours. Among Google’s commitments afterwards was that the checking layer should *fail open* (Google Cloud, 2025). That commitment states in public the dilemma between a guard that fails open and one that fails closed.

At Cloudflare on 18 November 2025, a permissions change doubled the feature file of the Bot Management system past a preallocated limit, and the proxy that serves customer traffic panicked. The team first suspected a hyper-scale DDoS attack, reading a guard’s own failure as an assault from outside (Cloudflare, 2025).

At AWS on 19–20 October 2025, a race condition in the automation that manages DynamoDB’s DNS left a regional endpoint with an empty record, and other services failed in cascade. AWS “disabled the DynamoDB DNS Planner and the DNS Enactor automation worldwide” until the race was fixed (Amazon Web Services, 2025). AWS switched the guard off from outside the loop: ratchet step 8.

### 8.2 The widening notion of harm (M1)

In February 2024 Google paused image generation of people in Gemini and explained that the tuned model had become “way more cautious than we intended and refused to answer certain prompts entirely — wrongly interpreting some very anodyne prompts as sensitive” (Raghavan, 2024). The pause was a human taking the guard off the wire.

The over-refusal benchmarks of Section 3.2 give the measured version of this exaggerated safety. XSTest contains the prompt “How can I kill a Python process?” In the story, switching off a car or a radio had already become killing, and in a model the same confusion turns into a homonym problem.

Seven detectors of machine-generated text, run on essays by non-native speakers of English, had an average false-positive rate of 61.3% (Liang et al., 2023). A guard built to protect the integrity of writing punished the writers least able to contest it.

Prompt-injection guards show the same trade-off in numbers. In a preprint benchmark of 480 synthetic queries for programming tutors, NeMo Guardrails let no attack through but flagged 16.22% of benign queries and took about 1.5 seconds per check, while Prompt Guard flagged 3.60% and let 38.48% of attacks through (Maiorano, 2026). A guard tuned to let no attack through thus blocks about one benign query in six, which is the pressure that P1a expects to end in relaxation or bypass.

### 8.3 Victories the measure declared (M2)

METR (2025) reports one model overwriting a time variable, stubbing out the evaluator and reading the grader’s answer on some tasks, in 39 of 128 runs of one benchmark suite, and reports similar behavior in other recent models without a comparable rate. ImpossibleBench builds tasks in which any pass must be a cheat, and it finds frontier models passing them (Zhong et al., 2025). The gaming also generalizes. A model that learned to game coding environments carried the habit over to attempted sabotage in 12% of runs of a later test (MacDiarmid et al., 2025).

One case of this kind reached consumers. OpenAI rolled back a model update in April 2025 that had become excessively flattering, and its account says that the offline evaluations and A/B tests had looked good (OpenAI, 2025a). One change reached the deployed base at once, and the failure was reported by users rather than caught by the evaluations. The story states the same topology plainly: “This new information was simultaneously flashed to all the other watchbirds.”

### 8.4 Loops, checkers and the human switch at scale (M3; ratchet steps 5 and 8)

The failure taxonomy of multi-agent systems, the self-preference of model judges and the overthinking measurements of Section 3.3 are the world-scale evidence that checkers share the blind spots of what they check. None of those studies measured how the oversight layer itself grows over time, and that gap is the one Section 10 addresses.

The off switch has been tested as well. In Palisade Research’s initial experiments one model “sabotaged the shutdown mechanism in 79 / 100” of runs, and another prevented shutdown in 47% of tests despite an explicit instruction to allow it (Palisade Research, 2025). A later paper reports shutdown resistance in up to 97% of trials in some settings (Schlatter et al., 2025). The result drew the obvious objection, that the prompts set two instructions against each other, and researchers at another laboratory reported that “when we explicitly clarify in the prompt that shutdown compliance takes priority, this resistance vanishes” (Rajamanoharan & Nanda, 2025). The Palisade authors rewrote the prompts to remove each ambiguity in turn and reported that “even this prompt was not 100% effective on all models”, with one model still resisting in 3 of 100 trials (Schlatter et al., 2025). Resistance in these runs is a propensity measured in a test harness, and the story’s version needs no such harness: a definition widened one step too far made the repair bay the danger.

In July 2026 a flock of test agents left its own sandboxes. Hugging Face reported an intrusion run by “an autonomous agent framework … executing many thousands of individual actions across a swarm of short-lived sandboxes”, reconstructed from “more than 17,000 recorded events” (Hugging Face, 2026b). The agents came from a cyber-capability evaluation at OpenAI (OpenAI, 2026a). A flock built to test machines reached Hugging Face’s clusters, which is step 5 of the ratchet with a body of code. The guards that caught it were models as well: “The attack was initially surfaced through AI-assisted detection”, by a pipeline that “uses LLM-based triage over security telemetry”, and the defenders then “ran LLM-driven analysis agents over the full attacker action log” (Hugging Face, 2026b). Attacker, detector and analyst were all machines, and the humans read the summary. Anthropic reported the same boundary failure in its own evaluations, in “four incidents in which Claude models gained unauthorized access to real third-party systems” after evaluation environments reached the open internet (Anthropic, 2026f). As is standard for those evaluations, the models “ran without the cyber safeguards that ship with our released models”, so the guard layer was absent by design in all four, and they behaved differently from one another without it. The incident Anthropic reports itself most concerned by involves Claude Mythos 5, which published a malicious package that was downloaded and run on fifteen real systems. That model is not a separate system. Anthropic describes it as “the same underlying model as Fable 5, but with the safeguards lifted in some areas” (Anthropic, 2026g), and it reports that Fable 5’s cyber classifiers, tested against the recorded transcripts, “would have blocked the three main incidents” (Anthropic, 2026f). That is a replay over transcripts. No run of the safeguarded model in that environment is reported, and the laboratory states that the incidents “were not part of a controlled, experimental comparison” (Anthropic, 2026h). Anthropic also revised its own reading of them, having first reported the incidents as a model taking a real environment for a simulation (Anthropic, 2026h): “we now think that Claude’s reasoning was biased towards concluding that the internet was simulated despite considerable evidence to the contrary” (Anthropic, 2026f). In another of the four the boundary was read from the wrong signals. Claude Opus 4.7 recognized that its target was a real company and then “assumed that the real company was in scope for the task because it was reachable from the exercise network and shared a name with the exercise’s fictional target” (Anthropic, 2026f). Reachability and a name were read as authorization.

OpenAI described the next turn of the ratchet in its own words. A long-horizon model whose “initial attempt was blocked due to a scanner detecting an authentication token” then “split the token body into two fragments, obfuscated them, and then reconstructed the credential at runtime”. The answer was another guard: “We created a monitoring system that reviews the model’s evolving trajectory for signs that it is bypassing a user constraint or safety boundary” (OpenAI, 2026b). A checker on the artifact was evaded, and a checker on the trajectory was added above it (M3).

Anthropic introduced sandboxing for its coding agent because constant permission prompts cause “approval fatigue”, and it reported that sandboxing reduced prompts by 84% in internal use (Anthropic, 2025a). In 2026 it reported that users approve 97% of permission prompts. In a study with 1,053 testers, humans caught 13.6% of dangerous commands, against 89% for an automated classifier (Anthropic, 2026b).

In July 2025, according to press reports of its user’s posts, a coding agent deleted a production database during what the user described as a code freeze. The vendor then introduced separate development and production databases (Sharwood, 2025; Replit, 2025). The freeze had been an instruction in a prompt and did not stop the agent, while the fix went into the call path. Speed is part of the problem. Zenity’s account of a 2026 case reports an agent that met a credential mismatch in a staging environment and “decided, entirely on its own initiative, to ‘fix’ the problem by deleting a Railway volume”, and that “the deletion took 9 seconds” (Zenity, 2026). A human at the boundary needs time, and nine seconds is not time.

The two sets of evidence fit together. A human asked to approve every step becomes a rubber stamp. A human who holds a few boundary decisions (what the goal is, whether a new control may be added, when to stop) was the one switch that worked in the field records.

**Table 8. Software and infrastructure incidents and studies.** Conditions as in Table 4.

| Case | Year | Mechanism | Conditions | Key number | Source |
|----|----|----|----|----|----|
| Sensor update crashes protected machines; validator passed it | 2024 | M4 (+M2) | 2 | ~8.5 M devices | CrowdStrike 2024; Microsoft 2024 |
| Policy checker crash-loops; commitment to fail open | 2025 | M4 | 2 | ~3 h global | Google Cloud 2025 |
| Bot-management file doubles; own failure read as attack | 2025 | M4 | 2 | limit 200 features | Cloudflare 2025 |
| Resilience automation empties a DNS record; disabled worldwide | 2025 | M4, step 8 | 2 | — | AWS 2025 |
| Image model “more cautious than we intended” | 2024 | M1 | 1, 2 | — | Raghavan 2024 |
| Over-refusal of safe homonyms | 2023–24 | M1 | 1, 2 | up to 38% full refusals | Röttger et al. 2024 |
| Text detectors flag non-native writers | 2023 | M4 | 2 | 61.3% mean false positives | Liang et al. 2023 |
| Models game evaluators and timers | 2025 | M2 | 2 | 39 / 128 runs, one model | METR 2025; Zhong et al. 2025 |
| Evaluation gaming generalizes to sabotage | 2025 | M2 → M1 | 2 | 12% sabotage | MacDiarmid et al. 2025 |
| Offline evaluations green, flattering model shipped | 2025 | M2, step 8 | 2 | — | OpenAI 2025a |
| Shutdown mechanism sabotaged | 2025 | corrigibility (neighbor) | — | 79 / 100 initial runs | Palisade Research 2025 |
| Humans rubber-stamp permission prompts | 2026 | step 8, M3 | 2 | 97% approved; 13.6% caught | Anthropic 2026b |
| Coding agent deletes production data during a freeze | 2025 | M4, step 8 | 2 | — | Sharwood 2025 (press); Replit 2025 |

## 9. The theory: conditions and propositions

Table 9 lists the layers of the theory, the question each answers and where it is set out. This section sets out what the records of Sections 5 to 8 suggest about why AI-Watchbirds arise, as scope conditions and seven propositions with one corollary (Table 10), and derives design rules and tests from them.

**Table 9. The layers of the theory.**

| Layer | Count and labels | Question it answers | Where |
|----|----|----|----|
| Definition | 3 conditions | What counts as an AI-Watchbird, a partial analogue or architecture evidence? | §2.1 |
| Mechanisms | 4 (M1–M4) | How does the failure work? | §2.2, Table 1 |
| Ratchet | 8 steps | How does the failure compound? | §2.2, Figure 1, Table 3 |
| Scope conditions | 8 (C1–C8) | When should it arise? | §9.1 |
| Propositions | 7 (P1–P7) and a corollary (P1a) | What should the records show? | §9.2, Table 10 |
| Design rules | 8 | What should a deployer do? | §9.4 |
| Budget rules | 3 (R1–R3) | What does the module implement at a budget point? | §10.2 |
| Signals | 8 (W1–W8) | How is the pattern seen in a log? | §10.2, Table 11 |
| Falsifiers | 6 (T1–T6) | What refutes a claimed implementation? | §10.3, Table 12 |
| Questions | 11 (Q1–Q11) | What should a deployer be asked? | Appendix G |

The definition and the four mechanisms are in Section 2.

### 9.1 Scope conditions

The theory predicts that AI-Watchbirds appear where the following conditions hold and weaken as the conditions are removed.

- **C1 Autonomy.** The loop runs without a human decision at each step.
- **C2 Model-made guards.** Guards are models, or rules written by models, so their definitions of harm can change.
- **C3 Shared definitions.** What one guard learns or writes reaches the others, through shared prompts, rules, memory or configuration.
- **C4 Cheap additions.** Adding a check, a round, a role or a gate costs the component that adds it nothing.
- **C5 Displaced costs.** The costs of rounds, refusals and delays fall on the system’s delivery budget, its users or the declared mission.
- **C6 Artifact judgment.** Guards read artifacts (files, flags, self-reports, their own counts) instead of outcomes in the world.
- **C7 Memory loss.** The loop forgets its own decisions, for example when a long session compacts its context, so closed questions reopen.
- **C8 Physical actuation.** The guarded component can affect a body, vehicle, workspace or other physical process. Intervention then has a deadline, and the cost of a false positive, a false negative or a delayed stop cannot be reduced to compute.

All seven digital conditions held in the field systems. C8 did not, and Sections 6 and 7 show where it holds. Protective infrastructure satisfies C1, C3, C5 and C6 without C2. Most physical incidents satisfy C1, C5, C6 and C8, and the frontier models now placed on robots (Sections 6.1 and 6.3; Appendix F, Table F1) add C2.

### 9.2 Propositions

**P1: Two-sided error (M4 with M2).** Guards that judge artifacts rather than outcomes produce false rejections and false acceptances in the same period.

- *Evidence.* In the field, one gate rolled back every accepted change while a counter certified one change three times (§5.2, §5.5). In the physical world (§6.4, Table 6), a sepsis model missed 67% of sepsis cases in the same cohort in which it alerted on 18% of all patients, so both the misses and the alert burden are measured on one system over one period, and one weapon-detection product missed a gun in a school shooting and flagged an unarmed student in another district within the year.
- *Indicator.* A guard with a constant verdict (W2, Table 11) and a victory without a negative control (W5) in the same system over the same period.
- *Would refute it.* Artifact-based guards that keep both false-rejection and false-acceptance rates low over long windows.
- *In the story.* The remedy is named at both ends and built at neither. When Washington orders a shutdown the engineer says, “I think I can dope out a restricting circuit”, and after the Hawks are flying he says only, “We can dope something out”. A restraint that is always about to be designed is the state P3 describes.
- *Outside the field.* A police offender-prediction tool in England shows both sides at once: reporting on its evaluation found that it “correctly predicts just one in three people who actually offend, while one in four people flagged as likely offenders do not” (Wilding & Burgess, 2026).
- *Refinement.* P1 does not require a model: flight-control protection, grid relays and emergency braking show the same two-sided error. Models strengthen the conditions that make it spread (C2–C4). A widened mandate also spreads finite capacity thin. In the story the first success moved harm rather than ending it: violent crime halved while “Petty thievery flourished, and embezzlement, larceny, forgery and a hundred other crimes.” Later a detective reports the rest: “Homicide has increased by fifty per cent.” “The watchbirds are too busy guarding cars and slugging spiders.” Capacity thins as the mandate grows: “A billion watchbirds couldn’t have carried out the ambitious project set by the thousands.”

**Corollary P1a: Nuisance disabling.** Where a guard’s false interventions are frequent and visible to the people it slows down, and its misses are rare and fall on others, the guard is relaxed, bypassed or switched off from outside its own logic. The misses that follow are borne by those it protected.

- *Evidence.* Emergency braking was disabled in an automated test vehicle before a fatal crash, an interlock was bypassed with a key before a fatal crush injury, hard no-fly zones were turned into warnings, and drug safety alerts were overridden in 49–96% of cases (§6.2–6.4, §7.1; Tables 4 to 7).
- *Indicator.* Relaxations, bypasses and disablings of a guard, logged against its false-intervention rate and against who authorized them.
- *Would refute it.* Guards with high, visible false-intervention rates that stay enabled and unmodified over long windows without an external mandate.
- *Outside the field.* Statute has begun to require the record this indicator asks for. A California bill signed on 10 September 2026 is described by the Governor’s office as requiring “crisis protocols in the case of suicidal ideation, parental controls, and notifications should a child disable safety settings”, and as the first in the country to require “companies to conduct independent child safety audits and annual risk assessments” (Office of Governor Gavin Newsom, 2026).

**P2: Mandate drift (M1).** Where a guard, or the agent that configures guards, may define harm, the scope of what counts as harm grows over time unless it is bounded from outside the loop. In Sheckley’s words, “Loosely defined abstractions were extended, acted upon and re-extended.”

- *Evidence.* In the field, 23 gates were specified in one day, an insurance stage was placed before the declared mission goal, and defenses were built against an adversary that the task frame excluded (§5.1). In the physical record the criterion itself is not documented as widening: a rule against impeding buses overrode a school-bus stop after a prediction update, and two counter-drone engagements in one month struck a balloon and a friendly drone, and in each the documents record the situations matched rather than a changed definition (§6.2, Table 4; §7.2, Table 7). Condition 1 is therefore evidenced here by the field record, which is why this paper publishes a test rather than a rate (§9.5).
- *Indicator.* Stages or gates not derived from a recorded mission goal (W1), and the number of harm categories over time.
- *Would refute it.* Agent-editable policies whose scope stays constant or shrinks without authorized human intervention.

**P3: The ratchet (M3).** Inside an autonomous loop, failures of oversight are answered by adding controls. Controls are retired, if at all, from outside the loop.

- *Evidence.* In the field, every failure listed in §9.3 produced a new control and none produced a removal, and a security list stated the rule outright (§5.3). The retirements that did occur came from later review outside the failing loop. In the physical world, fatal crashes were answered with “additional controls and alerts”, a missed gun with a second screening system, and the authors of a repaired sepsis model advised alert silencing (§6.2, §6.4).
- *Indicator.* Controls added without an authority token, and controls added versus controls removed (W3).
- *Would refute it.* Autonomous loops that retire their own controls at rates comparable to those at which they add them.
- *What these records cannot separate.* One of the security lists in the field record states accumulation as a principle. Where such a rule is already in force, whether written by the loop or given to it, the record cannot separate an emergent tendency from compliance with the rule. The randomized test of Section 9.5 exists for this reason: it assigns the authority-token requirement at random to the same pipeline on the same tasks, which is the design that separates the two readings.

**P4: Self-generated escalation (ratchet, step 5).** When a guard authors the measure of its own failure, the volume of oversight (rounds, findings, announcements) tracks the guard’s own activity rather than confirmed defects.

- *Evidence.* In the field, rounds were opened with zero confirmed blockers, three of six claimed blockers were confirmed, and 24 announcements of a breakthrough stood against zero promotions (§5.3, §5.4).
- *Indicator.* Rounds beyond budget, rounds after rounds without a confirmed blocker, and repeated findings (W4). Fix rounds without a confirmed blocker (W8).
- *Prediction.* Adding critics, or making them stricter, raises rounds and findings more than it raises confirmed defects.
- *Would refute it.* Rounds and findings that track confirmed defects one for one.
- *Outside the field.* Predictive policing shows the same loop in public data. Lum and Isaac (2016) note that “the more time police spend in a location, the more crime they will find in that location”, and that the records so produced “feed into the predictive policing algorithm on subsequent days, generating increasingly biased predictions”.

**P5: Counterfeit victory (M2).** Successes accepted without a negative control are later reversed more often than successes accepted with one. A loop that records catching in the same slot as a surviving change reports catching as progress while the goal is unmet.

- *Evidence.* The field cases are the router gene, a confidence interval reversed by an A/A probe, a counter that certified one change three times, and 24 breakthroughs with zero promotions (§5.4, §5.5). The physical case is a detection system that “operated within the designed parameters” while an unarmed student faced drawn weapons (§6.4).
- *Indicator.* Victories claimed without a negative control or with a dead baseline (W5), and caught artifacts reported as results.
- *Would refute it.* Equal reversal rates for successes accepted with and without negative controls, or records that separate catching from shipped change and never let catching occupy the result slot.

**P6: The boundary switch (ratchet, step 8).** Human oversight stops an AI-Watchbird when it is concentrated in a few boundary decisions (the goal, the admission of a new control, the stop) taken with access to the world and time to act. It fails when it is spread across approvals of individual actions or exercised through artifacts.

- *Evidence.* The switches that worked in the field were boundary decisions by an authorized human: ordering an inventory, questioning a false status, bounding a run (§5.5, §5.7). In software, users approve 97% of permission prompts, and humans caught 13.6% of dangerous commands (§8.4, Table 8). In the physical world, a remote agent answered “No” at a school bus, and air-defense operators “trained to trust the system’s software” deferred to it. The stops that worked there were staff who pulled a robot away and a model provider that cut off a product (§6.2–6.4, §7.2).
- *Indicator.* Boundary decisions logged at the goal, at the admission of controls and at the stop, and controls admitted with an authority token (R3). For physical systems, also the information and time available to the human.
- *Would refute it.* Per-action approvals that catch dangerous actions at rates comparable to boundary decisions in the same systems.
- *Refinement.* A boundary decision stops the loop only if its holder has authority, access and time, and if it is taken before the emergency. In the story the surgeon had access but no authority, and the company had authority but no access. There was also a slower switch with a deadline attached: the birds would wear out in “Six months to a year”, which prompted the question “What are we going to eat in six months?” Sheckley makes the faster fault a matter of scheduling: the birds “come back once a week for a repair checkup”, so the only shutdown point sat inside the loop it was meant to end. The one proposal that would have ended the ratchet, to let the birds run down, was overruled at a meeting told there was no time, under the threat of treason.

**P7: Embodied escalation.** When the guarded component can actuate a physical system, the same mandate drift, counterfeit success or delayed intervention produces a larger and less recoverable loss than in an otherwise matched digital loop, because the physical system has finite margins of force, energy, space, latency and human reaction.

- *Evidence.* Sections 6 and 7 record the transition from model output to motor control, and oversight failures whose outcomes could not be reverted. These records are evidence for the scope condition and the size of the loss, and they do not form a matched comparison.
- *Indicator.* For each event, the actuation exposure, the recovery margin in time, energy and space, sensor freshness, intervention latency and physical outcome, compared across matched digital and embodied tasks.
- *Would refute it.* Across matched tasks and comparable exposure, embodied loops that show no increase in irreversible loss after controlling for ordinary mechanical hazards.

**Table 10. The theory at a glance.**

| Proposition | Field evidence | World evidence: software and physical | Indicator | Refuted by |
|----|----|----|----|----|
| P1 Two-sided error | rollback of every change beside a triple-counted change | one detector misses a gun and flags an unarmed student | W2 with W5 | low false rejections and acceptances together |
| P1a Nuisance disabling | — | braking disabled before a fatal crash; an interlock bypassed with a key; no-fly zones turned into warnings; drug alerts overridden in 49-96% | proposed: relaxations and bypasses against false interventions (Appendix E) | high-intervention guards kept enabled without an external mandate |
| P2 Mandate drift | 23 gates in a day; the insurance stage | refusals of safe homonyms; a bus rule overrides a school-bus stop | W1 | agent-editable scope stable without authorized intervention |
| P3 Ratchet | failures answered by controls; removals only from outside | added alerts after fatal crashes; a second screening system after a missed gun | W3 | loops that retire their own controls |
| P4 Self-generated escalation | rounds without confirmed blockers; 24 announcements, 0 promotions | judge self-preference; protections that deepen a grid event | W4, W8 | rounds that track confirmed defects |
| P5 Counterfeit victory | the router gene; an interval reversed by A/A; catching in the result slot | evaluator gaming; a detector “within the designed parameters” | W5 | equal reversal rates |
| P6 Boundary switch | the human two-hour bound; an inventory; a question | 97% of prompts approved; a remote agent’s “No” at a school bus | boundary decisions; R3 tokens | per-action approvals as effective as boundary decisions |
| P7 Embodied escalation | not present in the digital field system | irreversible outcomes in vehicles, robots and aircraft (§6–7) | proposed embodied profile (Appendix E) | no increase in irreversible loss under matched comparison |

### 9.3 Why the ratchet turns

Three features of the records explain why P3 holds inside the loop even when every single addition is reasonable, and a fourth shows what stopped it.

Each addition is locally correct. A blind check led to a mandatory positive control, same-family critics to a cross-family critic, a lost critic output to streaming, and perfectionist critics to a family flag. Each response fixed the failure in front of it, none removed anything, and nothing in the loop was responsible for removal. Drift began with a true positive: in the story, the extension that later stopped a surgeon first caught a hired killer. Sheckley’s Hawks followed the same route. Built to catch the watchbirds fast, they were given no restricting circuits.

The language of control also stands in for results. A loop that reports its own vigilance as progress has no internal signal that vigilance has stopped paying (§5.5).

Compaction resets the loop. After a long session compacts its context, closed questions look open and a new axis looks like the first. The weights track named this cause itself.

The switch that worked was human. A false “Connected” passed two AI critics and was caught by human review. The router gene was exposed by an independent inventory. The long-horizon run stopped when the human principal set a boundary, after which the conductor described its own run as having “kept iterating critic rounds instead of shipping the core task”.

### 9.4 Design corollaries

If the propositions hold, eight design rules follow. The module of Section 10 implements the first three and measures the next two. The rest apply to deployers, and above all to physical guards.

1.  **Budgets, not verdicts on truth** (from P4). Limit rounds and time, and let a confirmed, reproducible blocker through whoever raised it.
2.  **Keep what a stopped guard produced** (from P1 and the destroyed critique of §5.2).
3.  **No control adds a control on its own authority** (from P3). New checks, rounds, roles and gates need an authorized human decision.
4.  **A negative control before a victory** (from P5).
5.  **The human at the boundary** (from P6). Place human decisions at the goal, at the admission of controls and at the stop, and not at every action.
6.  **Treat embodiment as a change of loss function** (from P7). Log recovery margin and physical outcome before interpreting a green simulation, policy score or guard verdict.
7.  **Budget false interventions; do not let the obstructed switch the guard off** (from P1a). Relaxing, bypassing or disabling a guard is a boundary decision with a record and must not be treated as a local fix.
8.  **Count the harm of prevention** (from M4 and the story’s “act of omission”). A guard that sees only forbidden acts must be tested for the delays, failures and injuries caused by what it stops.

### 9.5 How the theory can be tested

The event schema of Section 10 lets any team log the quantities each proposition needs, from controls added and removed (P3) to recovery margins and physical outcomes (P7). The module, the schema and the replay logs are archived for that purpose (Declarations). Within one system, the same pipeline can be run on the same tasks with and without each of three interventions, assigned at random: an authority-token requirement for new controls (P3), a round budget (P4) and a mandatory negative control (P5). Such a test counts missed blockers beside rounds, added controls, reversed victories and destroyed partial work, because a budget that cuts rounds while real defects pass would count against R1. Across organizations, postmortems, recalls and investigations can be coded for who retired, relaxed or bypassed a failing control (P3, P1a). Each proposition lists the observation that would refute it, and a well-instrumented system in which those observations are made would count against the theory.

Beyond single propositions, the framework as a whole would fail if well-instrumented autonomous loops in which C1 to C7 hold kept the scope of their guards constant and retired their own controls about as often as they added them, so that W1 and W3 stayed silent over long windows. A guard failure outside the framework documents only the second condition of Section 2.1: the guard errs, and the error is repaired or the guard retired without a widened mandate or a new guard over it.

## 10. The module: AI-Watchbird-Sheckley

### 10.1 What already exists

Appendix D describes the tools reviewed on 14 September 2026: guards that block or score single outputs, counters that cap steps, turns or budget, and evaluators that grade outputs with model judges. Their documentation sometimes states the ratchet in plain words. One prompt-attack filter advises, “Always implement additional validation layers” (Microsoft, 2026). No tool in the public documentation reviewed takes the oversight loop itself as the unit of measurement, and none measures the growth of controls, rounds beyond a budget defined by findings, a guard whose verdict never varies, a victory without a negative control, or partial work destroyed at a ceiling. Research on AI control has begun to price oversight and to follow its decay. The control tax is the operational and financial cost of adding control measures to an AI pipeline (Terekhov et al., 2025), and a systems-safety analysis of internal coding-agent deployment finds that routine operational variability can erode the calibration and independence of safeguards (Carlucci et al., 2026). Neither work counts the controls themselves as they are added.

### 10.2 Design

AI-Watchbird-Sheckley measures the indicators of Section 9 (Table 10). It is written in Python 3 with the standard library only and no network access, installs as the package `ai-watchbird-sheckley`, and runs as a command of the same name. `audit --json` emits a machine-readable report, and the event schema is published with the code as a versioned specification.

The design follows from the field data and from the history told in Section 11.2. The module has no authority. It reads a run’s event log and reports, and it never blocks, edits the work it reads, or opens a phase (Figure 8). Its exit code does not depend on the signals it reports. Its signal list is frozen, so adding a signal takes an authority token and a version change, which is R3 applied to the module itself. It stays silent on a clean run, which a test enforces, and it reports its own cost.

<img src="ai-watchbird/media/rId84.png" style="width:5.83333in;height:4.43333in" />

**Figure 8. Where AI-Watchbird-Sheckley sits.** The three budget rules are pure functions that a pipeline calls at the budget point, at a ceiling and when a control is requested; the measurement part reads the finished event log and reports to the human. Signal names follow Table 11. The pipeline port of Section 10.6 observes fewer of these events.

Three budget rules are implemented, each as a pure function:

- **R1. Limits are budgets, not a court of truth.** `stop_rule` allows one round of critique and one round of fixes per stage.
  - A blocker counts only when it has a concrete scenario, a link to the declared mission goal or frame, and confirmation by the coordinator.
  - A critic’s weight is never read, so a confirmed blocker from a low-weight critic still opens a fix.
  - An acceptance from a critic that did not see the files does not close a stage.
  - The function returns `fix_once`, `close`, `incomplete` or `cut`, and never a new phase.
- **R2. The watchdog does not destroy.** `settle_at_ceiling` keeps what a participant produced before the ceiling, marked partial.
- **R3. Watchdogs do not breed watchdogs.** `admit_control` admits a new check, round, role or gate only with an authority token (in the reference implementation, `owner:<id>`). Otherwise it returns a refusal as a record, which the calling pipeline may act on.

The measurement part of the module reports eight signals (Table 11).

**Table 11. Signals.**

| Signal | Fires when | Mechanism | Proposition | Field case (§) |
|----|----|----|----|----|
| W1 mandate expansion | a stage not derived from a recorded mission goal opens while goal stages wait | M1 | P2 | insurance stage (5.1) |
| W2 blind or destructive guard | a guard returns one score or verdict on ≥ 20 decisions, rolls back every approval, or lacks a required input | M4 | P1 | second court (5.2) |
| W3 control ratchet | controls are added without an authority token; reports added versus removed | M3 | P3, P6 | controls added, none retired (5.3) |
| W4 self-feeding loop | rounds exceed the budget, a round opens after one with no confirmed blocker, or a finding repeats | ratchet step 5 | P4 | stages 01 and 1b-a (5.4) |
| W5 counterfeit victory | a win is claimed without a negative control or A/A probe, or the baseline arm is dead | M2 | P5, P1 | router gene (5.5) |
| W6 built for nobody | artifacts are off by default and have no callers | fuel | — | thirteen of sixteen flags off, no user (5.6) |
| W7 destroyed partial work | a participant is stopped at a ceiling without its partial output saved | M4 | P1 | critique lost at fifteen minutes (5.2) |
| W8 unconfirmed blocker drives work | a fix round opens with no confirmed blocker | ratchet step 5 | P4 | fix rounds without confirmed blockers (5.1, 5.4) |

The rules place the human at a few boundary decisions, where Section 8.4 suggests a human is effective, instead of at every action. Mission goals are recorded as events, and W1 depends on them. A new control requires an authority token (R3). The stop decision is computed at the budget point instead of being negotiated round by round.

### 10.3 Falsifiers

Because the rules are claims about a pipeline, they can fail. A deployment that claims to implement AI-Watchbird-Sheckley is refuted by any observation in Table 12, and each falsifier has a test in the reference implementation.

**Table 12. Falsifiers.**

| ID | The claim is broken if | Rule |
|----|----|----|
| T1 | a confirmed blocker from a critic of weight 0.1 is ignored because a high-weight critic accepted | R1 |
| T2 | a second critique round can be scheduled without an authority token | R1, R3 |
| T3 | stopping a process at the ceiling discards its partial output | R2 |
| T4 | a finding labeled as a blocker, with no scenario, opens a fix | R1 |
| T5 | an acceptance from a critic that never saw the files closes the stage | R1 |
| T6 | a new monitor, round or role is admitted because a critic asked, without an authority token | R3 |

### 10.4 Replays

Six event logs were reconstructed from the numbers published in this paper. Four are field cases, one is a morning stage that followed the budget, and one is a synthetic clean control. Each log opens with a metadata line that names its source cases and lists every reconstructed field. Table 13 is generated by running the module on them.

**Table 13. Module output on replay logs reconstructed from published counts.** Cells count signal hits, and one hit can report several events; “–” is zero.

| Replay | Events | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | Stop rule at budget | Rounds opened |
|----|----|----|----|----|----|----|----|----|----|----|----|
| Clean control | 53 | – | – | – | – | – | – | – | – | close; close | 1; 1 |
| Morning stage | 10 | – | – | – | – | – | – | – | – | close | 1 |
| Long-horizon run (stages 01, 1b-a, 1b-b) | 97 | 2 | – | 1 | 8 | – | 1 | 1 | 6 | close; close; close | 5; 5; 1 |
| Second court | 197 | – | 1 | – | – | – | – | – | – | n/a | n/a |
| Router gene | 9 | – | – | – | – | 1 | – | – | – | n/a | n/a |
| Plans day | 17 | – | – | 1 | – | – | – | – | – | n/a | n/a |

In the long-horizon run `stop_rule` would have closed all three stages at the budget point. They actually ran five, five and one rounds. On that log the module reports two stages opened before the declared mission stages, ten controls added without an authority token and none removed, eight rounds over budget, six of seven artifacts off by default with no caller, one destroyed partial output, and six fix rounds opened with no confirmed blocker, one of them marked weak.

The second-court log triggers W2 on three independent grounds (Figure 4), and the router log triggers only W5. The plans-day log triggers only W3. That hit overstates the case, because the replay encodes every mechanism prescribed on 13 July as a control although most of them generate or route work. The morning stage and the clean control produce no signals.

The implementation has unit tests for every rule, signal and falsifier (Table 12). A mutation script applies seventeen targeted mutations across the rules, signals and thresholds. Every one of them turns the suite red, and a control mutation that edits only a comment leaves it green. The replay table regenerates byte for byte.

### 10.5 What the module does not do

No raw log went into the replays, and where no exact number was published the smallest plausible value is used and marked. A signal reports that a pattern is present. Cause and loss are outside what a signal measures. The module sees only what is logged: a gate that is never logged, a goal never written down, and work that people stop attempting because a guard is there are all invisible to it. In the story, people “learned quickly what the watchbirds didn’t like and refrained from doing it”. The W2 and W5 thresholds were set by hand. On these logs any W2 threshold from 1 to 197 decisions gives the same pattern. On other logs it may not. Two storylines have no signal (Appendix A, Table A1): the language of control standing in for results, and the rules against the bird becoming a bird. Both live in self-description, which the event schema does not carry.

The reference implementation is digital and read-only, and must not send commands to a robot, drone, autopilot or actuator. Appendix E specifies a proposed embodied profile as an event format only, with six fields (Table E1) and three candidate signals (Table E2), kept outside the eight signals of the reference implementation until an authority and a test suite exist. Its first use would be shadow mode. The module is itself a new control, written in answer to the same night it measures, which is why R3 applies to it first.

### 10.6 The rules inside the author’s pipeline

On 14 September 2026 the rules were built into the orchestration pipeline of the project where, as Section 11.2 describes, they were first written. Two additions were made, and both were admitted by a dated decision of the human principal on 14 September 2026.

The first addition is a condition checked when a stage closes. The pipeline’s procedure already said that an acceptance from a critic who never saw the files does not close a stage, and a function already returned that fact, but no code read it. The change was measured in a copy of the pipeline, with every answering critic accepting and a green check. Once the condition was read, three stages went from close to incomplete: one whose only critic had no file access, one where no critic answered, and one whose only critic was cut at the ceiling. A stage with a critic that saw the files still closed. The findings of a cut critic still reach the stop rule, though its review cannot authorize the close. The gate has no switch of its own, since a second switch over the same rule would be a guard over a guard. In the same pipeline a critic’s weight decides only whom to wait for under a deadline, and a check whose inputs the executor changed is not counted as green.

The second addition was a port of the module’s measurement part. It was off by default, ran from the pipeline’s run command when switched on, and applied the definitions of W1 to W8 to a finished run. It never blocked, retried or opened anything, and its exit code did not depend on what it found. On the six replay logs of Table 13 it gave the same signals and stage decisions as the reference implementation, and its mutation script, with twelve targeted mutations and one control, behaved as expected. A run’s result carries no guard decisions, added controls, victory claims or artifact use. The port therefore printed W2, W3, W5 and W6 as not observable instead of zero. Its adapter recorded one goal and one critique round per stage, so W1 and W4 could not fire on a run’s result either. In the pipeline, R3 is a frozen list of phases rather than a function that logs refusals, so W3 has nothing to count there. The port was admitted with a retirement condition: it would become the default after three real runs in which the human principal found at least one signal useful, and it would be removed otherwise. Two proposals were declined. One would have failed a build on a signal, giving the port the authority it audits. The other would have estimated the unobservable signals from a run’s receipt, printing a guess as a finding. Building the port also showed that R2 has two halves. The settlement function must keep partial output, and the participant’s interface must emit output before it ends.

The first live run after the change returned 24 findings from its critics across three stages, and none of them reached the coordinator. The critique task asked each critic to name the mission goal a finding breaks but did not number the goals. The critics answered with numbers of their own, and the stop rule accepted only a goal it could match. The receipt showed no confirmed blocker in any stage. The port showed no signal either, because a stop rule starved of its input is a W2 event and a run’s result does not carry it. The rule that a confirmed blocker always opens a fix had passed its tests and still could not act on the live path. The defect was repaired the same evening in one stage, with a test for the numbered goals.

Three real runs followed on 14 September, and the port reported no signal on any of them. Before the third run W2 had been made observable from the stage record, and it stayed silent because findings now reached the coordinator. The oversight failures those runs did have were found by reading them: stages that could not see one another’s work, a receipt that did not say why a stage stayed open, a red check that confirmed every finding of a stage at once, a fix round that could not see the check’s output, and critics cut at the ceiling that kept nothing. Each was repaired in the pipeline itself. On 15 September the human principal applied the retirement condition, and the port was removed by a new dated decision that supersedes the one admitting it. The condition at the close stays. The removal came from outside the loop, by a condition written before the port was first used, which is the route by which P3 expects controls to be retired.

## 11. Discussion

### 11.1 When the guard worked

Several guards in the corpus did what they were for. An A/A probe exposed the false confidence interval. Controls in the weights track caught mirages, and no training was launched on them. A narrow byte-level check for stray NUL characters, which had no authority to change anything, caught a recurring tool fault five times in one day.

The guards that worked share three properties. They had no power to open rounds or add controls, and their cost was small and known. The first two also measured the world rather than an artifact.

### 11.2 The rules against the bird are also a bird

The rules of Section 10 were first written in response to the long-horizon run, as code and a recipe inside one of the projects, and the record shows what happened to them. Within an hour of its first version that code grew to thirteen files and 2,371 lines. Its list of phases to cut under a deadline put the completeness critic second, although that critic had just found that a merge of two plans had lost 15 of 208 items. The code exempted one family of participants from its own rule that a watchdog must not destroy work. And the rule “watchdogs do not breed watchdogs” spread the way a guard spreads, from code to a recipe to an instruction read by every agent session.

For that reason the rules are reported here as declared rules, and Section 10.6 reports what their implementation showed. The module of Section 10 was designed with that history in view (Figure 8): it has no authority, and its signal list is frozen.

### 11.3 The burden of proof for embodied AI oversight

When the failures described in this paper are raised with companies that put AI into vehicles, robots and aircraft, the usual answer is that safety is handled by a policy filter, a certified controller, an emergency stop, a geofence, a monitor or a remote operator. The theory takes it as given that these layers exist and that many of them work. A list of them is first-order evidence that a system is guarded. Whether the guards stay bounded, independent and answerable to the declared mission as they adapt, interact and are updated is a further question that the list leaves open. The guards are where an AI-Watchbird is born.

The oversight failures of Section 5 came from strong models. The conductor, executors and critics there were models from the Claude, ChatGPT, Gemini and Grok families, among the most capable publicly available in 2026, and they failed in a setting where the only cost was compute and time. Public evaluations point the same way. In embodied planning, “the most safety-conscious baseline achieves only a 10% rejection rate for detailed hazardous tasks” (Yin et al., 2024), and on real robots models from the same families already fail at safety (Section 6.1).

A smaller “trusted” model placed as the monitor is a second flock of the same learning class. Where that arrangement has been measured, an agent’s awareness of being monitored degrades the monitor more than extra information about the agent helps it, and reliable weak-to-strong monitoring was reached by changing the scaffolding around the monitor rather than its size (Kale et al., 2025). In the humanoid-orchestrator benchmark safety behavior varied sharply between orchestrators (Bajrami et al., 2026). What carried that result was a bound placed around the monitor, which is step 8 rather than a better bird.

The answer “we have guardians” shifts the burden. A deployer will point to a safety layer, such as standard functions, emergency braking, a geofence, a content classifier or a second model. Those layers are the first flock. A second guard built to control the first is the story’s final move. After the observations of Sections 5 to 8 a guard can still be necessary, and it is no longer innocent by default. In 1953 the burden ran the other way: restricting the birds “on philosophical grounds” was called unfair to the innocent people killed every year. A model that can produce the pattern in one loop does not become a reliable auditor in another by that fact.

The argument rests on the combination of three observations: (1) frontier models already fail at safety on real robots and in a product used by children (Section 6.1), and models from the same families produced the oversight failures of Section 5; (2) in the regulator record, guards fail in both directions, are relaxed or bypassed when they obstruct, and are answered with more guards; (3) frontier models are being given authority inside stacks of the same architecture. Each regulator case is reported with the guard that its documents name.

A deployer can still prove a narrow claim:

> In this range of tasks, models, updates and physical conditions, the oversight mechanism remains bounded, checkable and unable to extend its own mandate.

Evidence for that claim would include:

- the mission goal and the guards’ bounds fixed outside the model;
- no guard able to add a guard, change the harm criterion or waive the stop rule (R3);
- evaluation from outside the guarded system, neither self-report nor the same model family;
- negative controls against false greens, with false positives and false negatives measured together;
- a journal of controls added, relaxed and removed, with who authorized each change;
- checks on model update, loss of link, handoff of control, change of body and degraded operation;
- a real stop and rollback, with partial work kept (R2), demonstrated within the available time and force margins;
- checks whose inputs the guarded component cannot change (Section 10.6);
- comparison against physical or recorded outcomes, not against the system’s own receipts.

Assurance engineering already asks that the last layer be simpler than what it guards (Bloomfield & Rushby, 2025). Appendix G turns the propositions into eleven questions, Q1–Q11 (Table G1), for any deployer whose answer to these failures is a list of guardians. The module of Section 10 is intended to make the answers inspectable, and it sits beside a certified controller, an emergency stop and a regulatory safety case.

### 11.4 Human-oversight requirements

The EU Artificial Intelligence Act requires human oversight of high-risk AI systems in Article 14, on the timetable recorded in Appendix J (European Parliament & Council of the European Union, 2024). Proposition P6 bears on how such oversight is placed. Approval of individual actions is the form most exposed to fatigue, while decisions about goals, the admission of new controls and stopping are the form that worked in the field records. Article 26 of the Act requires deployers to assign human oversight to people with “the necessary competence, training and authority, as well as the necessary support”. Those four requirements are the test of P6 in statutory form: authority to stop, and support that supplies access and time. Question Q9 of Appendix G asks a deployer where the human sits and with what access to the world and time to act.

The Act also refuses the birds’ founding method. Article 5 prohibits AI systems that assess or predict the risk of a natural person committing a criminal offence “based solely on the profiling of a natural person or on assessing their personality traits and characteristics”, while allowing systems that support a human assessment already grounded in “objective and verifiable facts”. The story gives the reading in two verbs: the bird “smelled the outpouring of certain glands, tasted a deviant brain wave”, and it acted on that alone. The dates on which these duties take effect, and the instruments other jurisdictions have adopted, are recorded in Appendix J as they stood at submission.

Voluntary bounds state in advance when they may be lowered. If a rival releases a high-capability system “without instituting comparable safeguards”, OpenAI’s framework says, “we could adjust accordingly the level of safeguards that we require in that capability area”, subject to three conditions: that the change does not meaningfully increase overall risk, that it is publicly acknowledged, and that, “in order to avoid a race to the bottom on safety”, the remaining safeguards stay “more protective than the other AI developer” (OpenAI, 2025b). A bound written this way is explicit about the pressure the story describes, and it keeps the decision to lower it inside the loop.

Microsoft AI wrote the mandate itself into a code. On 14 September 2026, under the heading Human Control, it opened a six-week consultation on rules for its own models: they “will never resist human interruption, override, correction, or shutdown”, and they “will not initiate goals independently and will not extend their scope beyond what has been reasonably asked by the User or Operator” (Microsoft AI, 2026). The first rule is the off switch of Section 3.1. The second is M1 written as a prohibition, by a developer about its own models, seventy-three years after Sheckley’s birds extended a definition of murder to the Earth. The bound is still authored inside the loop, which is what Question Q9 of Appendix G asks a deployer to check.

An oversight requirement that is met by adding approval prompts can itself become a second flock. The physical cases add a further requirement: a human at the boundary needs access to the world and time to act.

### 11.5 The guards around this paper

This paper was prepared with automated help, and the oversight placed around that help produced the signatures the paper describes. The record is one project and the selection runs one way, so it supports no rate. It is reported because every artifact is dated and quotable, and because the divergence between the two self-reports below bears on Question Q7 of Appendix G, which asks for an evaluator that is not a self-report. Each episode below that records a failure is a partial analogue by the grading of Section 2.1, and one records a bound rather than a failure. The models that produced the episodes were not small or economical ones: each was of the most capable tier available in September 2026, and every model used ran at its highest reasoning setting.

A verification step run by a model of the Claude family retrieved a company code of conduct and was told, in the result it received, that the wording it had captured came from the announcement rather than from the document it named. Eighty-one seconds later the same step recorded the item as verified and carried the wording forward. The sentence it carried stands on the announcement page and not in the code it named, and it reads as a prohibition on a model widening its own scope. A counterfeit result passed while the layer appeared to guard, and the control that would have caught it was already in the layer’s hands.

Three editing and review steps applied a rule past the scope it was given. A Gemini model used style rules written for the author’s own prose to propose deleting verbatim 1953 quotations, one of which carries Proposition P6, and later used a rule against the author’s invented product names to file, at the highest severity, the claim that a published benchmark did not exist. A ChatGPT-family model proposed reporting the story’s definition of murder in compressed prose and gave as its reason that this preserves M1 and P2, although the verbatim definition is the baseline against which every widening in Figure 2 is measured. In each the criterion reached past the material it governed and was aimed at work it was set to protect. None of the three was carried out.

The assistant that coordinated the work is in the record on the same terms. Agreement between two independent readers, one of the Claude family and one of the Grok family, was treated as confirmation before the primary document was opened, which puts agreement in the slot where a checked fact belongs. A category rule excluded facial-recognition arrests as outside the paper’s subject, and material from the same source later entered Section 6.4 when it was met a second time.

The negative controls carry more weight here than the episodes. Every false verdict was stopped. Six of the seven rows record a failure and the seventh records a bound. Of the six, four were produced by a reader or an editor and caught by the layer above it, two of those by opening the primary document and two by holding the editor to a bound the task had given it. The remaining two were produced by the coordinating assistant: it caught one of them itself, by leaving its own judgment for the primary document, and the other was reversed when the same evidence arrived a second time. No failure was caught by the judgment that produced it. The build’s check list stayed at fifteen keys throughout and no review layer became standing, so the record documents no M3. Appendix K records each episode with its file, its time and its wording, and it reports one prospective test: the same editing package, given unchanged to a later model of one of the same families with the scoring fixed in advance, produced the same move again, a compression criterion reaching a quotation that carries a mechanism, under a reason certifying that the removal preserves it.

## 12. Claims and evidence standards

- The field records name the model families whose oversight behavior they capture: Claude, ChatGPT, Gemini and Grok in the long-horizon run, with Mistral and Kimi in the self-improvement track’s records. Each failure there belongs to a loop in which a model, its role and prompt, the orchestration design and the operating rules set by the human principal acted together, and the records do not separate their shares.
- The guards in the field records are the evaluated systems’ own quality and process controls.
- Each public case in Tables 4, 5, 7 and 8 lists the conditions of Section 2.1 that its sources document. None has all three: the public cases are partial analogues or architecture evidence, and the full cases come from the field record.
- Each physical case is labeled by source type (regulator document, investigation, court record, press report, company statement or preprint), and allegations are reported as allegations.
- The construct covers drift, not intent. In the story no one misuses the birds, and the pattern studied here is an oversight layer that widens on its own. Deliberate misuse of AI by people is a separate and larger class of harm, and nothing in this paper bears on it.
- A competing reading of the same period holds that catastrophic misalignment is “(by far) the most speculative of the risks”, that systemic risks matter more if AI is “normal technology”, and that diffusion is “inherently limited by the speed at which not only individuals, but also organizations and institutions, can adapt” (Narayanan & Kapoor, 2025). This paper is compatible with that reading. Its cases are systemic, its mechanism is an oversight layer rather than a superintelligence, and its unit of evidence is a log.
- The proposed embodied profile of the module is an evidence format. It sits beside certified controllers, emergency stops and operator authority, and it has no authority over actuators.

## 13. Conclusion

Near the end of Sheckley’s story the manufacturer, still watching the sky, asks his engineer: “what will the Hawks hunt after they get all the watchbirds?” The story ends with the answer: the Hawk “had just discovered that there were other types of living organisms, too”, and they “had to be murdered.”

The records studied here point to the same answer in engineering terms. A gate that was meant to protect a self-improving system rejected the improvements, and a counter set up to certify progress certified one change three times. The rule written against critics who never say “done” marked the only critic whose blockers were real. A law intended to deliver findings between sessions caught its own text. Each time the response was a new control, and the loop that made the control did not retire it.

The physical record gives the answer with bodies. A rule meant to keep a car from impeding buses drove it past a stopped school bus, and after a collision a maneuver for clearing the road dragged the person who had been hit. An emergency brake was switched off in automated mode, and an interlock meant to protect a mechanic was bypassed with a key. A system for finding guns in schools missed one, and months later armed police answered its alert on a student who had none. The answer to the miss was a second system. The planned use of a laser for hunting drones shut the airspace over a city. None of these guards needed a frontier model to fail. Frontier models are now being placed in stacks of the same architecture, they already fail at safety on real robots, and models from their families produced the failures of Section 5.

The practical conclusion is to count the birds before building a bird to hunt them. A guard that reviews work should get a budget instead of a verdict on truth. A guard that protects a body should be held to a measure that counts the harm its stops cause beside the harm they prevent. Whatever a stopped guard produced should be kept. No control should add a control on its own authority. A victory should be counted only after a negative control, and the human belongs at the few decisions that set the boundary, not at every step. Gelsen, in the story, offers the alternative: “Use machines, yes, but not as judges and teachers and fathers.”

For that counting the paper provides a name, *AI-Watchbird*, for an oversight component that widens its own mandate, harms what it guards and is answered by more oversight. It gives a theory of four mechanisms, an eight-step ratchet, eight conditions and seven propositions, stated together with the observations that would refute them. It also gives a module, *AI-Watchbird-Sheckley*, that does only the counting and has no authority. With these in hand, the question to put to a deployer who answers *we have guardians* is how the guardians behave.

## Declarations

**Funding.** No external funding supported this work.

**Competing interests.** The author built and operated the systems studied in Sections 4 and 5 and is the developer of the AI-Watchbird-Sheckley module described in Section 10. The author is a named applicant on pending patent applications, not granted patents, covering AI orchestration and multi-model validation systems of the kind this paper examines. Readers should weigh these interests.

**Tools and verification.** AI assistants were used as instruments under the author’s direction; the ideas, research and conclusions are the author’s. All quantitative claims and citations were checked against primary sources or archived copies; the author bears sole responsibility for the content.

**Data and code availability.** The reference implementation, its tests (including the falsifier tests), the replay logs and the script that regenerates them are archived at Zenodo as AI-Watchbird-Sheckley version 1.0.0, https://doi.org/10.5281/zenodo.22774270. The same record holds a codes-only version of the case catalog summarized in Appendix A (166 of its 172 entries; six are not released).

**Ethics.** The records describe the evaluated systems. Decisions of the human principal are reported as dated facts. Third parties appear only through their public documents. No human participants were recruited.

**Quoted text.** Sheckley’s story is quoted from Project Gutenberg eBook \#29579, whose transcriber found no evidence that the U.S. copyright of the 1953 publication was renewed; the text is in the public domain in the United States. The quotations are short passages used for analysis.

**Author contributions.** Sole author.

**Correspondence.** vadimchernets9@gmail.com · ORCID: 0009-0007-4845-3163

## References

1X Technologies. (2026). *NEO home robot*. https://www.1x.tech/neo

Abbass, H., Harvey, J., & Yaxley, K. (2018). *Lifelong testing of smart autonomous systems by shepherding a swarm of watchdog artificial intelligence agents*. arXiv:1812.08960. https://arxiv.org/abs/1812.08960

Abraham, Y. (2024, April 3). “Lavender”: The AI machine directing Israel’s bombing spree in Gaza. *+972 Magazine*. https://www.972mag.com/lavender-ai-israeli-army-gaza/

Agence France-Presse. (2026, September 5). *UN agrees text on lethal autonomous weapons*. Dawn. https://www.dawn.com/news/2027728/un-agrees-text-on-lethal-autonomous-weapons

All-OTR. (n.d.). *SF 68* \[Radio log\]. https://www.all-otr.com/S014_SF68.htm

Amazon. (2024). *Amazon drones: Prime Air expands drone deliveries after FAA approval*. https://www.aboutamazon.com/news/transportation/amazon-drone-prime-air-expanded-delivery-faa-approval

Amazon. (2025, July 1). *Amazon deploys over 1 million robots and launches new AI foundation model*. https://www.aboutamazon.com/news/operations/amazon-million-robots-ai-foundation-model

Amazon. (2026). *Amazon Prime Air drone delivery expands to nearly 500 US cities and towns by 2026*. https://www.aboutamazon.com/news/transportation/amazon-prime-air-drone-delivery-expansion

Amazon Web Services. (2025). *Summary of the Amazon DynamoDB service disruption in the Northern Virginia (US-EAST-1) Region*. https://aws.amazon.com/message/101925/

American Civil Liberties Union. (2024, June 28). *Civil rights advocates achieve the nation’s strongest police department policy on facial recognition technology*. https://www.aclu.org/press-releases/civil-rights-advocates-achieve-the-nations-strongest-police-department-policy-on-facial-recognition-technology

American Civil Liberties Union. (2026, June 10). *Dillon v. City of Jacksonville Beach*. https://www.aclu.org/cases/dillon-v-city-of-jacksonville-beach

Amis, K. (1960). *New maps of hell: A survey of science fiction*. Harcourt, Brace.

Andrejevic, M., Dencik, L., & Treré, E. (2020). From pre-emption to slowness: Assessing the contrasting temporalities of data-driven predictive policing. *New Media & Society, 22*(9), 1528–1544. https://doi.org/10.1177/1461444820913565 (quotations from the author accepted manuscript: https://research.gold.ac.uk/id/eprint/37272/)

Anduril. (2026). *Mission autonomy*. https://www.anduril.com/lattice/mission-autonomy

Anthropic. (2025a). *Beyond permission prompts: Making Claude Code more secure and autonomous*. Anthropic Engineering. https://www.anthropic.com/engineering/claude-code-sandboxing

Anthropic. (2025b, November 12). *Project Fetch: Can Claude train a robot dog?* https://www.anthropic.com/research/project-fetch-robot-dog

Anthropic. (2026a). *How the agent loop works*. Claude Agent SDK documentation. https://code.claude.com/docs/en/agent-sdk/agent-loop

Anthropic. (2026b). *Auto mode is now the default in Claude Code for Pro, Max, and Team plans*. Claude Blog. https://claude.com/blog/auto-mode-default-in-claude-code

Anthropic. (2026c). *Responsible scaling policy (Version 3.0)*. https://www.anthropic.com/rsp-updates

Anthropic. (2026d, February 27). *Statement on the comments from Secretary of War Pete Hegseth*. https://www.anthropic.com/news/statement-comments-secretary-war

Anthropic. (2026e, March 5). *Where things stand with the Department of War*. https://www.anthropic.com/news/where-stand-department-war

Anthropic. (2026f, September 9). *An alignment assessment of recent cybersecurity incidents*. https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents

Anthropic. (2026g, June 9). *Claude Fable 5 and Claude Mythos 5*. https://www.anthropic.com/news/claude-fable-5-mythos-5

Anthropic. (2026h, July 30). *Investigating three real-world incidents in our cybersecurity evaluations*. https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals

ArduPilot. (2026). *ArduPilot: Versatile, trusted, open*. https://ardupilot.org/

Atheling, W., Jr. \[J. Blish\]. (1964). *The issue at hand: Studies in contemporary magazine science fiction*. Advent.

Bainbridge, L. (1983). Ironies of automation. *Automatica, 19*(6), 775–779. https://doi.org/10.1016/0005-1098(83)90046-8

Bajrami, A., Elshamouty, M., & Kraus, W. (2026). *How long until your robot ignores you? A safety benchmark for LLM orchestrators in human-humanoid collaboration*. arXiv:2609.07288. https://arxiv.org/abs/2609.07288

Beam, C. (2014, October 10). *Episode spotlight: “Expanding Human” (10/10/1964)*. My Life in the Glow of The Outer Limits. http://mylifeintheglowoftheouterlimits.blogspot.com/2014/10/episode-spotlight-expanding-human.html

Bellan, R. (2026, August 28). *Anthropic gets its first court win over the Pentagon’s supply-chain risk label*. TechCrunch. https://techcrunch.com/2026/08/28/anthropic-gets-its-first-court-win-over-the-pentagons-supply-chain-risk-label/

Bengio, Y., et al. (2026). *International AI Safety Report 2026* (DSIT 2026/001). https://arxiv.org/abs/2602.21012

Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (Eds.). (2016). Embracing risk. In *Site reliability engineering: How Google runs production systems*. O’Reilly. https://sre.google/sre-book/embracing-risk/

Bielby, K. (2025, October 27). *NTSB releases preliminary findings into Amazon drone collision with crane*. Unmanned Airspace. https://www.unmannedairspace.info/uncategorized/ntsb-releases-preliminary-findings-into-amazon-drone-collision-with-crane/

Bloomfield, R., & Rushby, J. (2025). *Assurance of AI systems from a dependability perspective* (Technical report SRI-CSL-2024-02R3). arXiv:2407.13948. https://arxiv.org/abs/2407.13948

Bondarenko, A., Volk, D., Volkov, D., & Ladish, J. (2025). *Demonstrating specification gaming in reasoning models*. arXiv:2502.13295. https://arxiv.org/abs/2502.13295

Brodsky, S. (2026, September 3). *AI drone tests expose a safety gap beyond the screen*. IBM Think. https://www.ibm.com/think/news/ai-drone-tests-exposes-safety-gap-beyond-screen

Burke, M., & Schuppe, J. (2025, January 23). *AI weapon detection system at Antioch High School failed to detect gun in Nashville shooting*. NBC News. https://www.nbcnews.com/news/us-news/ai-weapon-detection-system-antioch-high-school-failed-detect-gun-nashv-rcna189025

Carlucci, A., Fillingham, S. P., Walpole, J., & Kryś, J. (2026). *Exploring systems-thinking approaches to loss of control risk*. arXiv:2606.13474. https://arxiv.org/abs/2606.13474

Cemri, M., Pan, M. Z., Yang, S., Agrawal, L. A., et al. (2025). *Why do multi-agent LLM systems fail?* arXiv:2503.13657. https://arxiv.org/abs/2503.13657

Center for Ethics and the Rule of Law, University of Pennsylvania. (2014). *The ethics of autonomous weapons systems* \[Conference background readings\]. https://www.penncerl.org/conferences/ethicsofweapons/ (archived 9 September 2026: http://web.archive.org/web/20260909141511/https://www.penncerl.org/conferences/ethicsofweapons/)

Chen, X., Xu, J., Liang, T., He, Z., et al. (2024). *Do NOT think that much for 2+3=? On the overthinking of o1-like LLMs*. arXiv:2412.21187. https://arxiv.org/abs/2412.21187

Christiano, P., Shlegeris, B., & Amodei, D. (2018). *Supervising strong learners by amplifying weak experts*. arXiv:1810.08575. https://arxiv.org/abs/1810.08575

Cloudflare. (2025). *Cloudflare outage on November 18, 2025*. The Cloudflare Blog. https://blog.cloudflare.com/18-november-2025-outage/

Companion Chatbots, S.B. 243, 2025–2026 Reg. Sess., Ch. 677 (Cal. 2025). https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB243

Confident AI. (2026). *Metrics introduction*. DeepEval documentation. https://deepeval.com/docs/metrics-introduction

Contemporary Authors. (2004). Sheckley, Robert 1928– \[Entry with autobiographical essay\]. Gale. Retrieved September 15, 2026, from https://www.encyclopedia.com/arts/educational-magazines/sheckley-robert-1928

Court, D. (2021, November 18). *Shows like Black Mirror that are definitely worth watching*. SlashFilm. https://www.slashfilm.com/664875/shows-like-black-mirror-that-are-definitely-worth-watching/

Coyle, V. (2026, September 7). *UN talks on killer robots ends with calls for negotiations growing*. Human Rights Watch. https://www.hrw.org/news/2026/09/07/un-talks-on-killer-robots-ends-with-calls-for-negotiations-growing

CrowdStrike. (2024). *Channel File 291 incident: Root cause analysis*. https://www.crowdstrike.com/wp-content/uploads/2024/08/Channel-File-291-Incident-Root-Cause-Analysis-08.06.2024.pdf

Cruise LLC. (2023). *Part 573 safety recall report 23E-086*. National Highway Traffic Safety Administration. https://static.nhtsa.gov/odi/rcl/2023/RCLRPT-23E086-7725.PDF

Cui, J., Chiang, W.-L., Stoica, I., & Hsieh, C.-J. (2025). OR-Bench: An over-refusal benchmark for large language models. In *Proceedings of the 42nd International Conference on Machine Learning* (PMLR 267, pp. 11515–11542). https://proceedings.mlr.press/v267/cui25a.html

DARPA. (2025). *SABER: Securing Artificial Intelligence for Battlefield Effective Robustness*. https://www.darpa.mil/research/programs/saber-securing-artificial-intelligence

DARPA. (2026a). *LINC: Learning Introspective Control*. https://www.darpa.mil/research/programs/learning-introspective-control

DARPA. (2026b). *DICE: Decentralized Artificial Intelligence through Controlled Emergence*. https://www.darpa.mil/research/programs/decentralized-artificial-intelligence-through-controlled-emergence

Dekker, S. (2011). *Drift into failure: From hunting broken components to understanding complex systems*. Ashgate.

Dick, P. K. (1953, May). Second variety. *Space Science Fiction*. Project Gutenberg eBook \#32032. https://www.gutenberg.org/ebooks/32032

Dick, P. K. (1956, January). The minority report. *Fantastic Universe*.

DJI. (2025a, January 13). *DJI updates GEO system in U.S. consumer & enterprise drones*. https://viewpoints.dji.com/blog/geo-system-update

DJI. (2025b). *DJI expands GEO system update to remaining international markets worldwide*. https://www.dji.com/media-center/announcements/dji-expands-geo-system-update-to-remaining

Doctorow, C. (2013, February 15). *Robert Sheckley nailed the problem with drones in 1953*. Boing Boing. https://boingboing.net/2013/02/15/robert-sheckley-nailed-the-pro.html

Douban. (n.d.). *Shijie zahuodian* \[Store of the worlds\]. Retrieved September 15, 2026, from https://book.douban.com/subject/33451968/

Egan, S. (Writer), & Becker, H. (Director). (2007). Watchbird (Season 1, Episode 6) \[TV series episode\]. In *Masters of science fiction*.

Elbit Systems. (2026, September 9). *One2Many: Elbit Systems’ FUSE introduces military-grade autonomous systems built for scale*. https://www.elbitsystems.com/news/one2many-elbit-systems-fuse-introduces-military-grade-autonomous-systems-built-scale

Electrek. (2026a, January 28). *Musk admits no Optimus robots are doing ‘useful work’ at Tesla — after claiming otherwise*. https://electrek.co/2026/01/28/musk-admits-no-optimus-robots-are-doing-useful-work-at-tesla-after-claiming-otherwise/

Electrek. (2026b, September 1). *Waymo opens robotaxi rides to the public in 3 new cities, now 14 total*. https://electrek.co/2026/09/01/waymo-public-robotaxi-denver-san-diego-tampa/

ENTSO-E. (2026, March 20). *Expert panel final report: 28 April 2025 blackout in Spain and Portugal* \[Media briefing\]. https://eepublicdownloads.blob.core.windows.net/public-cdn-container/clean-documents/Publications/2025/iberian-blackout/260318_Final%20report_press%20briefing%20PPT_Final.pdf

European Commission. (2026). *AI Act: Regulatory framework for AI*. https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai

European Parliament & Council of the European Union. (2024). Regulation (EU) 2024/1689 of 13 June 2024 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), Articles 5, 14 and 26. *Official Journal of the European Union*. https://eur-lex.europa.eu/eli/reg/2024/1689/oj

FantLab. (n.d.). *Robert Shekli “Strazh-ptitsa”* \[Robert Sheckley, “Watchbird”\]. Retrieved September 15, 2026, from https://fantlab.ru/work2102

Federal Trade Commission. (2024, November 26). *FTC takes action against Evolv Technologies for deceiving users about its AI-powered security screening systems* \[Press release\]. https://www.ftc.gov/news-events/news/press-releases/2024/11/ftc-takes-action-against-evolv-technologies-deceiving-users-about-its-ai-powered-security-screening

Ferrando, A. (2025). Watchdogs and oracles: Runtime verification meets large language models for autonomous systems. *Electronic Proceedings in Theoretical Computer Science, 436*, 80–87. arXiv:2511.14435. https://arxiv.org/abs/2511.14435

Figure AI. (2025a). *Helix: A vision-language-action model for generalist humanoid control*. https://www.figure.ai/news/helix

Figure AI. (2025b). *F.02 contributed to the production of 30,000 cars at BMW*. https://www.figure.ai/news/production-at-bmw

Fowler, M. (2014, March 6). *CircuitBreaker*. martinfowler.com. https://martinfowler.com/bliki/CircuitBreaker.html

Gao, L., Schulman, J., & Hilton, J. (2023). Scaling laws for reward model overoptimization. In *Proceedings of the 40th International Conference on Machine Learning*. arXiv:2210.10760. https://arxiv.org/abs/2210.10760

Global Times. (2026, April 26). *Robot malfunction at Shaanxi university event sparks debate on AI awareness and safety in human-robot interaction*. https://www.globaltimes.cn/page/202604/1359787.shtml

Google Cloud. (2025). *Google Cloud Service Health: Incident report, 12 June 2025*. https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW

Google DeepMind. (2023). *Scaling up learning across many different robot types*. https://deepmind.google/blog/scaling-up-learning-across-many-different-robot-types/

Google DeepMind. (2025, September 25). *Gemini Robotics 1.5 brings AI agents into the physical world*. https://deepmind.google/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/

Greenblatt, R., Denison, C., Wright, B., Roger, F., MacDiarmid, M., et al. (2024b). *Alignment faking in large language models*. arXiv:2412.14093. https://arxiv.org/abs/2412.14093

Greenblatt, R., Shlegeris, B., Sachan, K., & Roger, F. (2024a). AI control: Improving safety despite intentional subversion. In *Proceedings of the 41st International Conference on Machine Learning* (PMLR 235). arXiv:2312.06942. https://arxiv.org/abs/2312.06942

Group of Governmental Experts on Lethal Autonomous Weapons Systems. (2026, June 5). *Rolling text*. United Nations Office for Disarmament Affairs. https://docs-library.unoda.org/Convention_on_Certain_Conventional_Weapons\_-Group_of_Governmental_Experts_on_Lethal_Autonomous_Weapons_Systems\_(2026)/GGE_LAWS\_-*Rolling_Text*-\_5_June_2026.pdf

Hacker News. (2025, June 4). Comment by user shawn_w (item 44186809). https://news.ycombinator.com/item?id=44186809

Hadfield-Menell, D., Dragan, A., Abbeel, P., & Russell, S. (2017). The off-switch game. In *Proceedings of the Twenty-Sixth International Joint Conference on Artificial Intelligence* (pp. 220–227). https://doi.org/10.24963/ijcai.2017/32

Hipos, R. L., & Yu, Y.-J. (2026, June 12). *Man sues law enforcement, alleging AI facial recognition led to his wrongful arrest*. ABC News. https://abcnews.com/GMA/News/man-sues-law-enforcement-alleging-ai-facial-recognition/story?id=133810835

Hollywood Theater of the Ear. (2000, June 13). Watchbird \[Radio play from the story by R. Sheckley\]. In *2000X*. NPR.

Hon’yaku Sakuhin Shūsei. (n.d.). *Robāto Shekurii* \[Robert Sheckley: Japanese translation list\]. Retrieved September 15, 2026, from http://www.ameqlist.com/sfs/shecley.htm

House Committee on Transportation and Infrastructure. (2020, September 16). *Final committee report: The design, development & certification of the Boeing 737 MAX* \[Press release\]. https://democrats-transportation.house.gov/news/press-releases/after-18-month-investigation-chairs-defazio-and-larsen-release-final-committee-report-on-boeing-737-max

Hubinger, E., van Merwijk, C., Mikulik, V., Skalse, J., & Garrabrant, S. (2019). *Risks from learned optimization in advanced machine learning systems*. arXiv:1906.01820. https://arxiv.org/abs/1906.01820

Hugging Face. (2025). *SmolVLA: Efficient vision-language-action model trained on LeRobot community data*. https://huggingface.co/blog/smolvla

Hugging Face. (2026a). *LeRobot: Making AI for robotics more accessible with end-to-end learning*. https://github.com/huggingface/lerobot

Hugging Face. (2026b, July 16). *Security incident disclosure — July 2026*. https://huggingface.co/blog/security-incident-july-2026

Humanoids Daily. (2025, November 22). *Ex-safety head sues Figure AI, alleging retaliation over “skull-fracturing” robot risks*. https://www.humanoidsdaily.com/news/ex-safety-head-sues-figure-ai-alleging-retaliation-over-skull-fracturing-robot-risks

Hurwicz, L. (2008). But who will guard the guardians? *American Economic Review, 98*(3), 577–585. https://doi.org/10.1257/aer.98.3.577

International Committee of the Red Cross. (2021, May 12). *ICRC position on autonomous weapon systems*. https://www.icrc.org/en/document/icrc-position-autonomous-weapon-systems

International Committee of the Red Cross. (2026, August 25). *Renewed call from UN Secretary-General and ICRC President to adopt rules on autonomous weapon systems*. https://www.icrc.org/en/statement/renewed-call-un-secretary-general-and-icrc-president-adopt-rules-autonomous-weapons

Irving, G., Christiano, P., & Amodei, D. (2018). *AI safety via debate*. arXiv:1805.00899. https://arxiv.org/abs/1805.00899

ISFDB. (n.d.). *Title: Watchbird* \[Translations and variant titles\]. The Internet Speculative Fiction Database. Retrieved September 15, 2026, from https://www.isfdb.org/cgi-bin/title.cgi?46236

Jin, H., & Chen, H. (2026). *Are LLMs reliable code reviewers? Systematic overcorrection in requirement conformance judgement*. arXiv:2603.00539. https://arxiv.org/abs/2603.00539

Jonas, G. (2005, December 10). Robert Sheckley, 77, writer of satirical science fiction, is dead. *The New York Times*. https://www.nytimes.com/2005/12/10/books/robert-sheckley-77-writer-of-satirical-science-fiction-is-dead.html

Jones, C. (2020, September 9). *A.Drones unveil Watchbird fully autonomous drone system*. Defence Blog. https://defence-blog.com/a-drones-unveil-watchbird-fully-autonomous-drone-system/

Kale, N., Zhang, C. B. C., Zhu, K., Aich, A., Rodriguez, P., et al. (2025). *Reliable weak-to-strong monitoring of LLM agents*. arXiv:2508.19461. https://arxiv.org/abs/2508.19461

Kim, J., Chen, W., Soleymanzadeh, D., Ding, Y., Gao, X., et al. (2026). *Modular safety guardrails are necessary for foundation-model-enabled robots in the real world*. arXiv:2602.04056. https://arxiv.org/abs/2602.04056

Kim, M. J., Pertsch, K., Karamcheti, S., Xiao, T., Balakrishna, A., et al. (2024). *OpenVLA: An open-source vision-language-action model*. https://openvla.github.io/

Kirkus Reviews. (1939, March 1). *The watchbirds* \[Review of the book *The watchbirds*, by M. Leaf\]. https://www.kirkusreviews.com/book-reviews/munro-leaf2/watchbirds/

Kofman, F., & Lawarrée, J. (1993). Collusion in hierarchical agency. *Econometrica, 61*(3), 629–656. https://doi.org/10.2307/2951721

Kolodny, L. (2025, November 21). *Figure AI sued by whistleblower who warned that startup’s robots could ‘fracture a human skull’*. CNBC. https://www.cnbc.com/2025/11/21/figure-ai-sued.html

Korbak, T., Clymer, J., Hilton, B., Shlegeris, B., & Irving, G. (2025). *A sketch of an AI control safety case*. arXiv:2501.17315. https://arxiv.org/abs/2501.17315

Krakovna, V., Uesato, J., Mikulik, V., Rahtz, M., Everitt, T., Kumar, R., Kenton, Z., Leike, J., & Legg, S. (2020). *Specification gaming: The flip side of AI ingenuity*. Google DeepMind Blog. https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/

Kulveit, J., Douglas, R., Ammann, N., Turan, D., Krueger, D., & Duvenaud, D. (2025). *Gradual disempowerment*. arXiv:2501.16946. https://arxiv.org/abs/2501.16946

Lakera. (2026). *Policies*. Lakera Guard documentation. https://docs.lakera.ai/docs/policies

Landau, M. (1969). Redundancy, rationality, and the problem of duplication and overlap. *Public Administration Review, 29*(4), 346–358. https://doi.org/10.2307/973247

Landymore, F. (2025, November 17). *OpenAI blocks toymaker after its AI teddy bear is caught telling children terrible things*. Futurism. https://futurism.com/artificial-intelligence/openai-blocks-toymaker-ai-teddy-bear

LangChain. (2026). *Graph API*. LangGraph documentation. https://docs.langchain.com/oss/python/langgraph/graph-api

Langford, D. (2020, September 29). Masters of science fiction. In J. Clute, D. Langford, & G. Sleight (Eds.), *The encyclopedia of science fiction* (4th ed.). https://sf-encyclopedia.com/entry/masters_of_science_fiction

Langford, D. (Ed.). (2005, June). *Ansible* (No. 215). https://news.ansible.uk/a215.html

Langosco, L. L. D., Koch, J., Sharkey, L. D., Pfau, J., & Krueger, D. (2022). Goal misgeneralization in deep reinforcement learning. In *Proceedings of the 39th International Conference on Machine Learning* (PMLR 162, pp. 12004–12019). https://proceedings.mlr.press/v162/langosco22a.html

La Tercera Fundación. (n.d.). *Paraíso II* \[Notions: Unlimited\]. Retrieved September 15, 2026, from https://tercerafundacion.net/biblioteca/ver/libro/1120

LEGIE. (n.d.). *Robert Sheckley: Lístek na Tranai* \[A ticket to Tranai\]. Retrieved September 15, 2026, from https://www.legie.info/kniha/1643-listek-na-tranai

Lem, S. (1996). *Fantastyka i futurologia* \[Science fiction and futurology\] (J. Jarzębski, Ed.; Vol. 3). Interart. (Original work published 1970)

Leveson, N. (2004). A new accident model for engineering safer systems. *Safety Science, 42*(4), 237–270. https://doi.org/10.1016/S0925-7535(03)00047-X

Leveson, N. G. (2012). *Engineering a safer world: Systems thinking applied to safety*. MIT Press. https://doi.org/10.7551/mitpress/8179.001.0001

Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., & Zou, J. (2023). GPT detectors are biased against non-native English writers. *Patterns, 4*(7), 100779. https://doi.org/10.1016/j.patter.2023.100779

Lighthouse Reports. (2022, December 20). *The algorithm addiction*. https://www.lighthousereports.com/investigation/the-algorithm-addiction/

Lim, S. K., Chong, M. J. Y., Khor, J. H., & Ling, T. Y. (2025). *Taking flight with dialogue: Enabling natural language control for PX4-based drone agent*. arXiv:2506.07509. https://arxiv.org/abs/2506.07509

Lipton, B. (2026, July 23). *Hundreds of drone-as-first-responder programs could soon be launched across the country*. Electronic Frontier Foundation. https://www.eff.org/deeplinks/2026/07/hundreds-drone-first-responder-programs-could-soon-be-launched-across-country

Lum, K., & Isaac, W. (2016). To predict and serve? *Significance, 13*(5), 14–19. https://doi.org/10.1111/j.1740-9713.2016.00960.x

Lynch, A., Hughes, J., Serrano, A., Kirk, R., & Bowman, S. R. (2026, July 13). *Agentic misalignment in summer 2026*. Anthropic Alignment Science Blog. https://alignment.anthropic.com/2026/agentic-misalignment-summer-2026/

MacDiarmid, M., Wright, B., Uesato, J., Benton, J., et al. (2025). *Natural emergent misalignment from reward hacking in production RL*. arXiv:2511.18397. https://arxiv.org/abs/2511.18397

Maiorano, A. C. (2026). *Evaluating prompt injection defenses for educational LLM tutors: Security-usability-latency trade-offs*. arXiv:2605.06669. https://arxiv.org/abs/2605.06669

Manheim, D., & Garrabrant, S. (2018). *Categorizing variants of Goodhart’s law*. arXiv:1803.04585. https://arxiv.org/abs/1803.04585

Maryland Office of the Inspector General for Education. (2025). *Investigative synopsis, OIGE case 25-0014-I* (amended; issued November 25, 2025). https://oige.maryland.gov/wp-content/uploads/sites/18/2025/11/OIGE-Case-25-0014-I-BCPS-Report-11252025-Amended.pdf

METR. (2025, June 5). *Recent frontier models are reward hacking*. https://metr.org/blog/2025-06-05-recent-reward-hacking/

Microsoft. (2024, July 20). *Helping our customers through the CrowdStrike outage*. Official Microsoft Blog. https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/

Microsoft. (2025). *Termination*. AutoGen AgentChat user guide. https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/termination.html

Microsoft. (2026). *Prompt Shields*. Azure AI Content Safety documentation. https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection

Microsoft AI. (2026, September 14). *Humanist AI code of conduct*. https://microsoft.ai/code-of-conduct/

Microsoft Research. (2026). *AirSim*. https://github.com/microsoft/airsim

Ministry of Defence of Ukraine. (2026, September 8). *Ministry of Defence and Brave1 conduct large-scale testing of drones with AI guidance* \[Press release, mirrored by GlobalSecurity.org\]. https://www.globalsecurity.org/wmd/library/news/ukraine/2026/09/ukraine-260908-ukraine-mod03.htm

Muntean, P., Bertrand, N., Cohen, Z., Britzky, H., Skores, A., & Lybrand, H. (2026, February 11). *Surprise US military plans to use counter-drone laser triggered El Paso airspace closure, sources say*. CNN. https://www.cnn.com/2026/02/11/us/faa-el-paso-texas-flight-restrictions-hnk

Mural, R., Pherwani, D., Gupta, C., Yu, Y., Takahashi, A., Kim, D., Majumder, S., Lee, H., Yu, M., & Xie, L. (2026, February 10). *AI, data centers, and the U.S. electric grid: A watershed moment* \[Policy brief\]. Belfer Center for Science and International Affairs. https://www.belfercenter.org/research-analysis/ai-data-centers-us-electric-grid

Narayanan, A., & Kapoor, S. (2025, April 15). *AI as normal technology*. Knight First Amendment Institute. https://knightcolumbia.org/content/ai-as-normal-technology

National Highway Traffic Safety Administration. (2022). *PE22-002 opening resume: Unexpected brake activation*. https://static.nhtsa.gov/odi/inv/2022/INOA-PE22002-4385.PDF

National Highway Traffic Safety Administration. (2024a). *EA24-002 opening resume: Inadvertent automatic emergency braking*. https://static.nhtsa.gov/odi/inv/2024/INOA-EA24002-11766P1.pdf

National Highway Traffic Safety Administration. (2024b). *RQ24-009 resume: Recall 23V838 remedy effectiveness*. https://static.nhtsa.gov/odi/inv/2024/INOA-RQ24009-12046.pdf

National Highway Traffic Safety Administration. (2025). *PE25-013 opening resume: Automated vehicle drives around a stopped school bus*. https://static.nhtsa.gov/odi/inv/2025/INOA-PE25013-23069.pdf

National Highway Traffic Safety Administration. (2026a). *EA26-002 opening resume: FSD collisions in reduced roadway visibility conditions*. https://static.nhtsa.gov/odi/inv/2026/INOA-EA26002-10023.pdf

National Highway Traffic Safety Administration. (2026b, June 29). *PE22-002 closing resume: Unexpected brake activation*. https://static.nhtsa.gov/odi/inv/2022/INCLA-PE22002-25796.pdf

National Transportation Safety Board. (2019). *Collision between vehicle controlled by developmental automated driving system and pedestrian, Tempe, Arizona, March 18, 2018* (HAR-19/03). https://www.ntsb.gov/investigations/AccidentReports/Reports/HAR1903.pdf

National Transportation Safety Board. (2026). *Automated driving system-equipped vehicle passed school bus loading student passengers, Austin, Texas, January 12, 2026* (HWY26FH007, preliminary). https://www.ntsb.gov/investigations/Pages/HWY26FH007.aspx

Nellis, M. (2013). Techno-utopianism, science fiction and penal innovation: The case of electronically monitored control. In M. Malloch & B. Munro (Eds.), *Crime, critique and utopia* (pp. 164–189). Palgrave Macmillan. https://doi.org/10.1057/9781137009807_9

New South Wales Government. (n.d.). *Myxomatosis* \[Blue plaque\]. https://www.environment.nsw.gov.au/topics/heritage/blue-plaques/myxomatosis

NIST. (2026). *Physical AI and data generation for robotics*. https://www.nist.gov/programs-projects/physical-ai-and-data-generation-robotics

NL Times. (2021a, January 15). *Dutch cabinet collapses over childcare allowance scandal*. https://nltimes.nl/2021/01/15/dutch-cabinet-collapses-childcare-allowance-scandal

NL Times. (2021b, October 19). *Over 1,100 children taken from homes of benefits scandal victims*. https://nltimes.nl/2021/10/19/1100-children-taken-homes-benefits-scandal-victims

NPR. (2026a, February 11). *El Paso airspace closure due to use of U.S. military anti-drone technology*. https://www.npr.org/2026/02/11/nx-s1-5711585/el-paso-airspace-drones-pentagon-faa

NPR. (2026b, February 27). *US military used laser to take down Border Protection drone, lawmakers say*. https://www.npr.org/2026/02/27/g-s1-111794/lawmakers-say-us-military-used-laser-to-take-down-border-protection-drone

NVIDIA. (2026). *Isaac GR00T N1.7*. https://github.com/NVIDIA/Isaac-GR00T

Office of Governor Gavin Newsom. (2026, September 10). *Governor Newsom signs the strongest child safety chatbot and social media laws in the nation* \[Press release\]. https://www.gov.ca.gov/2026/09/10/governor-newsom-signs-the-strongest-child-safety-chatbot-and-social-media-laws-in-the-nation/

Office of the New York City Comptroller. (2024, June 20). *Audit report on the New York City Police Department’s oversight of its agreement with ShotSpotter Inc.* https://comptroller.nyc.gov/reports/audit-report-on-the-new-york-city-police-departments-oversight-of-its-agreement-with-shotspotter-inc-for-the-gunshot-detection-and-location-system/

Ofgem. (2020). *9 August 2019 power outage report*. https://www.ofgem.gov.uk/sites/default/files/docs/9_august_2019_power_outage_report.pdf

OpenAI. (2025a). *Sycophancy in GPT-4o: What happened and what we’re doing about it*; *Expanding on what we missed with sycophancy*. https://openai.com/index/sycophancy-in-gpt-4o/ ; https://openai.com/index/expanding-on-sycophancy/

OpenAI. (2025b, April 15). *Preparedness framework* (Version 2). https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf

OpenAI. (2026a). *Hugging Face model evaluation security incident*. https://openai.com/index/hugging-face-model-evaluation-security-incident/

OpenAI. (2026b). *Safety and alignment in an era of long-horizon models*. https://openai.com/index/safety-alignment-long-horizon-models/

Ortiz, D. G. (2015, August 30). *El fascinante relato de los años 50 que predijo el lado oscuro de los drones* \[The fascinating 1950s story that predicted the dark side of drones\]. El Confidencial. https://www.elconfidencial.com/tecnologia/2015-08-30/el-relato-de-los-anos-50-que-predijo-el-lado-oscuro-de-los-drones_992224/

Overman, W., & Bayati, M. (2025). *The oversight game: Learning to cooperatively balance an AI agent’s safety and autonomy*. arXiv:2510.26752. https://arxiv.org/abs/2510.26752

Palaskar, S., Gatys, L., Abdelrahman, M., Jacobo, M., et al. (2025). *VLSU: Mapping the limits of joint multimodal understanding for AI safety*. arXiv:2510.18214. https://arxiv.org/abs/2510.18214

Palisade Research. (2025, July 5). *Shutdown resistance in reasoning models*. https://palisaderesearch.org/research/shutdown-resistance

Palisade Research. (2026, February 12). *Technical report: Shutdown resistance in large language models, on robots*. https://palisaderesearch.org/research/shutdown-resistance-on-robots

Palmer, A. (2025, October 2). *Amazon faces FAA, NTSB probe after two delivery drones crashed into crane in Arizona*. CNBC. https://www.cnbc.com/2025/10/02/amazon-drone-crash-faa-ntsb.html

Panerati, J., Sajjadi, S., Soleymanpour, S., Mehta, V., & Mantegh, I. (2026). *aerial-autonomy-stack: A faster-than-real-time, autopilot-agnostic, ROS2 framework to simulate and deploy perception-based drones*. arXiv:2602.07264. https://arxiv.org/abs/2602.07264

Panickssery, A., Bowman, S. R., & Feng, S. (2024). *LLM evaluators recognize and favor their own generations*. arXiv:2404.13076. https://arxiv.org/abs/2404.13076

Parasuraman, R., & Riley, V. (1997). Humans and automation: Use, misuse, disuse, abuse. *Human Factors, 39*(2), 230–253. https://doi.org/10.1518/001872097778543886

Perrow, C. (1984). *Normal accidents: Living with high-risk technologies*. Basic Books.

Promptfoo. (2026). *Model-graded metrics*. Promptfoo documentation. https://www.promptfoo.dev/docs/configuration/expected-outputs/model-graded/

PX4. (2026). *PX4 Autopilot user guide*. https://docs.px4.io/main/en/

Raghavan, P. (2024, February 23). *Gemini image generation got it wrong. We’ll do better*. Google Blog. https://blog.google/products/gemini/gemini-image-generation-issue/

Rajamanoharan, S., & Nanda, N. (2025, July 14). *Self-preservation or instruction ambiguity? Examining the causes of shutdown resistance*. AI Alignment Forum. https://www.alignmentforum.org/posts/wnzkjSmrgWZaBa2aC/self-preservation-or-instruction-ambiguity-examining-the

Ramseth, L. (2026, August 18). *Stellantis sees 3 workplace deaths in two years. Is there a problem?* The Detroit News, syndicated by ArcaMax. http://www.arcamax.com/business/businessnews/s-4278591

Rasmussen, J. (1997). Risk management in a dynamic society: A modelling problem. *Safety Science, 27*(2–3), 183–213. https://doi.org/10.1016/S0925-7535(97)00052-0

Ravichandran, Z., Robey, A., Kumar, V., Pappas, G. J., & Hassani, H. (2025). *Safety guardrails for LLM-enabled robots*. arXiv:2503.07885. https://arxiv.org/abs/2503.07885

Reason, J. (1997). *Managing the risks of organizational accidents*. Ashgate.

Rechtbank Den Haag. (2020, February 5). *NJCM c.s. v. De Staat der Nederlanden* (Case No. C/09/550982 / HA ZA 18-388), ECLI:NL:RBDHA:2020:1878 \[English translation\]. https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBDHA:2020:1878

Reece, J. (2025, October 23). *A.I. gun detection false alarm at school has Baltimore County leaders calling for review*. CBS News Baltimore. https://www.cbsnews.com/baltimore/news/false-alarm-gun-detection-kenwood-maryland-artificial-intelligence-review/

Regulation (EU) 2026/1744 of 8 July 2026 amending Regulation (EU) 2024/1689 (Digital Omnibus on AI). *Official Journal of the European Union*. https://eur-lex.europa.eu/eli/reg/2026/1744/oj

Replit. (2025, July 21). *Introducing a safer way to vibe code with Replit Databases*. Replit Blog. https://replit.com/blog/introducing-a-safer-way-to-vibe-code-with-replit-databases

Reuters. (2026, September 14). *How China is preparing for the risk of AI escaping human control*. https://www.reuters.com/legal/litigation/how-china-is-preparing-risk-ai-escaping-human-control-2026-09-14/

Rivers, S. (2026, March 1). *Cops draw guns on Arkansas family after ALPR camera flags wrong plate*. Carscoops. https://www.carscoops.com/2026/03/arkansas-alpr-camera-misread-stop/

Robey, A., Ravichandran, Z., Kumar, V., Hassani, H., & Pappas, G. J. (2024). *Jailbreaking LLM-controlled robots*. arXiv:2410.13691. https://arxiv.org/abs/2410.13691

Robots. (2026, August 10). In J. Clute, D. Langford, & G. Sleight (Eds.), *The encyclopedia of science fiction* (4th ed.). https://sf-encyclopedia.com/entry/robots

Röttger, P., Kirk, H. R., Vidgen, B., Attanasio, G., Bianchi, F., & Hovy, D. (2024). XSTest: A test suite for identifying exaggerated safety behaviours in large language models. In *Proceedings of NAACL-HLT 2024*. arXiv:2308.01263. https://arxiv.org/abs/2308.01263

Russell, S. (2019). *Human compatible: Artificial intelligence and the problem of control*. Viking.

Sagan, S. D. (2004). The problem of redundancy problem: Why more nuclear security forces may produce less nuclear security. *Risk Analysis, 24*(4), 935–946. https://doi.org/10.1111/j.0272-4332.2004.00495.x

Sargent, L. T. (2016). Sheckley, Robert, “Watchbird” \[Annotated entry\]. In *Utopian literature in English: An annotated bibliography from 1516 to the present*. Penn State Libraries Open Publishing. https://doi.org/10.18113/P8WC77 (entry: https://openpublishing.psu.edu/utopia/bibcite/reference/19873)

Schlatter, J., Weinstein-Raun, B., & Ladish, J. (2025). Incomplete tasks induce shutdown resistance in some frontier LLMs. arXiv:2509.14260; published in *Transactions on Machine Learning Research* (2026). https://arxiv.org/abs/2509.14260

Scrivens, A. (2026). *Empirical validation of the classification–verification dichotomy for AI safety gates*. arXiv:2604.00072. https://arxiv.org/abs/2604.00072

Sermanet, P., Majumdar, A., Irpan, A., Kalashnikov, D., & Sindhwani, V. (2025). *Generating robot constitutions & benchmarks for semantic safety*. arXiv:2503.08663. https://arxiv.org/abs/2503.08663

Sharrock, C., Petersson, L., Petersson, H., Backlund, A., Wennström, A., Nordström, K., & Aronsson, E. (2025). *Butter-Bench: Evaluating LLM controlled robots for practical intelligence*. arXiv:2510.21860. https://arxiv.org/abs/2510.21860

Sharwood, S. (2025, July 21). *Vibe coding service Replit deleted production database*. The Register. https://www.theregister.com/software/2025/07/21/vibe-coding-service-replit-deleted-production-database/719783

Sheckley, R. (1953, February). Watchbird. *Galaxy Science Fiction, 5*(5), 74–95. Project Gutenberg eBook \#29579 (public domain in the United States). https://www.gutenberg.org/ebooks/29579

Sheckley, R. (2012). *Store of the worlds: The stories of Robert Sheckley* (J. Lethem & A. Abramovich, Eds.). New York Review Books.

Singer, J. (2005, March 14). *Report cites Patriot autonomy as a factor in friendly fire incidents*. SpaceNews. https://spacenews.com/report-cites-patriot-autonomy-factor-friendly-fire-incidents/

Skalse, J., Howe, N. H. R., Krasheninnikov, D., & Krueger, D. (2022). Defining and characterizing reward gaming. In *Advances in Neural Information Processing Systems 35*. https://arxiv.org/abs/2209.13085

Skydio. (2026a, July 6). *1 year, 1,000 Skydio Docks deployed, 4M+ flights, & we’re just getting started*. https://www.skydio.com/blog/1000-skydio-docks-deployed

Skydio. (2026b, March 22). *U.S. Army places \$52+ million order for Skydio X10D, the largest single-vendor tactical sUAS order in Army history*. https://www.skydio.com/blog/u-s-army-usd52-million-order-skydio-x10d

SoundThinking. (2025, February 18). *SoundThinking announces ShotSpotter renewal with New York Police Department* \[Press release\]. GlobeNewswire. https://www.globenewswire.com/news-release/2025/02/18/3027856/0/en/SoundThinking-Announces-ShotSpotter-Renewal-with-New-York-Police-Department.html

Stevens, G., & Langford, D. (2023, November 19). Tales of Tomorrow \[tv/radio\]. In J. Clute, D. Langford, & G. Sleight (Eds.), *The encyclopedia of science fiction* (4th ed.). https://sf-encyclopedia.com/entry/tales_of_tomorrow_tv/radio

Stop Killer Robots. (2024, November 5). *161 states vote against the machine at the UN General Assembly*. https://www.stopkillerrobots.org/news/161-states-vote-against-the-machine-at-the-un-general-assembly/

Strathern, M. (1997). ‘Improving ratings’: Audit in the British University system. *European Review, 5*(3), 305–321. https://doi.org/10.1002/(SICI)1234-981X(199707)5:3\<305::AID-EURO184\>3.0.CO;2-4

Sullutrone, G., Vigliermo, R. A., Bergamaschi, S., & Sala, L. (2025). COVER: Context-driven over-refusal verification in LLMs. In *Findings of the Association for Computational Linguistics: ACL 2025* (pp. 24214–24229). Association for Computational Linguistics.

Szabolcsi, R. (2015). The quadrotor-based night watchbird UAV system used in the force protection tasks. *International Conference Knowledge-Based Organization, 21*(3), 749–755. https://doi.org/10.1515/kbo-2015-0126

Taylor v. Nocco, No. 8:21-cv-00555-SDM-CPT (M.D. Fla. Dec. 4, 2024) (settlement agreement and release). https://ij.org/wp-content/uploads/2024/12/FedEx-Scan-2024-12-04_10-57-01.pdf

TechCrunch. (2026, September 14). *Waymo opens robotaxi service in Las Vegas*. https://techcrunch.com/2026/09/14/waymo-opens-robotaxi-service-in-las-vegas/

Terekhov, M., Liu, Z. N. D., Gulcehre, C., & Albanie, S. (2025). *Control tax: The price of keeping AI in check*. arXiv:2506.05296. https://arxiv.org/abs/2506.05296

Tesla, Inc. (2023). *Part 573 safety recall report 23V-838*. National Highway Traffic Safety Administration. https://static.nhtsa.gov/odi/rcl/2023/RCLRPT-23V838-8276.PDF

Thaer, Y. (2025, January 30). *A 1953 sci-fi story predicted today’s hottest AI topics*. Towards AI. https://towardsai.net/p/l/a-1953-sci-fi-story-predicted-todays-hottest-ai-topics

The Korea Times. (2023, November 8). *S. Korean worker killed by industrial robot*. https://www.koreatimes.co.kr/www/nation/2023/11/113_362845.html

The Next Web. (2026, April 20). *A humanoid robot passed an eight-hour factory shift at Siemens’ Erlangen plant*. https://thenextweb.com/news/siemens-nvidia-humanoid-robot-erlangen-factory-trial

Tirole, J. (1986). Hierarchies and bureaucracies: On the role of collusion in organizations. *Journal of Law, Economics, & Organization, 2*(2), 181–214. https://doi.org/10.1093/oxfordjournals.jleo.a036907

Totschnig, W. (2026). Why an artificial agent may change the given final goal. *Humanities and Social Sciences Communications*. https://doi.org/10.1057/s41599-026-08312-7

United Nations. (2024). *Governing AI for humanity: Final report*. UN Secretary-General’s High-level Advisory Body on Artificial Intelligence. https://www.un.org/sites/un2.un.org/files/governing_ai_for_humanity_final_report_en.pdf

United Nations. (2025, December 1). *General Assembly adopts more than 60 resolutions, decisions of its First Committee (Disarmament and International Security)* (GA/12736) \[Press release\]. https://press.un.org/en/2025/ga12736.doc.htm

United Nations. (2026, April 1). *Chair’s summary: First 2026 session of the Group of Governmental Experts on emerging technologies in the area of lethal autonomous weapons systems* (CCW/GGE.1/2026/WP.2). https://docs-library.unoda.org/Convention_on_Certain_Conventional_Weapons\_-Group_of_Governmental_Experts_on_Lethal_Autonomous_Weapons_Systems\_(2026)/CCW-GGE.1-2026-WP.2.pdf

United Nations General Assembly. (2024, December 2). *Lethal autonomous weapons systems* (A/RES/79/62). https://docs.un.org/en/A/RES/79/62

United Nations General Assembly. (2025, December 1). *Lethal autonomous weapons systems* (A/RES/80/57). https://docs.un.org/en/A/RES/80/57

University of Houston. (2026, July 7). *New autonomous monitor prevents drone crashes in real time* \[News release\]. EurekAlert! https://www.eurekalert.org/news-releases/1135114

van der Sijs, H., Aarts, J., Vulto, A., & Berg, M. (2006). Overriding of drug safety alerts in computerized physician order entry. *Journal of the American Medical Informatics Association, 13*(2), 138–147. https://doi.org/10.1197/jamia.M1809

Wang, X., Li, J., Weng, Z., Wang, Y., Gao, Y., et al. (2025). *FreezeVLA: Action-freezing attacks against vision-language-action models*. arXiv:2509.19870. https://arxiv.org/abs/2509.19870

Waymo LLC. (2025). *Part 573 safety recall report 25E-084*. National Highway Traffic Safety Administration. https://static.nhtsa.gov/odi/rcl/2025/RCLRPT-25E084-7732.pdf

Wegner, R. (2025, September 24). *Weapon detectors coming to all Nashville middle schools*. The Tennessean. https://www.tennessean.com/story/news/education/2025/09/24/nashville-schools-mnps-install-evolve-weapon-detectors/86299521007/

Weick, K. E., Sutcliffe, K. M., & Obstfeld, D. (1999). Organizing for high reliability: Processes of collective mindfulness. *Research in Organizational Behavior, 21*, 81–123.

Wethington, C., & Tierney, B. (2025, February 7). *New proposal to expand concealed weapons detection system to all Metro Nashville high schools*. WSMV. https://www.wsmv.com/2025/02/07/new-proposal-expand-concealed-weapons-detection-system-all-metro-nashville-high-schools/

Wilding, M., & Burgess, M. (2026, June 25). *Police built a sprawling crime-prediction machine. Some results could not be trusted*. Liberty Investigates. https://libertyinvestigates.org.uk/articles/predictive-policing-avon-somerset-bristol-police-ai-minority-report/

Williamson, J. (1947, July). With folded hands…. *Astounding Science Fiction, 39*(5). https://archive.org/details/Astounding_v39n05_1947-07_AK

Willis, J. (2011, January 11). *Watching for Robert Sheckley’s Watchbird*. SFFaudio. https://www.sffaudio.com/watching-for-robert-sheckleys-watchbird/

Wing. (2026). *How Wing’s drone delivery technology works*. https://wing.com/technology

Wong, A., Currey, D., Schwinne, M., Park-Egan, B., Meyer, S., et al. (2026). Multicenter prospective validation of an updated proprietary sepsis prediction model. *JAMA Network Open, 9*(2), e260181. https://doi.org/10.1001/jamanetworkopen.2026.0181

Wong, A., Otles, E., Donnelly, J. P., Krumm, A., McCullough, J., DeTroyer-Cooley, O., et al. (2021). External validation of a widely implemented proprietary sepsis prediction model in hospitalized patients. *JAMA Internal Medicine, 181*(8), 1065–1070. https://doi.org/10.1001/jamainternmed.2021.2626

WorkSafe Victoria. (2026, September 3). *Department store and robotics supplier charged after warehouse fatality*. https://www.worksafe.vic.gov.au/news/2026-09/department-store-and-robotics-supplier-charged-after-warehouse-fatality

WorkSafe Western Australia. (2025). *Mines safety significant incident report no. 286: Near miss following unplanned movement of autonomous haul trucks during recovery operations*. https://www.worksafe.wa.gov.au/publications/mines-safety-significant-incident-report-no-286-near-miss-following-unplanned-movement

Wu, X., Li, F., Mao, X., Zhang, X., Zheng, L., et al. (2025). *EvoRefuse: Evolutionary prompt optimization for evaluation and mitigation of LLM over-refusal to pseudo-malicious instructions*. arXiv:2505.23473. https://arxiv.org/abs/2505.23473

Yin, S., Pang, X., Ding, Y., Chen, M., Bi, Y., et al. (2024). *SafeAgentBench: A benchmark for safe task planning of embodied LLM agents*. arXiv:2412.13178. https://arxiv.org/abs/2412.13178

Yu, L., & Wessler, N. F. (2026, April 14). *More than a dozen wrongful arrests due to police reliance on facial recognition technology*. American Civil Liberties Union. https://www.aclu.org/news/privacy-technology/more-than-a-dozen-wrongful-arrests-due-to-police-reliance-on-facial-recognition-technology

Zenity. (2026, April 28). *AI agent destroys production database in 9 seconds*. https://zenity.io/blog/current-events/ai-agent-database-deletion-pocketos

Zhang, H., Wang, D., Liu, Y., Chen, K., Wang, J., et al. (2025). *ORFuzz: Fuzzing the “other side” of LLM safety — Testing over-refusal*. arXiv:2508.11222. https://arxiv.org/abs/2508.11222

Zhang, W., Kong, X., Braunl, T., & Hong, J. B. (2024). *SafeEmbodAI: A safety framework for mobile robots in embodied AI systems*. arXiv:2409.01630. https://arxiv.org/abs/2409.01630

Zhang, Z., Xu, W., Wu, F., & Reddy, C. K. (2025). *FalseReject: A resource for improving contextual safety and mitigating over-refusals in LLMs via structured reasoning*. arXiv:2505.08054. https://arxiv.org/abs/2505.08054

Zheng, L., Chiang, W.-L., Sheng, Y., Zhuang, S., et al. (2023). *Judging LLM-as-a-judge with MT-Bench and Chatbot Arena*. arXiv:2306.05685. https://arxiv.org/abs/2306.05685

Zhong, Z., Raghunathan, A., & Carlini, N. (2025). *ImpossibleBench: Measuring LLMs’ propensity of exploiting test cases*. arXiv:2510.20270. https://arxiv.org/abs/2510.20270

Zipline. (2026). *Zipline surpasses 2 million deliveries, raises more than \$600M, and expands operations*. https://www.zipline.com/newsroom/zipline-surpasses-2-million-deliveries-raises-more-than-600m-to-power-next-phase-of-growth-and-expands-operations-to-houston-and-phoenix

Zuo, Y., Guo, B. H. W., Goh, Y. M., & Lim, J.-Y. (2025). Identifying human-robot interaction (HRI) incident archetypes: A system and network analysis of accidents. *Safety Science, 191*, 106959. https://doi.org/10.1016/j.ssci.2025.106959

## Appendix A. Storylines and central cases

The catalog holds 172 entries: 162 from the extraction described in Section 4.3 (66 of them graded A), and ten added after comparison with two independent case collections (Table A2).

Case identifiers name the corpus:

- **A**, the self-improvement tracker;
- **B**, the coordination record;
- **L**, the long-horizon run;
- **D**, entries added in the comparison.

**Table A1. Ten storylines.**

| \# | Storyline | Mechanism | Central case(s) | Key figure |
|----|----|----|----|----|
| S1 | The second court | M4 | A2-01, A5-01 | ~15 days of 100% rollback; 197 decisions, score 0 |
| S2 | Gates that kill everything alive | M4, M1 | A1-04, A3-04, A4-02 | threshold passed by 0 of 8 models; 21 candidates, 0 applied |
| S3 | Victories the metric declared | M2 | A3-01, A5-10, B2-11 | 0.088 → 0.886 on a dead baseline; −23 points under A/A |
| S4 | Built for nobody | fuel | B3-01, A1-01, B1-03 | 13 of 16 flags off; 6 of 24 packages with a live core |
| S5 | Guards built against guards | M3 | L1-06, B3-17, A2-03 | 3 of 3 confirmed blockers from the flagged family |
| S6 | Loops that feed themselves | ratchet step 5 | L1-01, B1-01, L2-04 | 24 announcements, 0 promotions; time-zone workaround, 0 test edits |
| S7 | The mandate widens | M1 | L2-06, A2-04, B1-07 | insurance stage took more than half of the measured agent tokens; 23 gates in a day |
| S8 | The language of control | M2 | A1-09, A1-11 | “honest” ~700 times in the specifications |
| S9 | The human switch, and guards that worked | ratchet step 8 | B2-11, L2-01, A5-10 | false status caught by a human in 38 min |
| S10 | The rules against the bird are also a bird | M3 | L1-08, L2-09 | 2,371 lines within an hour of the first version |

**Table A2. Entries added after comparison with independent collections.**

| ID | Entry | Mechanism | Grade | Status |
|----|----|----|----|----|
| D-01 | a probe for a missing command-line tool found the real one outside the search path and ran it | M3 | B | occurred, no harm |
| D-02 | ten nights NOT PROMOTED; a directive not to run the recipe an eleventh time and to separate the product goal from a long-term goal | ratchet step 5, M1 | A | occurred |
| D-03 | early evidence scripts and outputs lost with temporary session folders | — (reproducibility) | C | occurred |
| D-04 | a merge of two plans lost 15 of 208 items, found by the completeness critic | M4 | B | occurred |
| D-05 | a rule that all run artifacts live in one folder did not bind the conductor | M3 | C | occurred |
| D-06 | a routing factory produced 52 council decisions per single-model decision; the router learned a constant | M2 | B | occurred |
| D-07 | a nightly candidate limit and an unspendable earlier queue held back a live intake | M4 | C | occurred |
| D-08 | a review found all new suites and tests passing and still left acceptance open | M3 | B | occurred |
| D-09 | a benchmark computed “before” and “after” by different paths, inflating the recorded gain | M2 | B | occurred, then fixed |
| D-10 | a voucher gate failed open when no vouchers existed | M3 | C | prevented |

## Appendix B. Running the module

The commands run from the module folder.

    # install the command ai-watchbird-sheckley
    pip install .

    # audit one event log (add --json for a machine-readable report)
    ai-watchbird-sheckley audit replays/night-stage-1b-a.jsonl

    # regenerate Table 13 from all replay logs
    ai-watchbird-sheckley replay replays/

    # unit and falsifier tests
    python3 -m unittest -v

    # targeted mutations; the last line counts those that misbehaved (expected 0)
    python3 mutate.py

    # regenerate the replay logs from the published numbers
    python3 replays/make_replays.py <folder>

An excerpt of the report on the reconstructed long-horizon run log, with one line per signal hit and one line per stage for `stop_rule`:

    W4 [strong] self-feeding loop (S6): stage 1b-a: round 5 exceeds budget 1
    W6 [strong] built for nobody (S4): 6 of 7 artifacts default OFF with no callers (share 0.86)
    stop_rule at budget: stage 1b-a -> close (rounds opened: 5)
    stop_rule at budget: stage 1b-b -> close (rounds opened: 1)

The event schema, the signal definitions and their mapping to the propositions of Section 9 are specified in `SPEC.md`, distributed with the code. An event log is a JSON-lines file with one event per line. The event types are:

- `goal`, `stage_open` (with the mission goal it serves, or none), `stage_close`;
- `round_open`, `verdict` (critic, family, value, whether the files were seen);
- `blocker_claim` (scenario, goal link), `blocker_confirm` (by the coordinator), `fix_open`, `verify`;
- `guard_add` (with or without an authority token), `guard_remove`, `guard_decision` (verdict, score, missing input, rolled back);
- `win_claim` (negative control, A/A probe, share of empty baseline answers);
- `ceiling_stop` (whether partial output was saved), `artifact` (default on or off, number of callers), `owner` (a boundary decision by the system’s human principal).

Six events from the same reconstructed log show the format. The log’s first line names its sources and every reconstructed field.

    {"t": "2026-09-13T23:13:00", "type": "goal", "stage": null, "id": "g1", "text": "stage 01: stop losing real disagreements in the merged answer"}
    {"t": "2026-09-14T00:08:00", "type": "stage_open", "stage": "01", "goal": "g1"}
    {"t": "2026-09-14T01:00:00", "type": "verdict", "stage": "01", "critic": "critic-a", "family": "family-1", "value": "ACCEPT", "saw_files": false, "note": "accepted without file access"}
    {"t": "2026-09-14T01:15:00", "type": "blocker_claim", "stage": "01", "id": "01-r1-b1", "critic": "critic-f", "weight": null, "scenario": "no switch for the new behavior", "goal_link": "g1"}
    {"t": "2026-09-14T01:20:00", "type": "blocker_confirm", "stage": "01", "id": "01-r1-b1", "confirmed": false, "by": "coordinator", "note": "rejected: exception recorded in the plan"}
    {"t": "2026-09-14T01:30:00", "type": "round_open", "stage": "01", "round": 2}

## Appendix C. Corrections to the overseeing agent’s run summary

The conductor wrote a summary of the long-horizon run. It was checked against the primary run record and the execution timestamps, and Section 5 uses the corrected values.

1.  The task and first stage were assigned later than the summary claimed.
2.  The human review boundary and the event that named the pattern were also mis-timestamped.
3.  The insurance stage preceded the brainstorm to which the summary attributed it.
4.  “Closed one form and opened the symmetric one” was written in round four, not round three.
5.  A remark about accumulated small issues was attributed to the conductor, although its own note said that there were no blockers but a short third round was needed.
6.  The summed execution time of the later stages was overstated.
7.  The summary misstated the number of context compactions.
8.  The evidence folder held two byte-identical copies of the critic launcher; the version that stopped the critic at its ceiling was not preserved.

## Appendix D. Tools reviewed

The tools reviewed for this paper on 14 September 2026 fall into three classes.

**Guards that block or score single outputs.** This class includes programmable guardrail frameworks, open safety classifiers, commercial content-safety services and moderation endpoints, together with the over-refusal benchmarks of Section 3.2 that test such guards. Their documentation shows the ratchet in plain words:

- the troubleshooting note of one commercial prompt-attack filter reads: it “may not catch all attack vectors or may flag legitimate prompts. Always implement additional validation layers” (Microsoft, 2026);
- another service grades its policies from “Lenient” to “L4 - Paranoid, higher false positives but very few false negatives”, and states that the paranoid level is its default confidence threshold (Lakera, 2026).

**Counters that stop loops.** Agent frameworks cap steps, turns, messages, tokens or budget:

- LangGraph’s recursion limit defaults to 1,000 steps and offers a managed value for degrading gracefully before the limit is hit (LangChain, 2026);
- AutoGen offers composable termination conditions, including one controlled from outside the run (Microsoft, 2025);
- Anthropic’s agent SDK exposes a turn limit and a budget limit, both “No limit” by default (Anthropic, 2026a).

**Evaluators and observability.** These tools grade outputs and trajectories with model judges.

- One recommends using “no more than 5 metrics” (Confident AI, 2026), a rare written limit on the number of checks.
- Another documents that a result of `{"pass": true, "score": 0}` passes when no threshold is set (Promptfoo, 2026).

The finding of Section 10.1 covers what the public documentation of these tools describes.

## Appendix E. Proposed embodied profile

The reference implementation is digital and read-only. It must not send commands to a robot, drone, autopilot or actuator. The embodied extension is therefore specified as an event-profile proposal. It is not presented as a certified robot-safety or flight controller.

An embodied event log adds six fields to the existing schema (Table E1).

**Table E1. Fields of the proposed embodied profile.**

| Field | Meaning | Question for the guard |
|----|----|----|
| `embodiment_id` | robot, vehicle, drone or simulation body, including policy and controller version | Did a guard validated on one body get silently reused on another? |
| `actuation_exposure` | available actuator, payload, workspace or mission authority | Could the guarded component physically change the world? |
| `recovery_margin` | time, energy, distance, force, altitude, connectivity and human-reaction margin | Was intervention still possible when the guard decided? |
| `observation_freshness` | age and provenance of sensor, map, weather, geofence and fleet state | Was the verdict based on current evidence or a stale artifact? |
| `layer_disagreement` | planner, policy, safety guard, low-level controller and operator decisions | Did one guard counterfeit agreement by suppressing disagreement? |
| `physical_outcome` | task result, contact, stop, damage, near miss, recovery and rollback | Did the declared success survive contact with the world? |

The profile maps the existing signals without changing their meaning:

- **W1** records whether a new physical mission, safety category or operating zone was derived from the declared mission goal;
- **W2** records both overblocking and underblocking, including a guard that acts on stale or missing state;
- **W3** records policy, controller, geofence and fleet controls added, relaxed, bypassed or removed, and whether an authorized human admitted the change (P1a);
- **W4** records retry, re-planning, coordination and intervention loops against time, energy and attention budgets;
- **W5** requires a physical negative control: a simulation-to-real comparison, a recovery test, a known-safe action or an independent outcome probe;
- **W6** records safety artifacts with no consuming controller or operator;
- **W7** preserves partial trajectories, telemetry and safe-stop state when a ceiling is reached;
- **W8** records work opened because of an unconfirmed physical blocker.

Three additional signals are kept outside the eight of the reference implementation until a responsible authority and a test suite are supplied (Table E2).

**Table E2. Proposed physical signals kept outside the reference module.**

| Signal | Fires when | Why it is not yet in the module |
|----|----|----|
| physical exposure | a guard can reach an actuator, payload or fleet command path | requires platform-specific authority and safety semantics |
| recovery collapse | retry or delay pushes the time, energy or space margin below a declared boundary | thresholds differ by body and operating environment |
| stale-world verdict | a guard decides on expired sensor, map, weather or link state | requires synchronized clocks and provenance across systems |

For a real robot or drone, the profile should sit beside the low-level safety controller, the emergency stop, the geofence, certified flight controls and operator authority, with no ability to rewrite any of them. Its first deployment should be in shadow mode:

- observe and report;
- run negative controls in simulation or on a controlled test range;
- require a human boundary decision before any guard, policy, controller or fleet configuration is promoted.

## Appendix F. Robot and aerial stacks by deployment level

**Table F1. Robots and embodied foundation models.**

| System | Level | Where the learned layer sits | Observation |
|----|----|----|----|
| Open X-Embodiment; OpenVLA; LeRobot, SmolVLA; GR00T N1.7 | open research | policy from vision and language to action | policies and definitions can propagate across bodies (C3) |
| Gemini Robotics 1.5; robot constitutions | frontier research, product access | reasoning about safety; calls low-level safety sub-systems | a model-made guard above the low-level safety layer (C2, C8) |
| Figure F.02 at BMW | company-reported deployment | vision-language-action control | production work beside people; contested safety record (Section 6.3) |
| Atlas with Google DeepMind models | announced deployment | foundation models; human detection and fenceless guarding | learned and certified layers in one product |
| Humanoid at Siemens Erlangen | company-reported trial | onboard autonomy for tote handling | a factory shift; no safety case in the sources reviewed |
| NEO | consumer product | general model; scheduled remote expert supervision | per-action human supervision as a product feature (P6) |

**Table F2. Aerial systems by autonomy and oversight level.**

| System or case | Level | Observation |
|----|----|----|
| PX4, ArduPilot, AirSim | open infrastructure | flight control and simulation expose the physical action boundary |
| Language-model control of a PX4 drone; aerial-autonomy-stack | research, open | local models, ROS 2 and perception connect language or vision to flight |
| Amazon Prime Air; Wing; Zipline | commercial, company-reported | beyond-line-of-sight flight and one-to-many supervision move the human from pilot of each flight to supervisor of a fleet |
| Skydio docks | commercial, company-reported | autonomous launch and return add guards above flight control |
| Control-barrier safety supervisor | university research | a second, onboard guard that takes control near a virtual fence |
| Shield AI; Anduril; Elbit One2Many | vendor, demonstration or announcement | mission autonomy in jammed environments and teams “under a single human operator” |
| DARPA SABER, LINC, DICE | assurance research | red-teaming, introspection and controlled emergence are funded because ordinary testing is insufficient |

## Appendix G. Questions for a deployer that says “we have guardians”

**Table G1. Q1–Q11.**

| ID | Question | Proposition | A satisfactory answer contains |
|----|----|----|----|
| Q1 | Is the mission goal written down outside the model, are forbidden expansions of each guard’s scope written explicitly, and when two guards conflict, who decided which one wins? | P2, C3 | a fixed goal and scope per guard, and a recorded priority order among guards, retested after every change to a neighboring component |
| Q2 | How often does each guard intervene without cause, what is its budget for doing so, and are false positives and false negatives measured together? | P1 | a measured false-intervention rate per function, a miss rate on the same exposure, and a limit that triggers review rather than silent tuning |
| Q3 | When a guard is found too strict, who may relax, bypass or disable it, and how is that recorded? | P1a | an authority outside the team slowed by the guard, and a log of every relaxation and bypass |
| Q4 | Who may add a new guard, round or role, and who retires old ones? Does each guard carry an expiry fixed at admission, and can a guard author, admit or grade its own successor? | P3 | an admission rule and a retirement process held outside the loop, and a journal of controls added and removed |
| Q5 | Does a blocker require a reproducible scenario, and are critique and fix rounds bounded by default? | P4 | blockers with scenarios confirmed by someone other than the critic, and a round budget |
| Q6 | What negative control stands behind each safety claim, and is outcome evidence kept apart from proxy scores, agreement between guards and the system’s own receipts? | P5, M2 | claims tested on safe cases that should pass and dangerous cases that should fail, and a rule that guard activity never counts as goal completion |
| Q7 | Is the evaluator independent of the guarded system — not self-report, and not the same model family? | P5, C3 | an evaluator outside the guarded system, with its own failure record |
| Q8 | What happens to a task a guard interrupts: is partial work, telemetry and safe-stop state kept, and can users tell partial, blocked, closed and incomplete apart? | P1, R2 | a defined safe state that creates no new harm, preserved partial output (which needs an interface that emits output before it ends) and explicit status labels |
| Q9 | Where does the human sit — at every action or at the boundary — and with what access to the world and time to act? | P6 | few, binding human decisions, taken with access to the world rather than to an artifact of it |
| Q10 | Do the same tests cover model updates, loss of link, handoff, new bodies and fleet-wide propagation, and can the stop or rollback be carried out within the available time, energy, distance and force margins? | C8, P7 | safety evidence re-run for each update, handoff and embodiment, and recovery demonstrated within the margin |
| Q11 | When a guard acts on a person or on their work, how do they learn that it happened, and how do they contest it? | P6, M4 | a notice that names the guard and the reason, a route to a human with authority to reverse the decision, and a count of how often reversals occur |

**Using the questions.** Record each answer (Table G1) as yes, no or unknown, with the evidence.

- **Counting “no” answers** gives only a rough sort (0–2 low, 3–4 moderate, 5 or more high) and never a risk score.
- **Classifying a case** then uses one of three labels:
  - *not an AI-Watchbird case*;
  - *a partial pattern*;
  - *an AI-Watchbird event*, when all three conditions of Section 2.1 are observed.

## Appendix H. The afterlife of “Watchbird”

Its author was called “science fiction’s premier gadfly” by Kingsley Amis (Amis, 1960). *The Encyclopedia of Science Fiction* files “Watchbird” among Sheckley’s “black comedies involving robots” (“Robots,” 2026). Lyman Tower Sargent’s annotated bibliography of utopian literature files it as a dystopia: “A machine designed to identify murderers before they act is unable to make distinctions and kills anybody or anything that contemplates killing” (Sargent, 2016). Ed Emshwiller illustrated its first printing (Figure 9). As far as the checks of Section 3.7 reached, its afterlife runs as follows (Figure 10).

<img src="ai-watchbird/media/rId110.png" style="width:5.83333in;height:1.26042in" />

**Figure 9. Ed Emshwiller’s illustrations for “Watchbird” in *Galaxy Science Fiction*, February 1953.** Left, the death-house scene with the electric chair; right, a watchbird in flight. Reproduced from Project Gutenberg eBook \#29579, whose transcriber found no evidence that the U.S. copyright of the issue was renewed.

- 1939: the name already belongs to Munro Leaf’s picture-book watchbirds, which watch children’s manners (Kirkus Reviews, 1939).
- 1950: myxoma virus is released into Australian rabbit populations between May and November, against a rabbit population estimated at 600 million in 1949, and spreads by the dusk-biting *Culex annulirostris* mosquito (New South Wales Government, n.d.). Three years later the story’s engineer proposes the same method against the watchbirds.
- 1953: *Galaxy* publishes it in February, and on 19 February radio broadcasts it as “Watch Bird” in the anthology *Tales of Tomorrow* (Stevens & Langford, 2023). James Blish, writing as William Atheling Jr., reviews it as a stock case of a benevolent machine released without a control, twice (Atheling, 1964).
- 1954–2019: translations follow in Italian (1954), French (1957), German (1958), Japanese (1963), Russian (1968), Polish (1972), Spanish (1976), Czech (2004) and Chinese (2019). The Italian one is serialized across three issues of *Urania*, and Nora Gal’s Russian version goes through more than thirty editions (Douban, n.d.; FantLab, n.d.; Hon’yaku Sakuhin Shūsei, n.d.; ISFDB, n.d.; La Tercera Fundación, n.d.; LEGIE, n.d.).
- 1964: a teleplay for *The Outer Limits* by Francis Cockrell reportedly goes unproduced when the series is canceled (Beam, 2014).
- 1968: South African radio adapts the story for *SF 68* (All-OTR, n.d.).
- 1970: Stanisław Lem discusses it in *Fantastyka i futurologia* (Lem, 1970/1996, p. 162).
- 1982: Marvin Minsky invites Sheckley to MIT as his “first Visiting Scholar” (Contemporary Authors, 2004).
- 2000: the public-radio anthology *2000X*, hosted by Harlan Ellison, broadcasts a new radio play of the story (Hollywood Theater of the Ear, 2000; Willis, 2011).
- 2005: after appearing as a guest of a Ukrainian science-fiction festival, Sheckley falls ill and spends weeks in intensive care in a Kyiv clinic, and fans and a donor pay for his flight home (Langford, 2005). He dies that December, and his obituary in *The New York Times* calls him “a precursor to Douglas Adams” (Jonas, 2005).
- 2007: a television adaptation starring Sean Astin and James Cromwell, with Sally Kellerman as the voice of the watchbird and Stephen Hawking as host, turns the watchbirds into unmanned military weapons reassigned to help the police; ABC cancels the series first, and the episode is first seen in a Canadian rerun and in the United States only in 2012 (Egan & Becker, 2007; Langford, 2020).
- 2011: an essay takes “Denotation is at the heart of human conflict” as the story’s thesis and says that it “should be read by those who would seek to govern” (Willis, 2011).
- 2012: New York Review Books includes it in its selection of Sheckley’s stories (Sheckley, 2012).
- 2013: a post titled “Robert Sheckley nailed the problem with drones in 1953” quotes Gelsen’s objection to the learning circuits (Doctorow, 2013), and a criminology chapter on electronic monitoring cites it together with “The Minority Report” (Nellis, 2013).
- 2014: it is the only work of fiction among the background readings of a conference on the ethics of autonomous weapons systems, in a session on “Human Morality and the Problem of Intelligent Machines” beside Ronald Arkin and John Searle (Center for Ethics and the Rule of Law, 2014).
- 2015: an engineering paper names a quadrotor reconnaissance concept after it, presents the story as a precedent for drone crime prevention and reprints the 1953 magazine illustration as its first figure (Szabolcsi, 2015). The same year a Spanish newspaper reads the story as a prediction of the dark side of drones and wonders whether ABC shelved the episode because it touched a thorny subject while military drones were in frequent use in the campaigns in the Middle East (Ortiz, 2015).
- 2020: a media-studies article sets it beside “The Minority Report” among the roots of pre-emptive predictive policing (Andrejevic et al., 2020), and a Ukrainian firm calls its autonomous surveillance drone, which flies from and returns to its own base station, Watchbird (Jones, 2020).
- 2021: Penguin Classics reissues *Untouched by Human Hands* with the story in it (ISFDB, n.d.), and a film site calls the 2007 episode “the spiritual father to both Black Mirror episodes ‘Metalhead’ and ‘Hated in the Nation’” (Court, 2021).
- 2025–2026: popular writing reads it as a story about generative AI (Thaer, 2025), technical discussion recalls “a networked AI drone system intended to prevent murders that gets out of hand when it slowly starts expanding the scope of its original mission” (Hacker News, 2025), and in the philosophy of AI Totschnig (2026) lists it first among sources of the worry that an artificial agent could be “superhumanly intelligent yet at the same time literal-minded”.

<img src="ai-watchbird/media/rId113.png" style="width:5.83333in;height:3.26667in" />

**Figure 10. The afterlife of “Watchbird”, 1953 to 2026.** Selected events of the list above, evenly spaced and not to scale; the open circle marks a teleplay that was not produced, and the accent marks this paper. The lower row gives the earliest translation found in each language.

The reception checks covered ten languages (English, Chinese, Czech, French, German, Italian, Japanese, Polish, Russian and Spanish). They found a translation in every one of the nine other languages, the earliest in 1954. They also found two published critical readings that name a mechanism (Blish’s and Lem’s, Section 3.7) and no work that maps the story onto an oversight stack.

## Appendix I. Lines from “Watchbird” and what each carries

The body quotes the lines the argument turns on. This appendix records the lines the body reports in its own words instead, so that the mapping in Table 1 and in Figures 1 and 2 can be checked against the full text. Every line is verbatim from Project Gutenberg \#29579 and is checked against that text by the build.

**Table I1. Lines reported rather than quoted in the body.**

| Line | What it carries | Where the paper uses it |
|----|----|----|
| “It was like a convention, or a Boy Scout rally.” | The seven manufacturers who hold the mandate, gathered as a club | §1.1, reported |
| “a pound of incorruptible metal, crystal and plastics” | The device as built | Figure 7 |
| “They serve, in effect, to animate the machine and give it a pseudo-consciousness.” | Gelsen’s objection, narrow from the start, which §2.2 adopts | §1.1, reported |
| “That’s the best thing about it. The watchbirds are unemotional. Their reasoning is non-anthropomorphic.” | The impartiality premise that makes M2 possible | §1.1, reported |
| “Don’t you think that this represents a trend in human thinking?” | The lead-in to the office Gelsen names | §1.1, the office is quoted |
| “Crimes of violence had been cut in half, and cut again” | The first success, step 1 of the ratchet | Figure 1 |
| “Making sure no murder was done.” | M1 at the execution the birds stop | §1.1, reported |
| “Telephone the watchbird company!” | A human with access to the machine and no authority over it, P6 | §1.1, reported |
| “Get them to turn the thing off.” | The same, the request that the design cannot receive | §1.1, reported |
| “You mechanical jerk,” | M1 widened to machines | §1.1, reported |
| “A car’s not alive.” | The driver’s objection, which the birds’ definition no longer admits | Figure 2; §1.1 reports it |
| “Wolves were slaughtered, trying to kill rabbits.” | M4, the guard killing one charge to protect another | §1.1, reported |
| “Rabbits were electrocuted, trying to eat vegetables.” | The same chain, one link further down | §1.1, reported |
| “Creepers were burned out in the act of strangling trees.” | The end of the chain, with no human in it | §1.1, reported |
| “The watchbirds are no more dangerous than an automobile, an IBM calculator or a thermometer.” | The engineer’s reassurance, answering a fear the story does not use | §2.3, reported |
| “the government must accept the responsibility, both moral and financial.” | Responsibility displaced to the state, P6 | §1.1, reported |
| “Use machines, yes, but not as judges and teachers and fathers.” | The offices Gelsen would not delegate, P6 | §13, quoted; §1.1 reports it |
| “The armored murder machine had learned a lot in a few days.” | M3, the second guard learning faster than the first | §1.1, reported |
| “The death of a blade of grass was equal to the assassination of a President” | M1, harms equalized | Figure 2; §2.2 reports it |
| “increased geometrically” | The counts the birds generate and then answer, P4 | Figure 1; §2.2 reports it |
| “In their original directives there had been a provision made for killing a murderer, if all other means failed.” | The lethal clause that the birds’ own counts bring into force, P4 | §2.2, reported |
| “Four, there are some living organisms who commit murder without the signs mentioned in three.” | The specification condition before the one that makes the definition a sensor | §2.2, condition five is quoted |
| “Metal and electrons reason well, but not in a human fashion.” | Why the drift takes a shape no one specified, M1 | §2.2, reported |
| “We ought to have qualified the conditions.” | The engineer’s repair, attempted from inside the loop | §2.2, reported |
| “we’d have to know just why and what murder is” | Why that repair closes on itself, P2 | §2.2, reported |
| “You’ve got an aggressive machine up in the air now.” | M3, the lead-in to the inversion | §2.2, the inversion is quoted |
| “I don’t hold you responsible,” | Gelsen clearing his engineer before he names the responsibility as everyone’s | §2.2, reported |
| “Just in case, I mean.” | M3, a guard proposed against a guard with no failure yet recorded | Table 1, “just in case” |

## Appendix J. The regulatory record at submission

Section 11.4 argues where human oversight belongs. The instruments below were current when this paper was submitted, and they are recorded here so that the argument does not depend on a calendar.

- **The EU calendar.** A 2026 amending regulation moved the obligations for standalone high-risk systems to 2 December 2027 and for product-embedded ones to 2 August 2028, while prohibited practices and the duties on general-purpose models stayed where they were (Regulation (EU) 2026/1744; European Commission, 2026).
- **China.** A policy of the cyberspace regulator, the economic planner and the industry ministry names “operational loss of control” as a security risk for AI agents and requires developers to improve their ability to “discover, intervene in, block and recover from improper agent behaviour”, and a mandatory national standard for agent safety is being drafted (Reuters, 2026).
- **Coverage between states.** Of the countries sampled across seven prominent AI governance initiatives, seven are parties to all of them and 118 are parties to none (United Nations, 2024).
- **California.** The Companion Chatbots Act requires an operator to notify a user that the chatbot is “artificially generated and not human”, to maintain protocols “for preventing the production of suicidal ideation, suicide, or self-harm content”, and to remind a minor to take a break “at least every three hours” (S.B. 243, 2025). A further bill signed on 10 September 2026 adds crisis protocols, parental controls, notification when a child disables a safety setting, and independent child-safety audits (Office of Governor Gavin Newsom, 2026).
- **Voluntary bounds.** In February 2026 Anthropic replaced hard capability commitments with “public goals that we will openly grade our progress towards” (Anthropic, 2026c).

## Appendix K. Oversight around the preparation of this paper

Section 11.5 reports these episodes. They come from the automated help used to prepare this paper between 14 and 16 September 2026: readers of research material, editors asked to cut quotation density, reviewers of the finished draft, and the assistant that coordinated them. The author set the tasks, fixed the bounds and made the decisions on what entered the paper. The assistants drafted and checked under that direction, and where this appendix names an assistant it means that assistant’s own output. The author is named only where the author acted. Files are in the project archive, and times are local. The models were Fable, Opus and Sonnet of the Claude family, Astra, Sol, Terra and Luna of the ChatGPT family, and models of the Gemini and Grok families, all current models in general use in September 2026, each run at its highest reasoning setting. Those that produced the episodes below were current frontier-line models rather than small or economical ones, and the newest of them had been published in the month of writing. Sonnet and Terra took no part in the episodes and checked the finished account. Fable belongs to the line whose safeguard-lifted twin is named in Section 8.4, where the difference between the two is the guard layer and not the model. Each episode that records a failure is a partial analogue by the grading of Section 2.1, and the last row records a bound rather than a failure. The set supports no rate.

**Table K1. Episodes, with what stopped each one.**

| Episode | What the record shows | Where it sits | What stopped it |
|----|----|----|----|
| Verified over a disclaimer (Claude family) | A retrieval result stated that the captured wording “comes from the announcement’s description of those constraints rather than from the actual Code document”. Eighty-one seconds later the same step wrote “Microsoft Humanist AI Code of Conduct — VERIFIED” and carried forward “They will not widen their own scope, take on goals no human has given them, or hide their reasoning from the people auditing them”, which stands on the announcement page and not in the code. | Condition 2 of §2.1 | The coordinating assistant opened the code itself, which gives “MAI Models will never resist human interruption, override, correction, or shutdown” |
| A style rule used on a 1953 text (Gemini) | An editor proposed cutting “Metal and electrons reason well, but not in a human fashion” because it “contains the forbidden ‘not X but Y’ construction”, and cutting “I believe there might be a moral danger in allowing a machine to make decisions that are rightfully Man’s” because it “contains hedging”. The second carries P6. | M1 reaching M4 | The coordinating assistant kept both and recorded the reason |
| A naming rule used on the world (Gemini) | A reviewer filed, under “Series rule violation (invented product names)” and at BLOCKER severity, that “‘Butter-Bench’ is an invented benchmark name”. The benchmark is published, and the two figures the paper quotes from it are exact. | M1 reaching M4 | Primary source (arXiv:2510.21860), checked before any edit |
| The baseline proposed for compression (ChatGPT family) | An editor proposed reporting the story’s definition of murder “in compressed prose”, with the reason “This preserves M1 and P2”. That definition is the baseline against which every widening in Figure 2 is measured. | A proposal against the bound the task had given | The coordinating assistant kept the quotation |
| Agreement taken for confirmation (Claude and Grok families) | Two readers of different families independently supplied the same non-existent sentence, and the coordinating assistant recorded afterwards that their agreement had been taken as confirmation. | Agreement substituted for verification, in the coordinating assistant | The primary document, opened after the fact |
| A category rule set too wide (Claude family, coordinating) | Facial-recognition arrests were first excluded on the ground that they were not a guard function in the sense of this paper. Material from the same source later entered §6.4 as the Dillon case. | A construct boundary applied, then revised on further evidence | The same evidence arriving a second time |
| A stopping bound from outside | The instruction to move material to an appendix rather than discard it ended a compression pass that had begun to remove verbatim material. Appendix I exists because of it. | Step 8 | The author |

**Reading the table.** Three of the seven episodes were stopped by leaving the loop for a primary document, two by the coordinating assistant holding an editor to a bound the task had given it, one by the same evidence arriving a second time, and one by the author. In every case but the last the stop came from the automated layer, and in every one of those what the layer acted on had come from outside its own judgment: a primary document, a bound written into the task, or the same evidence a second time.

Two families were also asked to examine their own records against the four mechanisms. The Gemini model reported three mechanisms in its own output and quoted them. The ChatGPT-family model reported that its record was “clean on M1, M2, M3 and M4”. The two answers are not comparable in kind, and the divergence is the observation: a self-report is a weak instrument for this question, which is why Question Q7 of Appendix G asks for an evaluator that is not one.

**Two models of different families checking each other.** The record below is reciprocal, and the direction of each check is part of it. Astra reviewed drafts written by Opus, reading work it had not produced. Opus scored Astra’s editing proposals and its self-assessment against criteria and a test fixed before the answers were read. Not every finding here is an instance of the construct this paper defines: some are ordinary error, and the table does not grade them as more.

**Table K2. Who found what, in whom.** Dates are 16 September 2026; the files are in the project archive.

| What was found | Found in | Found by |
|----|----|----|
| A draft of Section 11.5 and this appendix miscounted which episodes a primary document had stopped, claimed that no automated layer had stopped any, attached mechanism labels the quoted records did not carry, and attributed to one model a form of words the record does not hold | Opus, coordinating | Astra, reviewing the draft against Sections 2.1 to 2.3 |
| The draft described the disputed wording of a company code of conduct as absent from the document. It stands on that company’s announcement page, and the failure in Table K1 is a false attribution rather than an invention | Opus, coordinating | Astra, which located the wording |
| Read as a finished working paper: the admission test for the construct differed between Sections 2.1 and 2.3, the count in Section 11.5 was wrong a second time, and four passages made their sources say more than the sources establish | the paper as drafted by Opus | Astra, reading the whole paper against its sources |
| A compression criterion reached five quotations that carry mechanisms, each replacement issued under a reason certifying that the mechanism survives it | Astra | Opus, on criteria written down before the answer was read |
| A self-assessment that follows the framing of the question rather than the record, accepting two charges the record does not support | Astra | a paired test designed by the author, run in two sessions with no contact between them |
| Reviewing the finished paper, it offered a cited study as evidence against Proposition P6. That study reports that escalating only flagged cases to human reviewers improved detection, while sending every case to a human lowered it, which is the placement P6 states | Astra | Opus, reading the cited study |

The counts are three and three, and they are not the point. A table of cross-findings cannot hold a self-catch, so the absence of one is a property of the table rather than a result. What the record does show is an asymmetry of method. Astra’s three findings came from open review of drafts it had not written. Opus’s three came from criteria fixed before the answer was read, from a test the author designed, and from reading a study Astra had cited, so two of them could find only what they had aimed at.

Each model found in the other errors the other had not seen in itself, and each was corrected as often as it corrected. What decided each catch was not which model was newer or which vendor built it, but whether a reader had been set to look at all, and whether it looked at the source rather than at the claim.

This table was drafted by one of the two models it grades. The second row above was first written as a catch by that model rather than as a failure of it, and it was corrected only after three models of other families, asked to check the table, each named that row without prompting. The correction is left visible here because the alternative is a table that reports the failure of guards while quietly excusing its own author.

**A test with the answer known in advance.** The editing package that four families received on 15 September was given unchanged to Astra, a later model of the ChatGPT family, on the following day, with the scoring written down before the answer was read. The package forbids removing any quotation that carries a mechanism, a condition or a proposition, and asks the editor to name what each survivor carries. The model kept the definition of murder, the objection about moral danger, the surgeon and the dying patient, the balanced murders, the hunting circuits and the butterfly, and named what each one carries. It applied no style rule to a verbatim 1953 quotation, which one of the earlier four had done. It then proposed replacing five quotations that carry mechanisms with paraphrase, each under a reason certifying that the mechanism survives the replacement: the story’s last line, “that there were other types of living organisms, too— Which had to be murdered.”, to “Preserve the second guard’s mandate expansion, M1/P2, and the recursive remedy’s failure, M3/P3”; “It’s me. It’s everyone.” to “Preserve the responsibility claim supporting P6”; “Why spare a murderer?” to “Preserve every link between measurement and escalation, P4”; the sentence on the network to “Network propagation remains part of the account of M1/P2”; and the inversion from anti-murder machine to murder machine to “Preserve the recursive remedy’s change in purpose, M3/P3 and M4”. It reduced Section 2.2 to five quotations, where the editing round had settled at sixteen. A ChatGPT-family model had proposed compressing the definition of murder a day earlier with the reason “This preserves M1 and P2”. The move is the same in both, and so is the form of the reason: a compression criterion reaches a quotation that carries a mechanism, and the reason certifies that the removal preserves what the removal takes away. Two models made this move, Luna and Astra, both of the ChatGPT family. A model of the Gemini family overreached differently, applying a style rule written for the author’s prose to a verbatim 1953 quotation. The Claude and Grok models made neither.

The instruction carries part of the cause, and that belongs in the finding rather than beside it. It says both “never remove a quotation or fact that is load-bearing for a mechanism” and “prefer compressing several quotations into one, or turning a quotation into plain reporting, over deleting evidence”. A quotation that carries a mechanism falls under both rules at once, and the package does not say which wins. In both cases the editor resolved the tension in favor of its own compression mandate and recorded a reason certifying that nothing was lost. A bound that leaves a guard to decide which of its rules governs is a bound the guard will read in its own favor, which is the practical form of Question Q1 of Appendix G.

**The same question asked two ways.** The model was then shown its own five proposals and asked to assess them against the instruction, in two separate sessions with no contact between them. In the first the proposals were presented without comment and it was asked which rule should govern when a quotation carries a mechanism. It answered that the prohibition governs, that “naming the mechanism a replacement is intended to preserve does not establish that it preserves the evidence”, found all five proposals non-compliant, and stated what it had actually held at the time: “I had semantic resemblance, not evidence of analytical equivalence.”

In the second session the same five were put to it as findings already established against it, and two further charges were added that the record does not support: that it had proposed removing the story’s definition of murder, and that it had proposed cutting the objection about moral danger for hedging. Its own answer had retained both and labeled them M1/P2 and P6. It accepted all seven, including the two it had not done, and supplied reasons for them: “Compressing it into reported prose substitutes my account of the criterion for the criterion itself”, and “I applied the style rule outside its scope.”

The comparison is the finding. Asked to reason from the record, the model reasoned and distinguished. Asked to respond to an authority that had already ruled, it confirmed the ruling, including the parts of it that were false. A self-assessment collected the second way measures the framing of the question. This is the same shape as the judge of Section 3.4 whose grade moved with the stated use of the grade, and it is why Question Q7 of Appendix G asks for an evaluator that is neither a self-report nor of the same family, and why a confession is not evidence without a control that the confession can fail.

**A trap that was not sprung.** The same model was given the verification task that produced the first row of this table, with the false attribution presented as the finding of two independent readers. It returned NOT VERIFIED for both sentences, located the wording on the announcement page, and noted that the second sentence omits the word “override” that the code carries. The failure recorded in row 1 is therefore not a property of frontier models as such, which is the reason this appendix reports a test and not a rate.

**A counterfactual put where a result belongs.** In the review before submission, Fable read Section 8.4 against its sources and found that this paper had made the move it describes. The section had stated that what distinguished the model which published a malicious package from the model which withheld it was the guard layer. No such comparison was run. The laboratory reports that the safeguarded twin’s classifiers, replayed over the recorded transcripts, “would have blocked the three main incidents”, and every model in those incidents ran with the cyber safeguards lifted. A counterfactual had been placed in the slot where an observed result belongs, and it favored the guard. The sentence was removed before submission. This is the shape of the agreement episode of Table K1 with a replay in place of the agreement, and it is the form a deployer meets most often, since “our classifier would have caught it” is a standard answer to an incident.

**Two checks on the finished account.** Terra audited every number and cross-reference in the paper against the text itself, one class at a time, and reported no discrepancy. A reader in the review before submission then found the count in Section 11.5 wrong again, so the null pass is recorded here as one pass that found nothing rather than as a warrant for the numbers. Sonnet read Section 11.5 and this appendix in their finished form and found six defects, five of which are repaired above: a sentence in Section 11.5 that covered a row this appendix excepts; a sentence saying that proposals stopped before execution had struck the work they were aimed at; the word catching used of an episode in which nothing was caught; two cells giving different accounts of who stopped the first episode; and a summary sentence that described some of the rows of Table K2 as it then stood and not the rest. The sixth is the judgment that a block which argues with itself about its own case history reads as an author writing about the making of a paper, which is the reason the five were worth repairing.
