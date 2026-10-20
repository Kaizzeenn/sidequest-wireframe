# SIDEQUEST V11 · Quality assurance notes

**Release type:** Static classroom prototype / GitHub Pages demo. **Not a production launch.**

## Executed checks

- Public landing: homepage appears without forced login; process and sample resolved history visible.
- Citizen demo: sign-in, report category/location/description validation, draft save/restore, review modal, receipt and private pending case.
- Explore: category and area filtering, status and date filtering, sorting, list view, illustrated map and pending-case separation.
- Coordinator demo: role-based operations screen, analytics, report queue, metadata form, public and private notes, case update actions.
- Tracking: case details, follow list in My Activity, last action and proposed office, printed / downloaded PDF.
- Case PDF downloaded through Chromium and validated as a readable PDF using PyMuPDF.
- Responsive check: 390×844 mobile viewport displayed without horizontal overflow.
- JavaScript: no uncaught errors during tested steps.

## Still requires testing

- Different local browser storage policies (especially private-browsing and `file://` restrictions).
- Real-device browsers on Android/iOS, keyboard-only navigation across *all* dialogs, screen readers and full WCAG 2.2 contrast audit.
- Production map tile availability / provider terms, GPS accuracy and true spatial boundary tests.
- Full database backend, cross-device synchronization, login verification, spam/threat testing, file security and actual partner referrals.
- Visual inspection of every possible status transition, and multi-day XP limit testing.

## Key known limitations

1. Sample reports and demo IDs are fictional. LocalStorage data can be edited in browser tools. Nothing is sent to an agency.
2. Passwords/roles are demo simulations; no real security or password recovery exists in the static version.
3. The illustrated map is approximate; the external OpenStreetMap link shows real streets, but not SIDEQUEST report pins.
4. The exported PDF is a text case summary; **Print with evidence** renders permitted before/after images so visitors can use the browser's Save as PDF.
5. CSV exports are spreadsheet-compatible; native Excel `.xlsx` is not generated.
6. EN/FIL language switching covers navigation only; the rest is English.
7. Follow updates are displayed within this browser's My Activity, not pushed by email/SMS.
8. Uploads are compressed for the browser demo, and large numbers of images can exhaust local storage.

**Recommendation:** Ready to host as a classroom demonstration with prominent demo labeling, not as a public issue intake service.
