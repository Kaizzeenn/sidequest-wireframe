# V12 verification (2026-10-20)

Automated Chromium interaction checks performed in a browser with isolated demo storage:

- Public homepage loads first; main reporting entry remains available.
- Home contains the process overview, sample resolutions and neighborhood garden.
- XP preview renders at level 1 and opens the Rewards view for a signed-in user.
- Three original guardian avatar artworks are selectable and persist to the profile in the browser demo.
- Citizen signs in, supplies report category, title, description, zone, landmark and policy confirmation, reviews submission, and receives a reference receipt.
- Explore filters are retained; the opt-in real-streets iframe can be displayed and dismissed, with the illustrated map remaining available by default.
- Coordinator demo enters separate admin workspace without JS errors.
- Mobile Home, Explore, Report, Track, and Admin screens fit a 390px viewport without horizontal overflow.
- No uncaught JavaScript errors in the tested flows.

Test-environment limitation: direct navigation to a locally hosted HTTP URL was blocked by the testing browser, so the source files were combined for isolated browser tests. GitHub Pages deployment still needs a real-host test. Automated browser checks are not security penetration tests, screen-reader audits, or real user research. Provider map access may depend on internet and embed policy. Backend, real authentication, and live government integration are not included in the static release.
