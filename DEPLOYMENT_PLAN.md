# SIDEQUEST · Production deployment & privacy plan

This document describes **future engineering work**. The provided GitHub Pages version is not a public reporting service and cannot deliver this security just by being hosted.

## Launch blockers

**P0: Required before collecting real reports**

- Authorize a receiving organization and designate a responsible case owner, contact, acceptance procedure, and escalation policy for every supported category.
- Replace localStorage user/report data with a secure backend and shared relational database. Use server-side role enforcement on *every* action. Never accept a `role=admin` field from open registration.
- Account verification, secure password hashing (Argon2id or equivalent), login rate limits, session expiry, CSRF protections where applicable, password reset by verified email, and admin account provisioning.
- Validate files by MIME/content, size and malware scan; limit upload types; strip image EXIF/location if not necessary; store privately; use signed access URLs; moderate any public evidence.
- Define exact geographical coverage and boundary validation. Use real coordinate-based basemap and calibrated point placement if exact location matters for authorities.
- Publish privacy notice, retention schedule, deletion/contact rights, optional location consent, and role-based rules describing what appears publicly.
- Limit sensitive categories. Implement emergency redirection and don't promise response service levels without written agreements.
- Add audit logs immutable to staff, referral receipts, repeat-report prevention, monitoring, backups and documented data recovery.

**P1: Pilot hardening**

- Add request throttling, bot protection, reporter verification and robust duplicate detection with coordinator override.
- Store attachments at rest with access-controlled object storage; add image review and content moderation.
- Implement a status machine with distinct `referred`, `referral_accepted`, `action_in_progress`, `resolved`, and `recheck_requested` transitions.
- Add notification subscriptions and opt-outs, accessibility audit to WCAG 2.2 AA, data portability, transaction logs, and partial/offline resilience.
- Localize all UI strings (English/Filipino), not just top navigation.
- Performance test slow mobile data and lower-end Android devices. Cache assets responsibly and respect map-provider usage terms.

## Suggested production roles

| Role | Can do | Cannot do |
| --- | --- | --- |
| Visitor | Browse moderated public reports | See private submissions or reporter identities |
| Verified reporter | Submit, edit draft, view own reports, follow and confirm | Change case status or access another user's private evidence |
| Area coordinator | Moderate, classify, assign, route, and update cases in assigned area | Access cases outside authorized scope without permission |
| Supervisor | Review escalations, audit staff actions, export approved statistics | Silently delete or alter audit history |
| Receiving-office agent | See only specifically referred cases permitted by partner agreement | Browse all user account data |

## Suggested retention & safety principles

- Store only necessary personal information; anonymous public displays do not imply anonymous internal records.
- Never display private coordinator notes or unreviewed evidence publicly.
- Retain private data for a limited published period; establish reporting deletion and legal hold rules with the partner organization.
- Require active consent for GPS. Do not track movement in the background. Do not use geolocation for quests or dangerous scavenger hunts.
- Award only verified nonduplicate rewards. Rewards and popular confirmations must not override severity, accessibility or statutory requirements in assigning priority.
- Never advertise a case as "resolved" solely because a referral was emailed or an office label was selected.

## Repository safety

The static demonstration intentionally contains only fictional sample data and demo credentials. It does **not** contain live API tokens or actual participants. Do not upload `.env` files, real passwords, production databases, access keys, or unmoderated personal photos to GitHub. If this code is later wired to a database, revisit all frontend scripts: browser-side role checks and hashes are **not** security mechanisms.
