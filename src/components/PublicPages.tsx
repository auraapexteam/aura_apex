import React from 'react';
import { ArrowLeft, ArrowUpRight, Mail, ShieldCheck, Trash2, LifeBuoy, FileText } from 'lucide-react';
import { DELETION_MAILTO, SUPPORT_EMAIL, supportMailto } from '../support';
import type { Page } from '../routing';

const linkClass = 'text-cyber-lime underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';
const buttonClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyber-lime px-5 py-3 font-bold text-black hover:bg-cyber-limeHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyber-lime';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-t border-white/10 pt-7"><h2 className="text-xl font-bold text-white mb-3">{title}</h2><div className="space-y-3 text-sm sm:text-base leading-7 text-cyber-textMuted">{children}</div></section>;
}

function PageLayout({ title, description, icon: Icon, children, review = false }: {
  title: string; description: string; icon: React.ElementType; children: React.ReactNode; review?: boolean;
}) {
  return <section className="bg-grid-overlay min-h-[75vh] pt-32 sm:pt-40 pb-20">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <a href="/" className="inline-flex items-center gap-2 text-sm text-cyber-textMuted hover:text-cyber-lime mb-8"><ArrowLeft className="w-4 h-4" /> Home</a>
      <div className="flex items-center gap-2 text-cyber-lime text-xs font-mono uppercase tracking-widest"><Icon className="w-5 h-5" /> Aura Apex</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 tracking-tight">{title}</h1>
      <p className="text-cyber-textMuted text-base sm:text-lg leading-7 mt-4 max-w-2xl">{description}</p>
      {review && <aside aria-label="Document review status" className="mt-7 border-l-2 border-cyber-lime pl-4 text-sm leading-6 text-gray-300">
        <strong className="block text-cyber-lime">Review draft — not a final published policy</strong>
        Prepared for owner review. Retention, access controls and consent arrangements still need approval and verification. This page does not establish store or legal compliance.
      </aside>}
      <div className="mt-10 rounded-2xl border border-cyber-cardBorder bg-cyber-card p-5 sm:p-9 space-y-8">{children}</div>
    </div>
  </section>;
}

export function PrivacyPage() {
  return <PageLayout title="Privacy policy" description="How Aura Apex handles account, gym, fitness and website information." icon={ShieldCheck} review>
    <Section title="About this draft">
      <p>This draft covers the Aura Apex Android and iOS apps, related account services and this website. Aura Apex is operated by Vedant Bute, a sole proprietor trading as Aura Apex, at A-405, A Wing, Vision Indradhanu, Phase 2, Aher, Chikhali, Pimpri-Chinchwad, Pune, Maharashtra 412105, India. Privacy questions can be sent to <a className={linkClass} href={supportMailto('Aura Apex privacy question')}>{SUPPORT_EMAIL}</a>.</p>
      <p>Questions and privacy requests can be sent to <a className={linkClass} href={supportMailto('Aura Apex privacy request')}>{SUPPORT_EMAIL}</a>. A final effective date will be set when the approved policy is published.</p>
    </Section>
    <Section title="Information handled by the app">
      <p>Account services handle names, email addresses, phone numbers, account identifiers, profile images and sign-in sessions. Google or Apple sign-in, when chosen, supplies identity information; it does not give Aura Apex your Google or Apple password.</p>
      <p>Profile and fitness features handle information you enter: date of birth, gender, height, weight, health conditions, goals, preferences, city/location text and personal logs such as workouts, water, protein, sleep, steps, progress and notes. These records may contain sensitive health information.</p>
      <p>Gym features handle bookmarks, joining requests, membership plans/status, attendance, QR check-in tokens and notifications. Razorpay handles checkout; Aura Apex processes related contact details, order/payment identifiers, amounts, currency, verification and payment status. Do not send passwords, payment PINs or one-time codes to support.</p>
      <p>Selected images may be uploaded for profile or progress features. Camera access supports QR scanning; the photo picker supports selected uploads. The reviewed app uses manually entered fitness/location information rather than automatic HealthKit, Health Connect or GPS collection.</p>
    </Section>
    <Section title="Website messages and demo requests">
      <p>The contact form sends the name, email, optional phone number and message you supply through Resend. Demo bookings additionally handle your organisation, team size, preferred date/time and booking identifier; saved bookings use Neon PostgreSQL. Hosting and email providers process technical information needed to deliver these services. Opening a support email link prepares a draft in your own email application; you must send it to submit a request.</p>
    </Section>
    <Section title="Purposes and service providers">
      <p>Information supports sign-in and recovery, profiles and fitness history, gym discovery and membership administration, check-ins, payment reconciliation, notifications, support and service security. Permission to use a device feature is separate from consent for other processing.</p>
      <p>Supabase provides authentication, database and image storage. The app API is hosted on Render; the website and web portal use Vercel. Razorpay, Google and Apple support payment/sign-in features. The website uses Neon and Resend for its forms. Each provider may process data according to its own services and privacy notice.</p>
      <p>No current advertising, unrelated analytics or AI processing by Aura Apex was established in the reviewed app. Future purposes require a separate explanation and any required consent; this draft does not authorise them.</p>
    </Section>
    <Section title="Access, security and processing locations">
      <p>Authenticated requests and HTTPS protect account API traffic. Gym staff may see information through gym-management features. The current field-level limits on that access have not yet been fully verified, so this draft cannot promise that all personal fitness information is accessible only to its account owner.</p>
      <p>Uploaded avatars and progress images currently use a shared public storage bucket. Anyone who has an image URL may retrieve it without signing in. Private image protection and cleanup must be verified before a final policy makes stronger promises.</p>
      <p>Reviewed hosting settings place the Render API in the United States and the Supabase project in South Korea. Other provider systems, email, logs and backups may use additional locations. The service must not be described as storing all data in India. Provider locations, safeguards and retention still need a complete review.</p>
    </Section>
    <Section title="Retention and account deletion">
      <p>The intended post-deletion retained set is limited to name, payment history and necessary contact information for justified financial-record purposes. The operator intends personal health and fitness data to be deleted. Actual retention periods, required contact fields, backup handling and deletion of uploaded files have not yet been verified; this is an intended model, not a guarantee of current cleanup.</p>
      <p>The app offers Profile → Settings → Privacy → Delete account permanently. You may also <a className={linkClass} href="/delete-account">request deletion without the app</a>. Ownership must be verified before support acts. A request or an on-screen success message alone does not prove every database, image, authentication or provider copy has been removed.</p>
      <p>Deletion does not itself issue a refund or delete a separate Google/Apple account. Ask the gym about membership/payment disputes and support about your Aura Apex account. Support must explain any necessary retained records and confirm the completed outcome.</p>
    </Section>
    <Section title="Your requests and younger users">
      <p>Contact <a className={linkClass} href={supportMailto('Aura Apex privacy request')}>{SUPPORT_EMAIL}</a> about access, correction, consent withdrawal or other privacy concerns. The available account summary is not a complete data export. Request verification, response procedures and complaint escalation need final review.</p>
      <p>Under-18 users may currently register. Age assessment and verifiable parent/guardian consent have not yet been established as working controls. Child-data notices, consent and rights handling must be implemented and verified for the actual audience before this draft is finalised.</p>
    </Section>
    <Section title="Changes and contact">
      <p>The final policy will carry an effective date and describe how material changes are communicated. Until then, this page remains a review draft. Visit <a className={linkClass} href="/support">support</a> for account, privacy or service questions.</p>
    </Section>
  </PageLayout>;
}

export function TermsPage() {
  return <PageLayout title="Terms of service" description="Proposed service terms for the Aura Apex app and related services." icon={FileText} review>
    <Section title="Status and scope"><p>These are proposed terms for owner review, not approved contractual terms or a custom Apple EULA. Aura Apex is operated by Vedant Bute, a sole proprietor trading as Aura Apex. Its public business address is A-405, A Wing, Vision Indradhanu, Phase 2, Aher, Chikhali, Pimpri-Chinchwad, Pune, Maharashtra 412105, India. Aura Apex supports gym discovery, memberships, payments, check-ins and personal fitness tracking. Service-provider responsibilities, eligibility rules, dispute process and acceptance mechanism still need final approval.</p></Section>
    <Section title="Accounts and acceptable use"><p>Use accurate account information, keep sign-in credentials private and contact support if you suspect unauthorised access. Do not use another person's account, misuse check-in codes, falsify payment/attendance records, access someone else's data or interfere with service security.</p><p>Upload only information and images you are entitled to provide. Your content is used to deliver the features you choose, subject to the actual sharing settings and the approved privacy policy. No blanket permission for unrelated use is proposed.</p></Section>
    <Section title="Gym services and payments"><p>Available plans, prices and membership conditions are shown by the relevant gym and checkout flow. Ask the gym about service availability or payment disputes. A final set of terms must identify who supplies each purchased service and the applicable cancellation/refund conditions; this draft does not invent those rules.</p><p>Account deletion does not automatically issue a refund or cancel a separate payment mandate. Support must explain any additional action needed for your account or payment arrangement.</p></Section>
    <Section title="Privacy and account closure"><p>Read the <a href="/privacy-policy" className={linkClass}>privacy review draft</a> for information handling and current review limitations. It does not replace required consent. Use the in-app deletion control or <a href="/delete-account" className={linkClass}>external deletion request</a>; the verified result and any necessary retention must be communicated.</p></Section>
    <Section title="Availability and distribution"><p>Connectivity, maintenance or provider outages can affect the service. Account restrictions, support/appeal procedures and the treatment of paid memberships need final approval. App Store distribution also uses the applicable software licence terms; these service terms do not replace them.</p></Section>
    <Section title="Contact"><p>Send questions to <a className={linkClass} href={supportMailto('Aura Apex terms question')}>{SUPPORT_EMAIL}</a>. The final document will include an effective date and lawful dispute terms.</p></Section>
  </PageLayout>;
}

export function SupportPage() {
  return <PageLayout title="How can we help?" description="Get help with your account, app, payments or privacy requests." icon={LifeBuoy}>
    <Section title="Contact Aura Apex"><p>Email <a className={linkClass} href={supportMailto('Aura Apex support request')}>{SUPPORT_EMAIL}</a>. Describe the issue, the device/app version if relevant, and the email or phone associated with your account. Share only information needed to understand the problem.</p><a className={buttonClass} href={supportMailto('Aura Apex support request', 'Hello Aura Apex support,\n\nI need help with: \n\nAccount email or phone: \nDevice/app version (if relevant): \n\nWhat happened: ')}><Mail className="w-5 h-5" /> Prepare support email</a><p className="text-xs">This opens your email app. Review and send the message to submit it. You can also copy the address and email it directly.</p></Section>
    <Section title="Account and privacy"><p>For sign-in problems, profile corrections or data requests, contact support. Do not include your password, OTP, payment PIN or a full identity document in the initial email. Ownership checks may be needed before information is shared or an account is changed.</p><p>For account closure, use the <a className={linkClass} href="/delete-account">deletion request page</a>. Our <a className={linkClass} href="/privacy-policy">privacy</a> and <a className={linkClass} href="/terms-of-service">terms</a> pages are currently review drafts.</p></Section>
    <Section title="Membership and payment issues"><p>Ask your gym about plan availability, gym access and membership/payment disputes. Include a booking or payment reference when contacting support about an app issue; never send card security codes or banking credentials.</p></Section>
  </PageLayout>;
}

export function DeleteAccountPage() {
  return <PageLayout title="Request account deletion" description="Start an Aura Apex account and personal-data deletion request without reinstalling the app." icon={Trash2}>
    <Section title="Request deletion by email"><p>Email <a className={linkClass} href={DELETION_MAILTO}>{SUPPORT_EMAIL}</a> with the subject “Aura Apex account deletion request”. If possible, write from your registered email. For a phone-based account, include the registered phone number and ask support for a secure ownership-verification process.</p><a className={buttonClass} href={DELETION_MAILTO}><Mail className="w-5 h-5" /> Prepare deletion request <ArrowUpRight className="w-4 h-4" /></a><p className="text-xs">The button prepares an email draft. Nothing is sent automatically, and opening it does not delete your account. If you have no email app configured, copy the address and send the request using your email service.</p></Section>
    <Section title="What happens next"><ol className="list-decimal pl-5 space-y-3"><li>Send the request with your account email or phone. Do not include passwords, one-time codes, payment credentials or identity documents in the initial message.</li><li>Support must verify that you own the account before acting. An entered email address alone does not authorise deletion.</li><li>Support reviews account closure and associated-data cleanup, explains any records that must be retained and their reason/duration, and confirms the outcome. A request acknowledgement is not a completion confirmation.</li></ol><p>This is a manual support request channel. End-to-end deletion, uploaded-file cleanup, provider/session handling and response procedures still require validation. We cannot currently promise that a request instantly removes every copy.</p></Section>
    <Section title="Data and consequences"><p>Account closure removes app access when completed. The intended model deletes personal fitness history while retaining only justified name, payment history and necessary contact information for financial records. The precise retained fields, lawful purpose and retention period must be confirmed by support; the current backend has not yet been validated against that model.</p><p>Deletion does not itself refund membership fees, cancel a separate payment mandate or delete your Google/Apple account. Contact the gym about membership/payment disputes. Gym approval or resolving a dispute is not a condition for sending an account-deletion request.</p></Section>
    <Section title="If you still have the app"><p>Open Profile → Settings → Privacy → Delete account permanently. For an error or an unconfirmed result, email support to confirm the account's status. Read the <a className={linkClass} href="/privacy-policy">privacy review draft</a> for the current retention and access limitations.</p></Section>
  </PageLayout>;
}

export function PublicPage({ page }: { page: Page }) {
  if (page === 'privacy') return <PrivacyPage />;
  if (page === 'terms') return <TermsPage />;
  if (page === 'support') return <SupportPage />;
  if (page === 'delete-account') return <DeleteAccountPage />;
  return <PageLayout title="Page not found" description="This address does not match an Aura Apex page." icon={LifeBuoy}><a className={buttonClass} href="/">Return home</a><p className="text-cyber-textMuted">Need help? Visit <a className={linkClass} href="/support">support</a>.</p></PageLayout>;
}
