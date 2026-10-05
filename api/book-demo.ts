import type { VercelRequest, VercelResponse } from '@vercel/node';
import { executeQuery } from './_db.js';
import { isEmailConfigured, sendDemoEmails } from './_email.js';
import crypto from 'crypto';
import { isOfferedDemoDate, isOfferedDemoTime } from '../shared/demo-schedule.js';

// In-memory rate limiting map (IP -> timestamp)
const rateLimitMap = new Map<string, number>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    // 1. Rate Limiting Check (5 seconds per IP)
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const lastRequest = rateLimitMap.get(clientIp) || 0;
    if (now - lastRequest < 5000) {
      return res.status(429).json({
        success: false,
        message: 'Rate limit exceeded. Please wait a few seconds before submitting again.',
      });
    }
    rateLimitMap.set(clientIp, now);

    // 2. Validate Input Payload
    const { date, timeSlot, fullName, email, companyName, teamSize } = req.body || {};

    const trimmedDate = typeof date === 'string' ? date.trim() : '';
    const trimmedTime = typeof timeSlot === 'string' ? timeSlot.trim() : '';
    const trimmedName = typeof fullName === 'string' ? fullName.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const trimmedCompany = typeof companyName === 'string' ? companyName.trim() : '';
    const trimmedTeam = typeof teamSize === 'string' ? teamSize.trim() : '10-50';

    if (!isOfferedDemoDate(trimmedDate)) {
      return res.status(400).json({ success: false, message: 'Please select one of the next available weekdays. Past dates and dates outside the booking window cannot be booked.' });
    }

    if (!isOfferedDemoTime(trimmedTime)) {
      return res.status(400).json({ success: false, message: 'Please select a listed time slot for your demo.' });
    }

    if (!trimmedName) {
      return res.status(400).json({ success: false, message: 'Please enter your full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid work email address.' });
    }

    if (!trimmedCompany) {
      return res.status(400).json({ success: false, message: 'Please enter your company or gym name.' });
    }

    if (!process.env.DATABASE_URL || !isEmailConfigured()) {
      return res.status(503).json({ success: false, message: 'Online demo booking is unavailable. Please email contact@auraapex.in to arrange a walkthrough.' });
    }

    // 3. Store the booking only when its required services are configured.
    const bookingId = `APEX-${new Date().getFullYear()}-${crypto.randomBytes(6).toString('hex').toUpperCase()}`;

    if (process.env.DATABASE_URL) {
      // Double Booking Check (booking_date + booking_time)
      const existing = await executeQuery(
        'SELECT id FROM demo_bookings WHERE booking_date = $1 AND booking_time = $2 LIMIT 1',
        [trimmedDate, trimmedTime]
      );

      if (existing && existing.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'This time slot is no longer available. Please select another time.',
        });
      }

      // Insert Booking
      await executeQuery(
        `INSERT INTO demo_bookings 
         (booking_id, full_name, work_email, company_name, team_size, booking_date, booking_time, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'CONFIRMED')`,
        [bookingId, trimmedName, trimmedEmail, trimmedCompany, trimmedTeam, trimmedDate, trimmedTime]
      );
    }

    // 4. Send Confirmation & Admin Emails
    const emailResult = await sendDemoEmails({
      bookingId,
      fullName: trimmedName,
      email: trimmedEmail,
      companyName: trimmedCompany,
      teamSize: trimmedTeam,
      date: trimmedDate,
      timeSlot: trimmedTime,
    });

    if (!emailResult.success) {
      return res.status(502).json({
        success: false,
        bookingSaved: true,
        bookingId,
        notificationSent: false,
        message: 'Your booking was saved, but email notification could not be confirmed. Do not submit it again; email contact@auraapex.in with your booking reference for meeting arrangements.',
      });
    }

    return res.status(200).json({
      success: true,
      bookingId,
      bookingSaved: true,
      notificationSent: true,
    });
  } catch (error: any) {
    console.error('API /api/book-demo error:', error);
    
    // Handle Postgres unique constraint violation explicitly
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'This time slot is no longer available. Please select another time.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Something went wrong processing your booking. Please try again.',
    });
  }
}
