# Plain edition validation

- All 10 application/vendor scripts passed syntax parsing.
- Linked local script/style files are present.
- The existing 22 map DOM/logic checks and 5 API/storage checks passed in this separate edition.
- Additional checks passed for plain Home rendering, category navigation, login entry, signed-in XP, escaped report text, absence of presenter controls, and preservation of the original inline application logic except for separate storage keys.
- Actual browser rendering, mobile layout, third-party street-tile access, and full interactive regression testing were not performed in this environment. DOM tests use linkedom and a Leaflet test double.

Before presenting: use START_SIDEQUEST.bat, sign in with the citizen account, create and review a fictional report, sign out, log in with the coordinator account, review/verify it, then return to Track. Check the mobile viewport and all dialogs on your device.
