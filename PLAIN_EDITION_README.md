# SIDEQUEST: Taft Radar — Final School Edition

This is a separate, working plain edition of the current SIDEQUEST V13.2 app. It uses the original reporting/account/coordinator logic with a neutral black-and-white interface.

## Open
For easy access, double-click SIDEQUEST_Final.html. Reporting and tracking work locally; street tiles pause on a file address. See FINAL_START_HERE.txt for the presentation flow and accounts.

For the online street map: Extract everything. On Windows, double-click START_SIDEQUEST.bat (Python 3 required) and leave its terminal open. Or use VS Code Live Server / GitHub Pages. Internet is required for street tiles. Do not open index.html directly for the online map.

## Included workflows
- Public Home and Area map, with real streets, issue markers, category/area/status filters, and the locked pilot boundary.
- Citizen registration/login, structured reporting, optional location and photo, draft save/restore, duplicate suggestions, review, and receipt.
- Tracking with dated status history, information requests, follow updates, referral sent/accepted notes, and rechecks.
- Separate coordinator workspace through the coordinator account: review, duplicate linking, requests for information, referrals, confirmations/rechecks, analytics, and export.
- My Activity and existing verified participation rewards.

## Removed from the previous plain prototype
No presenter names, previous/next-page controls, simulated mobile preview, rehearsal reset, or schematic map placeholders. The layout responds to the actual screen width.

## Local accounts for checking
Citizen: explorer@example.test / DemoOnly123!
Second citizen: neighbor@example.test / DemoOnly123!
Coordinator: coordinator@example.test / DemoOnly123!
Use the regular Log in form. Cosmetic/decorative home elements and quick-demo account buttons are hidden in this edition.

## Current boundary
This is a functioning browser-local prototype, not a deployed production service. Data and accounts remain on the current browser/profile; there is no secure backend, multi-device report sharing, or official agency connection. The plain edition has its own local report storage and does not overwrite the original V13 records. Photos, coordinates, and sample cases are for fictional testing only.

The underlying V13 documents are retained for implementation context; this file describes the plain edition specifically.
