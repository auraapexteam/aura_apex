export const DEMO_TIME_ZONE = 'Asia/Kolkata';
export const DEMO_TIME_SLOTS = [
  { label: '09:00 AM IST', period: 'Morning' },
  { label: '11:00 AM IST', period: 'Morning' },
  { label: '01:30 PM IST', period: 'Afternoon' },
  { label: '03:00 PM IST', period: 'Afternoon' },
  { label: '04:30 PM IST', period: 'Late Afternoon' },
  { label: '06:00 PM IST', period: 'Evening' },
] as const;

function indiaDate(now: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: DEMO_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) => parts.find(item => item.type === type)!.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

// Offer the next six weekdays, starting tomorrow in the service's time zone.
// These are selectable preferences; the database checks whether a slot is taken.
export function getDemoDates(now = new Date()) {
  const cursor = new Date(`${indiaDate(now)}T12:00:00+05:30`);
  const dates: { day: string; date: string; value: string }[] = [];
  for (let offset = 1; dates.length < 6 && offset <= 14; offset++) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    if (cursor.getUTCDay() === 0 || cursor.getUTCDay() === 6) continue;
    dates.push({
      value: indiaDate(cursor),
      day: new Intl.DateTimeFormat('en-IN', { timeZone: DEMO_TIME_ZONE, weekday: 'short' }).format(cursor),
      date: new Intl.DateTimeFormat('en-IN', { timeZone: DEMO_TIME_ZONE, month: 'short', day: 'numeric', year: 'numeric' }).format(cursor),
    });
  }
  return dates;
}

export function isOfferedDemoDate(date: string, now = new Date()): boolean {
  return getDemoDates(now).some(day => day.value === date);
}

export function isOfferedDemoTime(time: string): boolean {
  return DEMO_TIME_SLOTS.some(slot => slot.label === time);
}
