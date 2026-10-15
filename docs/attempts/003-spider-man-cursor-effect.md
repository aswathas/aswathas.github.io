# Attempt 003 — Spider-Man cursor effect

**Opened.** 2026-10-15. **Status: open. Nothing built.**

**Hypothesis.** A custom cursor effect will make the desktop metaphor feel more
like an interface rather than a picture of one, and it is the kind of detail that
makes a site memorable.

**Requested as.** "a better cursor animation effect minimalistic and spider man
like".

## What "spider man like" has not been pinned down

The request has two halves. One is settled by the phrase "minimalistic". The other
is not.

The obvious reference is the web-shooter threads — the two organic lines that shoot
out from the wrist and adhere to whatever surface the hand is aimed at. That
effect has two very different implementations:

- **A static overlay.** A `pointer-events: none` layer with an SVG crosshair that
  follows the cursor, plus one or two faint lines trailing behind it. Roughly twenty
  lines of JavaScript and one SVG. No canvas, no physics.
- **A canvas simulation.** Lines that propagate to the pointer, attach to the
  nearest surface, and retract when the target moves. A `requestAnimationFrame`
  loop, per-frame distance maths, and a permanent animation cost on every page.

The first is a visual motif. The second is a physics simulation that runs for the
lifetime of every page view.

## Why this is still open rather than built

There is a specific tension that has not been resolved. This codebase takes
reduced motion seriously — `desktop.css` contains ten `prefers-reduced-motion`
guards, and the dock magnification is already disabled under
`(hover: none), (pointer: coarse)` and under reduced motion. The site is a macOS
interface simulation built to be respectful of how people actually browse.

A continuously animating cursor layer sits badly against that, unless it opts out
of the same reduced-motion guards — in which case it is also the least useful part
of the site for the people who most need it to be still.

Two further unknowns:

- The cursor effect has to work on touch devices, where there is no cursor. The
  existing dock code already handles this with `@media (pointer: coarse)`; a new
  effect would need the same treatment or it becomes a permanently invisible layer.
- It has to survive Astro's View Transition navigation, which the site already uses
  for page changes. An element that survives or does not survive a view transition
  is a real question, not a detail.

## What is being asked before building

The recommendation is the static overlay: a crosshair dot with one faint trailing
line, `pointer-events: none`, hidden entirely under `prefers-reduced-motion` and
under `(pointer: coarse)`. It reads as the reference without adding a permanent
animation loop to a site that otherwise has none.

The user should confirm that, or describe what they actually want, because
"minimalistic" and "spider man like" can be satisfied at very different costs.

## Outcome

Open. Do not close this file until something has actually been built and measured.
---

## Update — 2026-10-16: this was already built and removed, in a sibling repository

**Closed. Abandoned — the answer already exists, and it is a no.**

`agent-chronicles` shipped a `cursor: none` custom cursor in the same session. It was
removed in `1b24be5`:

> "Removes cursor:none and the custom cursor entirely. A 12px dot over text-heavy
> copy was worse than the native pointer, and it broke text selection."

Two failures, both found by using the page and neither visible in the diff:

1. **It was worse than the OS pointer.** The native cursor carries information a
   12px dot cannot — resize edges, text I-beam, scrollbar affordances.
2. **It broke text selection.** Hiding the native cursor took the selection
   affordance with it, on a site whose whole job is reading project descriptions.

The full record is in
`agent-chronicles/docs/attempts/002-custom-cursor.md`.

### What this changes for the recommendation above

The original recommendation in this file — a static overlay, `pointer-events: none`,
hidden under reduced motion — was written before that evidence existed. It is a
reasonable design and it is still the right recommendation **if the effect is ever
built on this site**, because this site has a card grid rather than long prose.

But the more useful answer is the one the sibling repository already paid for: the
Spider-Man theme has not needed a cursor to work. It has the web patterns on hover,
the tether as a position indicator, and the edge alarm. All three deliver the theme
without taking anything from the reader, and none of them compete with the platform
over a capability the reader came for.

**The decision is therefore not "build it small". The decision is "do not build it".**
If this is wanted here, it is worth revisiting when there is a reason beyond
theming, not before.
