import React from 'react';
import { ArrowLeft, LifeBuoy, Mail, Trash2 } from 'lucide-react';
import { DELETION_MAILTO, SUPPORT_EMAIL, supportMailto } from '../support';
import type { Page } from '../routing';

const linkClass = 'text-cyber-lime underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';
const buttonClass = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyber-lime px-5 py-3 font-bold text-black hover:bg-cyber-limeHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyber-lime';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-t border-white/10 pt-7"><h2 className="text-xl font-bold text-white mb-3">{title}</h2><div className="space-y-3 text-sm sm:text-base leading-7 text-cyber-textMuted">{children}</div></section>;
}

export function StoreSupportPage({ page }: { page: Page }) {
  const deletion = page === 'delete-account';
  const found = deletion || page === 'support';
  const Icon = deletion ? Trash2 : LifeBuoy;
  return <section className="bg-grid-overlay min-h-screen pt-12 sm:pt-20 pb-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <a href="/" className="inline-flex min-h-11 items-center gap-2 text-sm text-cyber-textMuted hover:text-cyber-lime mb-8"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Aura Apex home</a>
      <div className="flex items-center gap-2 text-cyber-lime text-xs font-mono uppercase tracking-widest"><Icon className="w-5 h-5" aria-hidden="true" /> Aura Apex</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold mt-4 tracking-tight">{deletion ? 'Request account deletion' : found ? 'Aura Apex support' : 'Page not found'}</h1>
      <p className="text-cyber-textMuted text-base sm:text-lg leading-7 mt-4 max-w-2xl">{deletion ? 'Request deletion of your Aura Apex account and associated data without reinstalling or signing into the app.' : found ? 'Get help with your Aura Apex account, app, memberships or privacy requests.' : 'This address does not match an Aura Apex page.'}</p>
      <div className="mt-10 rounded-2xl border border-cyber-cardBorder bg-cyber-card p-5 sm:p-9 space-y-8">
        {deletion ? <>
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
            <p>Deletion closes access to the Aura Apex app account. Current gym membership, attendance and payment records may remain, including names and contact details. Ask support which records remain for your account, their purpose and when they will be removed.</p>
            <p>This page provides a request channel and does not promise that every record is removed immediately. Support must address your request for associated personal data, including fitness history and uploaded images.</p>
            <p>Account deletion does not itself refund membership fees or delete a separate Google or Apple account. Ask your gym about membership/payment disputes or any separate recurring payment arrangement. Gym approval or resolving a dispute is not a condition for sending a deletion request.</p>
          </Section>
          <Section title="Delete from the app">
            <p>If you still have access, open Profile → Privacy &amp; account deletion → Request account deletion. You can also find Privacy &amp; account deletion in Settings. The email route above is available when you cannot use the app. Contact support if you need help or have not received confirmation.</p>
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
      <nav aria-label="Support pages" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <a className={linkClass} href="/support">Support</a>
        <a className={linkClass} href="/delete-account">Request account deletion</a>
        <a className={linkClass} href="/">Home</a>
      </nav>
    </div>
  </section>;
}
