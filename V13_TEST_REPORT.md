# V13 checks performed

## Passed in this update
- JavaScript syntax parsing: all five original inline scripts, enhancements.js, v12.js, live-map.js, and the bundled Leaflet script.
- 18 DOM/logic checks with linkedom and a Leaflet test double: initial-load map migration; coordinate bounds and invalid values; approximate area fallback; exclusion of unreviewed reports; safe popup escaping and detail action; own pending visibility; sign-out privacy; category filtering; detached map cleanup; synchronized desktop/mobile coordinate selection; drag updates; clear pin; status filter; preservation of unsent forms during refresh.
- 5 existing demo API/storage checks: submitted coordinates persist, pending report excluded from public listing, signed-out access denied, coordinator verification publishes the report with its coordinates, and case data is saved for same-origin storage.
- Project-relative HTML script/style references resolve to included files. Leaflet source and license are included.

## Not verified here
Visual browser testing and external tile rendering were unavailable in this session. The DOM tests use a map test double, not the real browser layout engine or actual Leaflet canvas rendering. Real-device touch, provider availability, GPS, storage events between actual tabs, resizing, and full V12 regression flows still need a manual browser check. This report does not claim a production/security/accessibility audit.

## Manual check before presenting
1. Extract everything; open index.html online, preferably through localhost/HTTPS.
2. Home: confirm real streets, attribution, zoom controls, landmarks, and category markers. Click a marker and View report details.
3. Explore: choose category/area/status/date filters; compare the map to the list and check an empty result.
4. Citizen: open Report, select a map point, drag it, clear it, select again, save a draft, restore it, and submit a fictional case. Verify the reference and coordinates.
5. Sign out: pending case must not appear publicly. As coordinator, review then verify it; confirm it becomes public.
6. Open two tabs of the same localhost/HTTPS origin with separate demo sessions. Record a status change in one; check the other refreshes. Leave a report form open and verify it is not erased.
7. Resize to 390px; inspect mobile map, popup, controls, form, and attribution. Keep OSM attribution visible.
8. Disconnect internet: confirm tile notice and list/manual reporting fallback. Reconnect and use Refresh/reset if needed.
9. Smoke-test V12 draft, review, tracking, rewards, coordinator, and export flows on your presentation device.

## V13.1 regression checks
- Four additional DOM checks passed: file URLs do not request tiles; file-mode launcher instructions appear; HTTP tile options preserve the origin referrer; repeated tile failures show help without automated retries.
- Three HTTP launcher checks passed: index.html, Leaflet JS, and live-map.js all return 200 and the configured Referrer-Policy header. The test server was stopped after checking.
- The 18 map logic checks and 5 existing API/storage checks passed again.
- Actual provider acceptance and street imagery were not visually verified. The screenshot alone cannot distinguish file/referrer, network, privacy-extension, or provider-level enforcement.

## V13.2 boundary checks
22 DOM/map-logic checks and 5 API/storage checks passed. Four additional checks cover hard pan-lock configuration, minimum zoom enforcement, the visible rectangle, and noWrap/bounded tile options. Existing out-of-area coordinate validation remains tested. Tests use a Leaflet test double; real Leaflet pan/zoom behavior and mobile resizing still need a manual browser check.
