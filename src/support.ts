export const SUPPORT_EMAIL = 'contact@auraapex.in';

export function supportMailto(subject: string, body = ''): string {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const DELETION_MAILTO = supportMailto(
  'Aura Apex account deletion request',
  'Hello Aura Apex support,\n\nPlease delete my Aura Apex account and associated personal data.\n\nRegistered account email or phone: \n\nPlease verify account ownership securely and explain the expected process, any records that remain, why they remain, and how long they are kept. Please confirm the completed outcome.\n\nI have not included passwords, verification codes or payment credentials.',
);
