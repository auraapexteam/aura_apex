# Website review and support handoff

The website now handles `/privacy-policy`, `/terms-of-service`, `/support` and
`/delete-account`, including trailing slashes and direct visits. Vercel's existing
SPA rewrite serves these pages; the root download hash and section anchors remain.
Privacy and terms are explicitly review drafts. Do not remove that status or
publish these changes as approved legal documents merely because routes exist.

## Owner review before publication

- Confirm the proposed operator and business address against the intended store
  identity. Approve final wording and the actual publication/effective date.
- Verify the current provider inventory and processing locations. The reviewed
  Render API is in the United States and Supabase is in South Korea; no claim that
  all processing remains in India is justified.
- Reconcile the owner's intended retention model with actual deletion, public
  images, backups, sessions and provider copies. Specify the necessary financial
  fields, lawful purpose, retention period and expiry. Do not promise cleanup
  until the backend and storage behavior are verified.
- Complete child/health-data consent and rights-handling procedures for the actual
  audience. Align store declarations and the released app with the final policy.
- Check the existing Android release download and build new mobile artifacts
  when their source changes. No APK, IPA, signing or store settings were changed here.

## External support and deletion request procedure

The public action opens an encoded email draft to `contact@auraapex.in`. The user
must send it. No form, email or production deletion was exercised by this change.
The operator must confirm that this inbox receives mail and is monitored before
promoting the page as an operational external deletion channel.

1. Acknowledge receipt separately from completion. Track the request with limited
   necessary information; opening a mail link is not proof of submission.
2. Verify account ownership through the registered account/recovery channel or a
   reviewed secure process. An email address entered in a message is not sufficient.
   Do not ask for passwords, payment PINs, OTPs or documents in the initial email.
3. Route the verified request to the authorised account administrator. Check all
   server/auth/storage/provider outcomes. Do not use the currently unvalidated
   partial-success fallback as proof of complete deletion.
4. Explain necessary retained fields, reason and actual retention period. Handle
   app access, fitness data, uploaded files, sessions and restoration from backups
   according to the approved procedure. Gym approval/payment-dispute resolution
   must not be added as a prerequisite for sending the request.
5. Confirm the actual result, including any partial failure and follow-up, through
   the verified channel. A deletion acknowledgement does not promise a refund or
   cancel a separate payment mandate. Do not invent a response deadline.

## Form configuration and validation

Contact needs `RESEND_API_KEY` and a configured verified `SENDER_EMAIL`. Demo
booking additionally needs `DATABASE_URL`. `CONTACT_EMAIL` defaults to
`contact@auraapex.in`. Missing configuration returns HTTP 503 without pretending to
store or send. If email fails after a booking is saved, the API returns a partial
outcome with the booking ID and the UI advises against submitting it again.

Dates are the next six weekdays beginning tomorrow in Asia/Kolkata; both client
and server share the window/slot validation. Existing unique-slot database
protection remains. Dates are preferences, not a calendar invitation or a live
availability feed.

Run `npm run typecheck`, `npm test` and `npm run build`. Tests use stubbed provider
and database calls. Before release, test the approved pages, inbox receipt and
operator workflow separately with authorised test accounts/messages. No public
deployment or production submission was performed during verification. A review
branch or pull request does not publish or approve these draft legal documents.
