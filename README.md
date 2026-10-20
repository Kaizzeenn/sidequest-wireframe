# SIDEQUEST · Taft Radar

**V13.2 bounded street map | integrated street-map classroom prototype | Student web development project**

SIDEQUEST is a browser-based demonstration of citizen reporting for non-emergency concerns in selected public spaces around **Taft–Vito Cruz, Manila**. It is **not** operated by a government agency, is not an emergency service, and does **not** send real submissions to public authorities.

## Start the website

Download/extract the complete folder, then **double-click `START_SIDEQUEST.bat` on Windows** (Python 3 required). Keep its terminal window open. On other systems run `python3 start_sidequest.py`. Alternatively, open the folder using VS Code Live Server or host it on GitHub Pages. **Do not open `index.html` as a `file://` URL for online map use.** Keep all CSS/JS files and the `vendor/` folder together. Leaflet is bundled locally. Internet is required for OpenStreetMap street tiles. If tiles cannot load, use the report list or report by area and landmark. No API key is required.

For GitHub Pages, upload `index.html`, `enhancements.css`, `enhancements.js`, `v12.css`, `v12.js`, `live-map.css`, `live-map.js`, and the complete `vendor/` folder to your repository root, then enable Pages in **Settings > Pages > Deploy from a branch > main > /(root)**. Also include this README and supporting documentation.

## Demo accounts

Use the Log in / Join action on the public homepage, then choose a demo account from the welcome screen:

| Role | Demo email | Demo password |
| --- | --- | --- |
| Citizen | `explorer@example.test` | `DemoOnly123!` |
| Coordinator | `coordinator@example.test` | `DemoOnly123!` |
| Second citizen | `neighbor@example.test` | `DemoOnly123!` (use manual login) |

You can also create a fictional local citizen profile. **Do not use your real credentials or private information.** The credentials and role checks are mock implementations in JavaScript, not secure authentication.

## What visitors can do

- **Without signing in:** See the homepage, how the proposed reporting workflow works, review public sample issues, explore the interactive street map and accessible issue list, filter by area/category/status/date, search example landmarks, read About/Guidelines, and inspect public case history.
- **As a citizen:** Submit a structured report, preview/remove a photo, place an approximate location pin or request browser location permission, save/restore a text draft, review answers before submitting, get a case reference, track private and public reports, confirm an existing concern with optional evidence, follow cases and view unread updates, request another review, and personalize an avatar/appearance.
- **As a coordinator:** Use the separate operations interface to review submissions and confirmations, mark duplicates, document reasons and statuses, record proposed assignment/referral acceptance, set next review dates, add private versus public notes, attach resolution evidence, view an action trail and analytics, export a case as PDF or print with evidence, and export filtered/aggregated monthly CSVs.
- **Rewards:** Earn XP only after coordinator verification; levels grant profile titles, cosmetic frames, and badges. The neighborhood garden grows for recorded resolved cases, with each plant linking to its case history.

## How XP and leveling work

| Verified action | Recognition |
| --- | --- |
| First useful, unique verified case | +20 XP |
| Approved contribution to an existing case | +10 XP |
| Unverified, duplicate, rejected, or repeated confirmation | 0 XP |
| Daily cap | Up to **60 XP/day** in this demo |

Each **100 total XP** increases the explorer's level. Your level and cosmetic unlocks persist in this browser's demo storage.

| Level | Total XP | Digital unlock |
| --- | ---: | --- |
| 1 | 0 | New Explorer; plain profile frame |
| 2 | 100 | Neighborhood Helper; Leaf frame |
| 3 | 200 | Radar Scout; Sunrise frame |
| 4 | 300 | Taft Keeper title |
| 5 | 400 | Local Legend; Gold frame |
| 6 | 500 | Rooftop Guardian title; Rooftop frame |

When verification pushes you to the next level, a level-up modal announces your new title and directs you to **My Activity > Rewards & badges**, where an unlocked frame can be equipped. XP is **not cash, a school incentive, an official certificate, or priority access to a government service**. Cosmetic features are optional, and report priority is based on accessibility/impact, not XP or popularity.

## Example pitch demonstration (3–5 minutes)

1. Open the public home page and show the interactive street map plus **From report to recorded action**.
2. Sign in as Citizen. Start a report, choose area/category, type a description, pin a location, **Save draft**, then **Review report** and submit.
3. Copy its `SQ-DEMO-...` receipt. Explore > list view shows your pending report only when signed in; others cannot browse it yet.
4. Sign out; sign in as Coordinator. Open the new case. Record notes, assign a coordinator, verify its status, and document a proposed referral (not a government action).
5. Sign in as Citizen again, track the report, follow it, and view XP after verification.
6. Explore another reviewed case and use **I experienced this too**. Switch to Coordinator to approve the confirmation; this awards 10 XP once.
7. To show exception paths, create an extra sample report and choose `duplicate` with the original reference, or choose `rejected` with a reason. For reopening, mark a case resolved through the appropriate status transitions, then ask the reporter to use **Request a recheck**.
8. Demonstrate the admin analytics and CSV/PDF exports. Clearly identify all figures as sample data.

## Integrated street map (V13)

Leaflet 1.9.4 and OpenStreetMap street tiles now power the Home and Explore maps and the report location picker. Pan/zoom with normal map controls; choose a pilot landmark to jump to its area. Open a category marker for status, location, and case details. Explore filters affect displayed reviewed markers.

The report form supports click-to-place and draggable pins, a Clear pin button, optional browser location permission, and saved draft locations. Area and landmark remain required even when no map pin is selected. Reports with no submitted coordinates use an explicitly approximate area marker; no random offsets are added. Sample coordinates and pilot landmarks are not field-verified. New submissions remain private until reviewed in this local demonstration.

**What “live” means here:** the street basemap loads online, and report changes can refresh automatically between tabs on the same browser/profile and origin using storage events. Open tabs with separate demo accounts to demonstrate citizen/coordinator updates. Active forms and dialogs are preserved rather than replaced by incoming refreshes. Use **Refresh reports** after finishing an action if needed. This is not a shared cross-device service, live traffic, or an official incident feed. Concurrent writes from several tabs can still conflict because localStorage is not a transactional database.

Use HTTPS or localhost for reliable same-origin storage and browser location permissions. File URLs may use separate storage contexts depending on the browser. No location is watched in the background.

Internet failure shows a visible map notice; the list and manual form remain available. OSM attribution stays visible and no offline tile download or prefetch is implemented. Tile-provider privacy and usage terms apply. See https://operations.osmfoundation.org/policies/tiles/ . For a larger deployment, choose an appropriate tile provider and a secure report backend.

## Browser-only limitations

This GitHub Pages version uses **localStorage and sessionStorage** and simulates user roles. Changes only exist in one browser/profile. Two different users on two devices will **not** see the same stored reports, and user identity / coordinator permissions are not secure. Image previews are limited by browser storage quotas. The basic EN/FIL switch translates key navigation items only; it is not a complete Filipino localization.

The actual deployment would require a secured API, shared database, real authentication, file storage, image moderation, consent/privacy policies, backups, monitoring, verified pilot boundaries and signed agreements with receiving agencies. See [`DEPLOYMENT_PLAN.md`](DEPLOYMENT_PLAN.md).

## V13 additions

Integrated Leaflet/OpenStreetMap report maps, category-marker popups, landmark navigation, real coordinate picking, private pending markers, and same-browser-tab refresh. Existing V12 rewards, drafts, review flow, coordinator tools, and exports are retained. See `V13_RELEASE_NOTES.md` and `V13_TEST_REPORT.md`. V12 and V11 notes remain as historical documentation; `screenshots_v12_legacy/` contains old screenshots, not captures of V13.

## Project documents

- [`PROJECT_BLUEPRINT.md`](PROJECT_BLUEPRINT.md): problem definition, user flows, use cases, data model and system architecture.
- [`DEPLOYMENT_PLAN.md`](DEPLOYMENT_PLAN.md): production requirements and security/privacy checklist.
- [`PITCH_AND_TESTING.md`](PITCH_AND_TESTING.md): four-page pitch, demonstration cases, acceptance tests and usability metrics.
- [`QA_REPORT.md`](QA_REPORT.md): tests run and known limits.
- [`CITIZEN_GUIDE.md`](CITIZEN_GUIDE.md) and [`COORDINATOR_GUIDE.md`](COORDINATOR_GUIDE.md): quick user instructions.

## Design direction

Friendly mint/cream/lavender styling, purposeful map interactions, readable spacing, optional pastel themes, a simple original mascot and an **original neighborhood-rooftop Guardian** unlock. The urban guardian motif is inspired by street-level stories; there are **no licensed Marvel characters, logos or images** in this project.

## V13.2 - Locked pilot coverage

Maps are restricted to the existing proposed Taft-Vito Cruz pilot rectangle: southwest 14.552, 120.985; northeast 14.574, 121.003. It includes the existing Vito Cruz, Benilde-DLSU, Ocampo, Arellano, and Rizal Memorial sample landmarks. This is a project coverage choice, not an official administrative boundary.

Hard pan limits, viewport-dependent minimum zoom, no world wrapping, bounded tile loading, and a dashed coverage outline apply to Home, Explore, and report maps. Resizing recalculates the zoom limit. Location clicks and dragged pins outside coverage are rejected by the existing coordinate validation. If an official pilot boundary is agreed later, update coverage consistently in the map, form/GPS validation, and demo API.
