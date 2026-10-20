# SIDEQUEST V13 - Integrated street-map update

Based on the supplied V12 ZIP. Original branding and non-map workflows are retained.

## Implemented
- Bundled Leaflet 1.9.4, BSD-2-Clause license included, and online OSM standard street tiles.
- Replaced illustrated maps on Home, Explore, and desktop/mobile report forms.
- Category marker icons, status popups, and View report details actions.
- Pilot landmark dropdown, reset view, zoom/pan, and manual Refresh reports.
- Click/drag report location picker with coordinate readout and clear-pin action.
- Shared selection across desktop/mobile forms, draft restore, and existing opt-in GPS.
- Area/category/status/date filters for public markers and personal pending markers.
- Explicit area-level fallback when no report pin exists; never invent random coordinates.
- Detached map cleanup and size observation when layouts change.
- Offline tile feedback and accessible report list retained.
- Same-browser/profile/origin storage-event refresh across tabs; report forms and open dialogs are preserved.
- Removed V12's separate street iframe, since report pins now share the street basemap.

## Boundaries
This remains a static classroom demo. Online basemap does not mean verified live incident data. No server, cross-device synchronization, traffic feed, real authentication, government dispatch, or new partnerships were added. File-URL storage behavior varies; use localhost or HTTPS for cross-tab demonstrations. Sample/landmark coordinates and rectangular pilot bounds are illustrative and require local validation. Coincident markers keep their coordinates and may overlap; zoom/open the list to inspect them. A shared production service needs server authorization, database concurrency controls, validated boundaries, and an appropriate tile provider.

## Run
Extract the entire archive. Run START_SIDEQUEST.bat (Windows with Python 3) or python3 start_sidequest.py, while online. Do not open index.html directly for online maps. Keep vendor/ and every CSS/JS file together. Prefer VS Code Live Server for a localhost origin and predictable storage. Upload the full project root to GitHub Pages when ready; no public deployment was performed in this update.

## Tests
See V13_TEST_REPORT.md. Optional repeatable logic checks: npm install, then npm test. Development dependencies are only for tests; the website itself is buildless.

## V13.1 - OSM access-blocked launch fix

The screenshot shows an OSM access-blocked tile response. A likely cause for the previously recommended double-click launch is the missing HTTP Referer from file URLs; the image alone does not establish the provider's exact blocking rule. V13.1 adds an HTTP launcher, origin-preserving referrer policies, a file-URL tile request guard, and persistent map troubleshooting guidance. Provider/network/privacy blocks can still occur on a hosted origin and cannot be removed by this application. No proxy, tile-server rotation, forged referrer, cache bypass, or retry loop was added.

## V13.2 - Locked pilot area
- Hard maxBounds viscosity (1), responsive minimum zoom calculated with getBoundsZoom(bounds, true), and panInsideBounds enforcement.
- Visible dashed coverage rectangle and coverage label.
- noWrap and tile bounds restrict map tile coverage.
- Reset view respects the zoom limit.
- Coverage coordinates retain the existing map/API validation rectangle; no new official boundary is claimed.
