# Aura Apex public privacy and support pages

Prepared 20 November 2026 in an isolated checkout. Website baseline: `bc51cab070b107ffafb25e60bd8369a2607decfb`, verified as `auraapexteam/aura_apex` remote main before this update.

## Scope

- `/privacy-policy` now renders the public Aura Apex policy instead of Page not found, including on a direct visit or trailing-slash URL. The existing Vercel SPA rewrite handles direct routes.
- The notice names Vedant Bute and `contact@auraapex.in`, describes the account/gym/optional fitness/city data and service providers, and supplies usable support/deletion links.
- `/delete-account` leads with the existing in-app action and retains the independent email pathway when the app is unavailable. Its old claim that deleted members' names/contact details remain is replaced by the deployed deletion/minimisation behavior.
- The home footer links to the policy. Existing home anchors, download view, support route and unknown-route behavior remain intact. No API, contact-form, dependency, credential or provider setting changes are included.

## Basis and boundaries

The operator confirmed the public contact, address and 13+ intended audience, including teens. The current optional birthday is not represented as verified age or guardian consent. No claim of compliance certification, India-only hosting, universal retention period or immediate deletion is made.

Deletion copy reflects production backend `4d58c09e2010186fd56605e6ed48695edb358ddb`: account access closes on acceptance; the processor removes the auth/profile, personal fitness history and associated personal uploads; retained gym-member/trainer names become deleted labels and personal/contact/note fields are cleared; necessary membership/payment/attendance facts and limited operational records can remain. A receipt distinguishes acceptance, pending cleanup, failure and completion. Production synthetic completion was independently verified on 20 November. This website work did not process a real member deletion.

The notice does not claim personal images are guaranteed private or advertise progress-photo upload. It does not claim real Apple token revocation has been verified. It does not invent record-expiry automation or an account-wide completion SLA. The operator still needs to operate the public privacy/support mailbox and answer account-specific retained-record questions accurately.

## Validation and publication

Run `node --test tests/*.test.cjs`, `npx tsc --noEmit` and `npm run build` with the existing installed dependencies. Focused tests render the policy and deletion resources, verify direct/trailing routes and request links, check the revised deletion categories, and preserve home/download routing and email fallback. Contact regressions use mocks and do not send mail.

Only the scoped source, tests and this README belong in the commit. Do not publish `.env`, credentials, `.git`, `node_modules`, or evidence files. No push or deployment is authorised to this child agent: the parent must review the commit first. After deployment, read back `https://www.auraapex.in/privacy-policy`, `/delete-account` and `/support` directly, check mobile readability and home/download navigation, then use the public privacy URL in the store listings.
