# 07 — Retro

**Date.** 2026-10-16. Written after the round shipped. The round is phases 1 and 2
of `04-plan.md`; phase 3 did not ship, and the reason it did not is the most
useful thing in this file.

## What we got right

**Reading the source instead of the changelog found the worst bug.** `astro.config.mjs`
was `defineConfig({})`. Nobody reported it, nobody can see it by visiting the
site, and it had been wrong since the first commit. One missing key produced three
failures at once: `og:url` rendering as `http://localhost:4321` in production, the
JSON-LD `Person` node declaring the site to be `example.com`, and `llms.txt`
pointing agents at a domain that does not exist. Two of those three are invisible
to the person who filed the ticket. The audit pass that surfaced it was reading
values, not grepping for patterns.

**Deciding the OG card question by writing down what the options cost** is why the
build is still `npm ci && astro build`. Option B was the standard Astro answer
and it was not wrong; it adds `satori` and a rasteriser to a project whose only
runtime dependency is `astro`, and every future machine that builds the site has
to run it. Naming that cost in `03-decision.md` is what made the one-line answer
defensible.

**Checking the cache before rebuilding.** The first verification of the URL fix
came back showing `http://localhost:4321` — the exact wrong value the change was
supposed to fix, in the same response that carried the new `og:image` tag. The
instinct was to rebuild. It was Cloudflare's edge cache. Rebuilding would have
produced a third identical deploy and taught us nothing.

**Keeping the curated project list.** `npm run sync` would have pulled 71 repos
into a list of 7. It was tempting as a click-bug suspect and we left it alone,
because changing which cards exist makes a bug harder to characterise, not easier.
The list is curated and that is the behaviour, not a debt.

## What we would do differently

**Ask which page before investigating which repository.** The click bug was never
in this site. Six static hypotheses were tested and eliminated here, correctly,
against the wrong codebase. Every one of those checks still holds, so the work
wasn't wasted — but one question at the start, *which page?*, would have ended the
search in a minute. A bug report names a symptom, not a location. `attempts/002`
now records it.

**Verify in a browser before claiming verification.** `agent-browser` hung past
180 seconds and was abandoned, and the round shipped with zero interactive
evidence. Every green check in `06-verification.md` is `curl` and grep — HTML
strings, not pixels. The two changes were head-only, so nothing was probably
broken, and "probably" is doing real work in that sentence. Get a browser working
first; the fallback to HTML greps should have been announced as a downgrade, not
as verification.

**Count properties before optimising them.** `grep -c loading=` returned 8 misses
on the homepage and it read like an oversight. Seven of the nine images were
16–34px icons above the fold, and the ninth was the LCP element — lazy-loading it
would have actively hurt. The number was right and the conclusion was backwards.
Read the dimension and the position before deciding something needs an attribute.
`attempts/001` is the reminder.

**Write the cursor recommendation after someone has used one.** We recommended a
static `pointer-events: none` overlay, which is a reasonable design, and the
sibling repository had already built a cursor and removed it because a 12px dot
was worse than the native pointer and broke text selection. The correct answer
was "do not build it", and we had to go and collect that evidence to find out.
The real lesson is the one in `attempts/003`: a theme does not need a cursor, and
a cursor is not free — it takes a capability away from the reader.

**Not leaving `?? 'https://example.com/'` in the tree.** It was unreachable once
`site` was set, so we judged the removal not worth a commit. It is still the
exact pattern that produced the bug, sitting in two endpoints where the next
person can copy it. Cheap to fix, and we left it because it was cheap to fix
later, which is how cheap fixes become none.

## What phase 3 actually was

`04-plan.md` phase 3 lists two items: reproduce the click bug, and build the
cursor effect. It was written before either had been resolved, and both resolved
the same way — outside this repository, in `agent-chronicles`, which was built in
a parallel session the same day. The click handler there called `preventDefault()`
on every card anchor. The custom cursor shipped and was removed in the same
commit that fixed the links.

So phase 3 shipped as "no". That is not a failure of the plan; it is the plan
being honest about a round that turned out to be about a different site. But it
does mean the plan file is now a record of intent that did not survive contact
with the evidence, and `05-mvp.md` carries the scope that actually shipped.

## What the next iteration should start with

**Reconcile the docs, not the code.** `04-plan.md` says phase 3 is open.
`attempts/002` and `attempts/003` both carry 2026-10-16 updates saying they are
closed. `03-decision.md` says nothing was superseded, which was true when written
and is now false for two decisions. A `docs/decisions/` entry recording that
phase 3 was resolved out-of-repo would have been the right move at the time and
is the first thing to write now.

**Three assertions, in this order.** Nothing currently prevents a regression of
anything fixed this round: that `Astro.site` is set, that the OG tags are
emitted, that `identity.linkedin` is non-empty. Three tests, no new dependency,
and they close the gap `06-verification.md` names as its largest.

**Make "which page?" the first question of any bug report.** It would have saved
six hypotheses this round and will save the next one.

**Delete the `example.com` fallbacks.** Everywhere they still exist.

**Leave the cursor alone.** It is decided. If it comes back it needs a reason
that is not the theme.