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