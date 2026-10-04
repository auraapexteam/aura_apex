export const SUPPORT_EMAIL = 'contact@auraapex.in';

export function supportMailto(subject: string, body = ''): string {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const DELETION_MAILTO = supportMailto('Aura Apex account deletion request',
  'Hello Aura Apex support,\n\nI want to delete my Aura Apex account and associated personal data.\n\nRegistered account email or phone: \n\nPlease verify that I own this account through a secure process and explain any records that must be retained, why, and for how long. Please confirm the outcome when the request is completed.\n\nI have not included any passwords or one-time codes.');
