# SIDEQUEST · Presentation and user-test preparation

## 8-minute pitch (structure to rehearse)

**0:00–1:00 Problem & target users.** Show the everyday reporting gap and explain the proposed Taft–Vito Cruz pilot boundaries. Do not assert users avoid reporting unless your group has interviewed them.

**1:00–2:00 Home.** Explain why visitors can understand the system and inspect existing concerns without creating an account. Point out Report, the illustrated neighborhood map, the clear process steps and documented sample resolutions. Mobile prioritizes Report and the map.

**2:00–3:00 Report / Evidence.** Explain structured information, draft saving, duplicate suggestions, optional pin, upload preview and review-before-send. Mobile stacks fields and keeps validation close to inputs.

**3:00–4:00 Track / Details.** Explain the current status, proposed responsible office, split referral states, next action/review, readable timeline and recheck. Show follow updates and downloadable case summaries.

**4:00–5:00 Coordinator workspace.** Distinct operations interface: separate review queues, assignments, private notes, referral evidence, dates, priority and exports. Show why the system can be used by an organization, not only citizens.

**5:00–6:15 Main differentiation.** Explain **I experienced this too** and why verified contributions consolidate repeat reports. XP/badges motivate useful behavior but are only awarded after review. Show Levels 1–6 and neighborhood garden tied to resolved case histories.

**6:15–7:15 Adoption rationale & boundaries.** What the pilot could help measure: completion, duplicates avoided, review time and status understanding. Do **not** promise referral acceptance or faster government response without a partner.

**7:15–8:00 Conclusion.** “We don't want people to get used to problems. We want it to become easier to do something about them.”

## Q&A topics to prepare

- Why an street map instead of an accurate navigation map? **V13 uses actual street geometry, but a production pilot still requires validated coverage boundaries, report-location verification, and a shared backend.**
- How are duplicate reports handled? **Potential match suggestions and one reviewed shared case, not automatic merging of distinct issues.**
- Could XP cause spam? **One contribution per person per issue, staff verification, no XP for duplicates/rejected cases and a local demo daily XP cap.**
- What if a referral is ignored? **Separate sent/accepted statuses, next review date, record delays, and no implied agency acceptance.**
- What protects privacy? **Browser demo only demonstrates UI visibility. Real deployment requires server-side authorization, private files, moderation, secure login and data governance.**
- Is this usable without games? **Yes: reporting and tracking have normal standalone actions and no reward requirements.**

## Five usability tasks

Ask several real potential users to complete these tasks on the prototype without step-by-step coaching. Record completion, time, errors, confusion, and comments.

1. From the public homepage, locate an existing sanitation concern near a known landmark without logging in.
2. Start a report; save and restore a draft; review the form; submit a sample report and find its reference number.
3. Recognize that the pending report is private, then locate it under personal activity / map.
4. Use the second citizen demo account to confirm a reviewed issue; explain why XP is pending.
5. As the coordinator, find an unreviewed case, record a decision, and explain the difference between referral sent and referral accepted.

## Measurements

| Metric | How to capture | Initial goal to test (not measured performance) |
| --- | --- | --- |
| Report completion | Share of participants submitting a complete *test* report | ≥ 80% without assistance |
| Median report time | Time from form open to reference ID | ≤ 3 minutes |
| Duplicate avoidance | Share who choose existing concern when shown matching candidate | Observe; no claimed baseline |
| Location accuracy | Compare selected pin to agreed landmark on a real map | Pilot needs geographic benchmark; street map insufficient |
| Status comprehension | Ask users to identify what is known and not known about agency acceptance | ≥ 80% correct in test |
| Admin task completion | Time from opening review queue to recording the appropriate decision | ≤ 2 minutes for straightforward sample |
| Accessibility | Tab/keyboard and contrast check on mobile/desktop | No keyboard traps; readable focus and errors |

## Three exception-case demos

**Duplicate:** Use a description/category/zone similar to the existing sidewalk report. In the coordinator workspace choose Duplicate and link to the correct original case ID. Explain why it earns no XP.

**Rejected:** Create an intentionally unsuitable sample report without actual personal information, and record a reasoned rejection. The reporter should see the recorded explanation in case history.

**Reopened:** Progress a case through verification and resolution, sign in as reporter, request another review using “Still happening,” and approve the recheck as coordinator. Explain why resolution is a documented claim subject to challenge.

Every case in the demonstration is fictional; do not show it as a real Manila incident.
