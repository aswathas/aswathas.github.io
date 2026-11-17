# 08 — The résumé problem

**Date.** 2026-11-17

The user is applying to the **Myntra PM1 internship** and asked for a résumé that
gets them in. The brief, verbatim:

> "D:\Downloads\Myntra PM1 Internship JD V2 (1).pdf" i want to apply for this
> internship , get my resume from drive Aswath AS doc ( like that name) get it read
> jd and redesign my jd and get me perfect resume which can get me into this company

Then, mid-task:

> "use our latest project skills add our aswath-chronice asd site"

So this is two deliverables: the application artefact, and the résumé living on
this site. They are the same document, and that constraint drove the design.

## What the JD actually asks for

Read from `Myntra PM1 Internship JD V2 (1).pdf` (6 pages):

- **Who they want.** Final-year engineering students. Communication, curiosity,
  empathy, structured thinking.
- **Four work streams.** Analytics, Problem Solving, Product Operations, Program
  Management.
- **Three playgrounds.** Storefront product (customer experience), supply chain
  inbound (procurement, cataloguing, pricing, promotions), supply chain outbound
  (inventory, fulfilment, delivery).
- **Tools.** Excel and Google Sheets on day one; eager to learn SQL, Tableau,
  Mixpanel. Jira, Figma, Agile, Scrum.
- **Logistics.** Work-from-office Bengaluru, January–June 2027, ₹70,000 a month,
  possible pre-placement offer.

The user chose the **Analytics + Problem Solving** track to aim at.

## What the current résumé is

The Drive file `ASWATH A S_Doc.pdf` (id `1La364K8s-ffHc-Zhg59P2jgc28BbSbwE`,
2026-09-29). It is a **picture of a résumé**: no text layer, so no ATS can read
it. Sections: PROFILE / WORK EXPERIENCE (SISA Infosec, Web3 Developer) /
EDUCATION (SRM, B.Tech CSE with Blockchain specialisation) / PROJECTS (FormBuddy,
SafePass, Shrimp AI) / SKILLS. Headline: "AI Developer".

Three things are wrong with it for this JD, and only the third is about content.

**It is an image.** Whatever a recruiter's applicant tracking system does with it,
it is not reading it. Fixing this is not a formatting preference; it is the
difference between being parsed and being seen.

**It is aimed at the wrong job.** Everything in it is an engineering artefact: a
framework, a workflow, an attack vector. The JD is not hiring an engineer. It is
hiring someone who can take a problem apart, find the number in it, and write
the decision down. The market assessment, the benchmark table and the launch
plan the user has already built are far stronger evidence for this JD than the
security framework is — and none of them are on the résumé.

**It has no evidence scale.** "Built an AI form-filling agent" is what any
candidate writes. "Sized a two-corridor market from 83 cited sources and 100
scored localities, and returned a go/no-go verdict with a 90-day launch plan" is
what only this candidate can write. The second one survives a screen; the first
one does not.

## The evidence available

Not invented, and not generic. Every number below was read out of the user's own
GitHub and Drive during this task:

| Source | What it proves |
| ------ | -------------- |
| `mobile-vet-chennai` | 7,120-word market assessment, 83 cited sources, 100 scored localities with demand by hour/weekday/season, price bands, route economics, a go/no-go verdict, a 90-day launch plan, a locality decision board, and an audit script that checks 47 narrative claims against the data |
| `olx-car-search` | A benchmark built to choose an architecture: 60 vehicles × 3 delivery modes, reporting context ingested (32,450 → 142 tokens), round trips (3 → 1), latency (~4.8s → ~1.1s) |
| `pistol` / `TradeMCP` | 53 free NSE/BSE tools over 8,000+ stocks, screeners, backtests, portfolio risk, 93 tests, primary sources with graceful degradation |
| FormBuddy (OpenAI Buildathon) | Problem framed, users segmented, feasibility argued (stack, ops ownership, legal disclaimers), a 48-hour build plan, a privacy stance, citations to official `.gov.in` sources |
| Autonomous Payment Agent | A product document: vision, core problem, market gap, competitor landscape, two-layer architecture |
| `AttackLogs`, `ColdTrust`, `decision-arena`, `skill-router` | 36 reproduced exploits as ground truth, 11/11 cold-chain integration tests, an accuracy/calibration/cost/latency harness under $1 a sweep, a 298-case routing harness |

## Two numbers the user gave, and did not

- **CGPA 8.3** for SRM B.Tech CSE. Supplied by the user when asked. Not derived,
  not estimated, and not written into any document before they said it.
- **Track: Analytics + Problem Solving.** Their choice, made deliberately over
  Product Ops and Program Management.

## What this file has to answer

Not "what did this person build". It has to answer, for someone who has never
heard of the user and will spend about forty seconds on it: *can this person take
a messy problem apart, work with data, and write down a decision?*
