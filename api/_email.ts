import { Resend } from 'resend';

// Get Resend API Key from env
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const ADMIN_EMAIL = process.env.CONTACT_EMAIL || 'auraapex04@gmail.com';
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'Aura Apex <onboarding@resend.dev>';

/**
 * Format current timestamp in Asia/Kolkata timezone
 */
export function getKolkataTimestamp(): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(new Date());
}

/**
 * Send Contact Form Email to Admin (auraapex04@gmail.com)
 */
export async function sendContactEmail(payload: {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!resend) {
    console.warn('[EMAIL SERVICE] RESEND_API_KEY is not configured. Email notification simulated in dev mode.');
    return { success: true, id: 'dev-mode-simulated' };
  }

  const timestamp = getKolkataTimestamp();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #ffffff; padding: 24px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #222422;">
      <h2 style="color: #ccff00; border-bottom: 1px solid #222422; padding-bottom: 12px; margin-top: 0;">
        New Aura Apex Contact Form Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #a1a1aa; width: 140px;"><strong>Full Name:</strong></td>
          <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${escapeHtml(payload.fullName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #a1a1aa;"><strong>Email Address:</strong></td>
          <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #ccff00;">${escapeHtml(payload.email)}</a></td>
        </tr>
        ${payload.phone ? `
        <tr>
          <td style="padding: 8px 0; color: #a1a1aa;"><strong>Phone Number:</strong></td>
          <td style="padding: 8px 0; color: #ffffff;"><a href="tel:${escapeHtml(payload.phone)}" style="color: #ccff00;">${escapeHtml(payload.phone)}</a></td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 0; color: #a1a1aa;"><strong>Submission Date:</strong></td>
          <td style="padding: 8px 0; color: #ffffff;">${timestamp}</td>
        </tr>
      </table>
      <div style="background-color: #121312; border: 1px solid #222422; padding: 16px; border-radius: 8px; margin-top: 20px;">
        <h4 style="color: #a1a1aa; margin-top: 0; margin-bottom: 8px;">Message:</h4>
        <p style="white-space: pre-wrap; color: #e4e4e7; margin: 0; line-height: 1.6;">${escapeHtml(payload.message)}</p>
      </div>
      <footer style="margin-top: 24px; font-size: 12px; color: #a1a1aa; border-top: 1px solid #222422; padding-top: 12px; text-align: center;">
        Aura Apex Production Notification Engine &bull; Recipient: ${ADMIN_EMAIL}
      </footer>
    </div>
  `;

  try {
    const response = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `New Contact Message from ${payload.fullName}`,
      html: htmlContent,
      replyTo: payload.email,
    });

    if (response.error) {
      console.warn('[EMAIL SERVICE] Resend email warning:', response.error.message);
      return { success: false, error: response.error.message };
    }

    return { success: true, id: response.data?.id };
  } catch (err: any) {
    console.error('[EMAIL SERVICE] Contact email send error:', err.message || err);
    return { success: false, error: err.message || 'Failed to deliver email message' };
  }
}

/**
 * Send Demo Booking Notification to Admin & Visitor
 */
export async function sendDemoEmails(payload: {
  bookingId: string;
  fullName: string;
  email: string;
  companyName: string;
  teamSize: string;
  date: string;
  timeSlot: string;
}): Promise<{ success: boolean }> {
  if (!resend) {
    console.warn('[EMAIL SERVICE] RESEND_API_KEY is not configured. Demo confirmation email skipped in dev mode.');
    return { success: true };
  }

  const timestamp = getKolkataTimestamp();

  // 1. Admin Email Notification
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #ffffff; padding: 24px; border-radius: 12px;">
      <h2 style="color: #ccff00; border-bottom: 1px solid #222422; padding-bottom: 12px; margin-top: 0;">
        New Aura Apex Demo Booking
      </h2>
      <p style="font-family: monospace; font-weight: bold; color: #ccff00; font-size: 16px;">
        Booking ID: ${escapeHtml(payload.bookingId)}
      </p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #a1a1aa;">Full Name:</td><td style="color: #ffffff; font-weight: bold;">${escapeHtml(payload.fullName)}</td></tr>
        <tr><td style="padding: 8px 0; color: #a1a1aa;">Work Email:</td><td style="color: #ffffff;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #ccff00;">${escapeHtml(payload.email)}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #a1a1aa;">Company Name:</td><td style="color: #ffffff; font-weight: bold;">${escapeHtml(payload.companyName)}</td></tr>
        <tr><td style="padding: 8px 0; color: #a1a1aa;">Team Size:</td><td style="color: #ffffff;">${escapeHtml(payload.teamSize)}</td></tr>
        <tr><td style="padding: 8px 0; color: #a1a1aa;">Scheduled Date:</td><td style="color: #ccff00; font-weight: bold;">${escapeHtml(payload.date)}</td></tr>
        <tr><td style="padding: 8px 0; color: #a1a1aa;">Scheduled Time:</td><td style="color: #ccff00; font-weight: bold;">${escapeHtml(payload.timeSlot)}</td></tr>
        <tr><td style="padding: 8px 0; color: #a1a1aa;">Timestamp (IST):</td><td style="color: #a1a1aa;">${timestamp}</td></tr>
      </table>
    </div>
  `;

  // 2. Visitor Confirmation Email
  const visitorHtml = `
    <div style="font-family: Arial, sans-serif; background-color: #0b0b0b; color: #ffffff; padding: 24px; border-radius: 12px;">
      <h2 style="color: #ccff00; border-bottom: 1px solid #222422; padding-bottom: 12px; margin-top: 0;">
        Demo Confirmation — Aura Apex
      </h2>
      <p style="font-size: 16px; color: #e4e4e7;">
        Hi ${escapeHtml(payload.fullName)},
      </p>
      <p style="color: #a1a1aa; line-height: 1.6;">
        Your 1-on-1 Aura Apex platform demonstration session has been officially confirmed. We look forward to showing you how our fitness technology platform can empower ${escapeHtml(payload.companyName)}.
      </p>
      <div style="background-color: #121312; border: 1px solid #ccff00; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <h4 style="color: #ccff00; margin-top: 0; font-family: monospace;">BOOKING CONFIRMATION: ${escapeHtml(payload.bookingId)}</h4>
        <p style="margin: 4px 0;"><strong>Date:</strong> ${escapeHtml(payload.date)}</p>
        <p style="margin: 4px 0;"><strong>Time:</strong> ${escapeHtml(payload.timeSlot)}</p>
        <p style="margin: 4px 0;"><strong>Organization:</strong> ${escapeHtml(payload.companyName)}</p>
      </div>
      <p style="font-size: 13px; color: #a1a1aa;">
        If you need to reschedule or have questions prior to the call, please reply to this email or reach us at <a href="mailto:${ADMIN_EMAIL}" style="color: #ccff00;">${ADMIN_EMAIL}</a>.
      </p>
      <footer style="margin-top: 24px; font-size: 12px; color: #a1a1aa; border-top: 1px solid #222422; padding-top: 12px;">
        &copy; 2024 Aura Apex, Inc. All rights reserved. &bull; San Francisco, CA
      </footer>
    </div>
  `;

  // Send admin notification
  try {
    const adminRes = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [ADMIN_EMAIL],
      subject: 'New Aura Apex Demo Booking',
      html: adminHtml,
    });
    if (adminRes.error) {
      console.warn('[EMAIL SERVICE] Admin demo email warning:', adminRes.error.message);
    }
  } catch (err: any) {
    console.warn('[EMAIL SERVICE] Admin demo email failed:', err.message || err);
  }

  // Send visitor confirmation
  try {
    const visitorRes = await resend.emails.send({
      from: SENDER_EMAIL,
      to: [payload.email],
      subject: `Aura Apex Demo Confirmation - ${payload.bookingId}`,
      html: visitorHtml,
    });
    if (visitorRes.error) {
      console.warn('[EMAIL SERVICE] Visitor confirmation email warning (Resend free/testing tier restriction):', visitorRes.error.message);
    }
  } catch (err: any) {
    console.warn('[EMAIL SERVICE] Visitor confirmation email failed:', err.message || err);
  }

  return { success: true };
}

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
