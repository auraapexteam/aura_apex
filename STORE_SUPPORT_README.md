# Aura Apex support and external deletion resource

Prepared 12 October 2026. Production base: d5f5db9a2cb4c978b0dd7fe3a7176cb152137c20, verified as remote main before this work.

This change adds two public resources and home-footer links without publishing a privacy/terms draft:

- https://www.auraapex.in/support — working contact email and account, privacy and payment-help instructions.
- https://www.auraapex.in/delete-account — prominently requests Aura Apex account and associated-data deletion by email, with no app login/reinstallation requirement.

The owner reports contact@auraapex.in receives/sends mail and Vedant Bute monitors it. The email button prepares a draft; the visitor must send it. No message has been sent or real deletion request processed during this work. No automatic form service, new dependencies or account credentials are added. Existing live ContactSection/API behavior remains unchanged. Existing Vercel rewrites handle direct paths; publication and production readback still need verification.

Google explicitly permits a customer-service email as the external request pathway. An in-app deletion button does not replace the web resource. See [Play account deletion requirements](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en). This addresses only the external URL/request-resource requirement, not all account-deletion, Data safety, privacy or retention requirements.

## Mandatory operation before declaring the route verified

Vedant must acknowledge and operate this manual procedure:

1. Monitor contact@auraapex.in and recognize the subject “Aura Apex account deletion request”. Acknowledge requests and give an accurate expected process/time; do not invent a fixed SLA.
2. Verify account ownership securely before exposing personal information or acting. An address/phone typed in a message is insufficient. Do not request passwords or one-time sign-in codes. For inaccessible accounts, use a reviewed secure alternative; app installation/login is not a prerequisite for initiating a request.
3. Apply the reviewed account-deletion process after ownership verification. Use the accepted request reference to track associated-data cleanup and Apple authorization handling where applicable. Do not ask the customer for administrator credentials or private provider keys.
4. Explain the actual retained categories and the justified fields, purpose and end period/event. Resolve the retention decision below before claiming the deletion policy satisfies store requirements.
5. Confirm the completed account/data outcome separately from acknowledgement. Address any failure without falsely reporting completed deletion. Maintain only the request information needed for the process.

No staff/admin deletion tool was created or verified here. Do not perform ad-hoc SQL deletion, impersonation or partial database edits instead of the reviewed processor. If no authorized staff path exists, the public mailbox can receive requests, but operation is not fully verified until a secure executor exists.

## Retention gate remains open

Current gym records preserve membership/payment/attendance records and identifying details, including names/contact information. Owner preference is ordinary gym record keeping/discrepancy resolution. Exact retained fields, legal basis, authorized access and end period/event remain unapproved. The public page describes current retention without labelling it legally required. A request receipt alone does not demonstrate cleanup.

Do not enter a final retention period in store forms or publish a final privacy policy from this packet. Apple permits account-data retention where legally required; owner preference alone does not establish the exception. Play permits legitimate security/fraud/regulatory retention with a clear policy. See [Apple account deletion](https://developer.apple.com/help/app-review/guideline-reference/5-1-1-account-deletion) and the Play guidance above.

Exact source navigation was inspected: Profile → Privacy & account deletion → Request account deletion; the same privacy screen is accessible via Settings. Historical policy/support drafts used stale navigation and retention wording; those drafts are excluded.

## Validation and publication

Run the focused offline behavior tests, existing contact regressions, TypeScript and production build with existing installed dependencies. Tests render the new resources and check direct/trailing routes, preserved hash routes, safe email encoding, usable email fallback and no app-login form. They never send mail or use private environment files.

After publication, load both URLs directly and with trailing slashes, confirm the prominent email action and copyable address, verify mobile readability, and enter the external deletion URL in Play's Data safety form. Publish only the packet's changed source files after comparing remote main. Do not upload evidence/manifest, node_modules, .git, .env or dist as application source. The private full-app source packets remain separate.
