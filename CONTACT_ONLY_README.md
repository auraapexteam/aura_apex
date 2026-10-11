# Aura Apex Contact-only correction — 12 October 2026

Production source base: `79bf04c0258bf7f78b4b4e291d94d79c6a82a9c1`.

This small change corrects the website's public support address to `contact@auraapex.in`, provides a visible direct-email action and stops the automatic contact form reporting success without a configured email service or provider acceptance.

## Existing support mailbox

The owner has verified incoming and outgoing mail for `contact@auraapex.in`. The website's **Email support** link uses that existing mailbox. It opens a draft in the visitor's email application; the visitor must review and send it. Opening a draft is not message submission or confirmed receipt. The link requires no new email-provider account. No DNS changes are part of this release.

## Automatic contact form

The existing automatic form uses Resend. The owner says Aura Apex has never used Resend. This release does not create an account, choose a replacement provider, supply credentials or require the owner to enable automatic delivery.

The direct-email action remains available while automatic form delivery is unconfigured. In that state the form returns HTTP 503 with an actionable support address, and the page provides a clickable Email support fallback. Optional automatic delivery requires a privately configured `RESEND_API_KEY` and an explicit, provider-verified `SENDER_EMAIL`; the code can check only that these values are nonblank, not that the sender/domain is actually verified. Contact notifications default to `contact@auraapex.in`; an existing `CONTACT_EMAIL` environment override takes precedence and must be checked before a future automatic-delivery test.

Provider rejection, exceptions and missing/invalid provider message IDs return failure. A successful response means the provider accepted the message, not that a mailbox received it. Delivery requires a separate approved live form submission and inbox receipt check once a service is configured.

## Exact scope

Runtime files:

- `api/_email.ts`: new isolated contact recipient/sender and contact configuration check; contact send fails closed and requires a nonblank provider message ID.
- `api/contact.ts`: reject unconfigured automatic contact delivery before sending; report provider acceptance accurately.
- `src/components/ContactSection.tsx`: public support address, direct-email actions and honest acceptance/failure guidance.

Review/validation files:

- `tests/contact-only.test.cjs`: isolated offline provider/configuration tests.
- `CONTACT_ONLY_README.md`: this handoff.

No `App.tsx`, routing, privacy/terms/deletion/support pages, demo booking, package manifests, dependency locks, DNS, account registration or unrelated marketing changes are included. Existing office/location and other marketing copy are left as the production base. The exported legacy `ADMIN_EMAIL` and `SENDER_EMAIL` defaults and the complete `sendDemoEmails` function are intentionally unchanged; they still carry legacy demo behavior. New private contact constants avoid altering that shared demo behavior. Other launch-checklist bundles remain separate and must not be substituted for this packet.

The existing anti-spam honeypot intentionally returns an apparent success for bot submissions without sending; normal visitors leave that hidden field empty. That anti-spam behavior is unchanged.

## Local validation and owner publication

Use existing project dependencies and run:

```text
node --test tests/contact-only.test.cjs
node node_modules/typescript/bin/tsc --noEmit
node node_modules/typescript/bin/tsc --noEmit --strict --module ESNext --moduleResolution bundler --target ES2020 --skipLibCheck --esModuleInterop --types node api/_email.ts api/contact.ts
node node_modules/vite/bin/vite.js build
```

The tests stub all provider calls and use synthetic `.invalid` addresses and test-only keys. They never load real environment files, send email or contact production services. Type checking and the web build do not verify live email delivery.

Local results on 12 October 2026: **16 offline tests passed**, frontend TypeScript and strict contact-API TypeScript passed, the production web build passed, and an independent source review found no blockers. Validation used the already-installed Node 24.12.0, TypeScript 5.9.3, Vite 5.4.21 and Resend 6.22.1; no dependencies were downloaded or changed. Demo implementation/defaults match the production base after newline normalization.

Owner publication should start from the stated production base, reconcile any newer remote changes, and review only these five files. Do not upload `.git`, `node_modules`, build output, `.env` files or this packet's evidence/manifest as application source. The packet includes SHA-256 source hashes and validation evidence so the owner can compare files before publication. No GitHub or Vercel publication has been performed by the agent.

After owner publication, verify that `/#contact` shows `contact@auraapex.in`, the Email support action prepares a correctly addressed draft, and an unconfigured automatic form reports unavailable with that fallback. Do not label automatic form delivery operational until an approved real submission appears in the intended mailbox.
