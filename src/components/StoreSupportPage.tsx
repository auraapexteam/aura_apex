import React from 'react';
import { ArrowLeft, LifeBuoy, Mail, ShieldCheck, Trash2 } from 'lucide-react';
import { DELETION_MAILTO, SUPPORT_EMAIL, supportMailto } from '../support';
import type { Page } from '../routing';

const linkClass = 'text-cyber-lime underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';
const buttonClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyber-lime px-5 py-3 font-bold text-black hover:bg-cyber-limeHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyber-lime';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-t border-white/10 pt-7"><h2 className="text-xl font-bold text-white mb-3">{title}</h2><div className="space-y-3 text-sm sm:text-base leading-7 text-cyber-textMuted">{children}</div></section>;
}

function PrivacyPolicyContent() {
  return <>
    <Section title="Who operates Aura Apex">
      <p>Aura Apex is operated by Vedant Bute. This policy covers the Aura Apex mobile app and the auraapex.in website, including account, gym membership, fitness-profile and support features.</p>
      <p>For privacy questions or requests, email <a className={linkClass} href={supportMailto('Aura Apex privacy request')}>{SUPPORT_EMAIL}</a>. Vedant Bute monitors this inbox.</p>
      <p>Business contact address: A 405, Phase 2, Vision Indradhanu, A Wing, Aher Chikhali, Chikhali-Akurdi Road, Pimpri Chinchwad, Pune, Maharashtra 412105, India.</p>
    </Section>
    <Section title="Information we process">
      <ul className="list-disc pl-5 space-y-3">
        <li><strong className="text-white">Account information:</strong> your name, email, phone number, account identifier, role, profile details and sign-in information. When you choose Google or Apple sign-in, the provider supplies the identity information you authorise, such as a name, email and provider identifier.</li>
        <li><strong className="text-white">Gym services:</strong> gym association, membership and plan details, attendance and check-in records, payment amounts, status and transaction references. Your gym may enter or update information as part of administering your membership.</li>
        <li><strong className="text-white">Optional fitness information:</strong> details you choose to provide, such as date of birth, gender, height, weight, fitness goals, exercise experience, diet preferences, health conditions or injuries, and fitness activity you record. These fields are optional; the app provides a way to continue without the optional profile information.</li>
        <li><strong className="text-white">Images:</strong> an optional profile image you choose to provide where the feature is available, and gym photos supplied for display. Images may be displayed in the app or to gym staff as relevant to the feature. Do not put medical documents or other confidential material in a profile or gym image.</li>
        <li><strong className="text-white">Support and website inquiries:</strong> the contact details and message you submit. Demo requests also include your company or gym name, team size and selected appointment details.</li>
        <li><strong className="text-white">Technical information:</strong> service-request and error information, such as network addresses, request and response times, and error details, used to operate and protect the service.</li>
      </ul>
    </Section>
    <Section title="Location, photos and your choices">
      <p>The optional “Use current location” action asks for device location permission to find your city. The city can be saved in your fitness profile. You can enter a city manually or leave it blank, and you can change location permission in your device settings. This feature is not a background location-tracking service.</p>
      <p>Photo or camera access is requested when you choose a feature that needs it, such as selecting an image or scanning a gym check-in code. You can decline or change device permissions; features that depend on that permission may then be unavailable.</p>
      <p>The fitness profile is based on information you enter. Aura Apex does not use Apple HealthKit or Google Health Connect in this version. Fitness information supports personal records and gym services; it is not a medical diagnosis or treatment service.</p>
    </Section>
    <Section title="How information is used and shared">
      <p>We use information to create and secure accounts, provide sign-in, show and manage gym memberships, record check-ins, process and reconcile payments, save the optional fitness features you select, answer requests and investigate service problems or misuse.</p>
      <p>Your gym and its authorised staff can access member, membership, attendance and payment information needed to administer gym services. Contact your gym about information it keeps independently of Aura Apex.</p>
      <p>Service providers process information needed for their functions. These include Supabase for authentication, database and storage; Render for the app backend; Vercel for the website; Google or Apple when you choose their sign-in; and Razorpay when you use its payment checkout. Payment credentials are handled by the payment provider; Aura Apex records membership payment references and status. Website inquiry and demo features use Resend for email and can use Neon for demo-booking storage when configured.</p>
      <p>When you use Razorpay checkout, its payment SDK declares collection of contact and address information, payment information, device identifiers, checkout interactions, and crash and diagnostic information. Its declared purposes include payment functionality, analytics and product personalisation, depending on the data type. Read <a className={linkClass} href="https://razorpay.com/buyer-privacy-notice/">Razorpay’s Buyer Privacy Notice</a> for its handling of payment-service data.</p>
      <p>Providers may process information in countries other than your own. Their processing is also governed by their applicable terms and privacy notices. We may disclose information when required by an applicable legal obligation or to address fraud, security incidents or threats to people or the service.</p>
    </Section>
    <Section title="Retention and account deletion">
      <p>Account and optional fitness information is used while your account and the selected features are active. You can request correction, access or deletion by emailing <a className={linkClass} href={supportMailto('Aura Apex privacy request')}>{SUPPORT_EMAIL}</a>. We may need to verify ownership before disclosing information or changing an account.</p>
      <p>To delete from the app, open Profile → Privacy &amp; account deletion → Request account deletion. The same privacy screen is available from Settings. An external <a className={linkClass} href="/delete-account">account-deletion request</a> is available if you cannot use the app.</p>
      <p>Once an in-app deletion request is accepted, account access is closed and the deletion process removes the sign-in account, profile, personal fitness logs and associated personal uploads. Retained gym-member and trainer records have names replaced with deleted labels and email, phone, address and other personal profile or note fields cleared. Membership, payment and attendance facts and limited operational records can remain; deletion does not erase a gym’s transaction history or independently held records.</p>
      <p>Deletion runs as a process with retries. An accepted request is not proof that every cleanup step has finished. Use the deletion receipt or contact support to check completion or a failure. We do not promise an immediate or fixed completion time.</p>
      <p>Retention of remaining transaction, security or request records depends on the purpose and any applicable record-keeping requirement. There is no single published retention period for every category. Ask support which records remain for your account, why, and the applicable period or event for their removal.</p>
      <p>Deleting Aura Apex does not delete your Google or Apple account, cancel a separate payment arrangement, or automatically refund gym fees. Ask your gym or payment provider about those arrangements.</p>
    </Section>
    <Section title="Teen users">
      <p>Aura Apex is intended for people aged 13 and older, including teenagers. It is not intended for children under 13. An optional date-of-birth field is not an age-verification or guardian-consent system. If you believe a child’s information has been provided inappropriately, contact <a className={linkClass} href={supportMailto('Aura Apex child privacy concern')}>{SUPPORT_EMAIL}</a> so we can investigate and address the account and information.</p>
    </Section>
    <Section title="Security and changes">
      <p>We use authentication, access controls and encrypted network connections to protect the service. No service can guarantee absolute security. Do not send passwords, sign-in codes or payment credentials in support messages.</p>
      <p>We will update this page when our data practices change. The date above identifies this version. For help with a request or concern, use <a className={linkClass} href="/support">Aura Apex support</a>.</p>
    </Section>
  </>;
}

export function StoreSupportPage({ page }: { page: Page }) {
  const deletion = page === 'delete-account';
  const privacy = page === 'privacy-policy';
  const found = deletion || privacy || page === 'support';
  const Icon = privacy ? ShieldCheck : deletion ? Trash2 : LifeBuoy;
  return <section className="bg-grid-overlay min-h-screen pt-12 sm:pt-20 pb-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <a href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-cyber-textMuted hover:text-cyber-lime mb-8"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Aura Apex home</a>
      <div className="flex items-center gap-2 text-cyber-lime text-xs font-mono uppercase tracking-widest"><Icon className="w-5 h-5" aria-hidden="true" /> Aura Apex</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 tracking-tight">{privacy ? 'Privacy Policy' : deletion ? 'Request account deletion' : found ? 'Aura Apex support' : 'Page not found'}</h1>
      <p className="text-cyber-textMuted text-base sm:text-lg leading-7 mt-4 max-w-2xl">{privacy ? 'How Aura Apex processes information and how to contact us or request deletion. Last updated 20 November 2026.' : deletion ? 'Request deletion of your Aura Apex account and associated data without reinstalling or signing into the app.' : found ? 'Get help with your Aura Apex account, app, memberships or privacy requests.' : 'This address does not match an Aura Apex page.'}</p>
      <div className="mt-10 rounded-2xl border border-cyber-cardBorder bg-cyber-card p-5 sm:p-9 space-y-8">
        {privacy ? <PrivacyPolicyContent /> : deletion ? <>
          <Section title="Delete from the app">
            <p>If you have access, open Profile → Privacy &amp; account deletion → Request account deletion. You can also find Privacy &amp; account deletion in Settings. The app provides a deletion receipt to check progress. The email route below is available when you cannot use the app.</p>
          </Section>
          <Section title="Send a deletion request">
            <p>Email <a className={linkClass} href={DELETION_MAILTO}>{SUPPORT_EMAIL}</a> with the subject “Aura Apex account deletion request”. If possible, write from your registered email. For a phone-based account, include the registered phone number so support can arrange an ownership check.</p>
            <a className={buttonClass} href={DELETION_MAILTO}><Mail className="w-5 h-5" aria-hidden="true" /> Prepare deletion email</a>
            <p className="text-xs">This opens an email draft. Review and send it to submit your request. Nothing is sent automatically. If no email app opens, copy the address and send the request through your email service.</p>
          </Section>
          <Section title="Ownership and completion">
            <p>Your email starts a manual request; opening a draft does not delete an account. Support must verify account ownership before acting. You do not need to reinstall or sign into the app to send the request.</p>
            <p>Do not send passwords, verification codes, payment PINs, card security codes or identity documents in the initial message. If you cannot use your registered email or phone, explain that in the request and ask for a secure verification method.</p>
            <p>Support will explain the process and expected timing for your account, including any records that remain and why. Ask for confirmation of the completed outcome; an acknowledgement is not a deletion confirmation.</p>
          </Section>
          <Section title="Data and membership records">
            <p>An accepted in-app deletion request closes account access and starts removal of the sign-in account, profile, personal fitness logs and associated personal uploads. The process replaces retained gym-member and trainer names with deleted labels and clears email, phone, address and other personal profile or note fields.</p>
            <p>Membership, payment and attendance facts and limited operational records can remain. Ask support which records remain for your account, their purpose and the applicable period or event for removal. A gym may also hold records independently of Aura Apex.</p>
            <p>Cleanup runs with retries; an accepted request is not a completed deletion. Check your deletion receipt or contact support for the outcome. We do not promise an immediate or fixed completion time.</p>
            <p>Account deletion does not itself refund membership fees or delete a separate Google or Apple account. Ask your gym about membership/payment disputes or any separate recurring payment arrangement. Gym approval or resolving a dispute is not a condition for sending a deletion request.</p>
          </Section>
          <Section title="Read the privacy policy">
            <p>See the <a className={linkClass} href="/privacy-policy">Aura Apex Privacy Policy</a> for the information we process, providers and privacy choices.</p>
          </Section>
        </> : found ? <>
          <Section title="Contact us">
            <p>Email <a className={linkClass} href={supportMailto('Aura Apex support request')}>{SUPPORT_EMAIL}</a>. Explain the issue and include the device/app version when relevant. Share only what is needed to identify and understand the problem.</p>
            <a className={buttonClass} href={supportMailto('Aura Apex support request', 'Hello Aura Apex support,\n\nI need help with: \nDevice/app version (if relevant): \n\nWhat happened: ')}><Mail className="w-5 h-5" aria-hidden="true" /> Prepare support email</a>
            <p className="text-xs">Review and send the email draft to submit it. If no email app opens, copy the address and email us through your email service.</p>
          </Section>
          <Section title="Account and privacy requests">
            <p>Contact us about sign-in problems, profile corrections or data requests. Ownership checks may be needed before an account is changed or personal information is shared. Do not send passwords, verification codes, payment credentials or identity documents in your initial message.</p>
            <p>You can <a className={linkClass} href="/delete-account">request account and associated-data deletion</a> even if you no longer have the app.</p>
          </Section>
          <Section title="Gym memberships and payments">
            <p>Ask your gym about plan availability, gym access and membership/payment disputes. Include the relevant payment reference when contacting Aura Apex about an app issue; do not include banking credentials.</p>
          </Section>
        </> : <p className="text-cyber-textMuted">Visit <a className={linkClass} href="/support">support</a> for help.</p>}
      </div>
      <nav aria-label="Information pages" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <a className={linkClass} href="/privacy-policy">Privacy Policy</a>
        <a className={linkClass} href="/support">Support</a>
        <a className={linkClass} href="/delete-account">Request account deletion</a>
        <a className={linkClass} href="/">Home</a>
      </nav>
    </div>
  </section>;
}
