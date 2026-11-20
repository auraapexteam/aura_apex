export type Page = 'home' | 'download' | 'support' | 'delete-account' | 'privacy-policy' | 'not-found';

export function resolvePage(pathname: string, hash = ''): Page {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return hash === '#download' ? 'download' : 'home';
  if (path === '/support') return 'support';
  if (path === '/delete-account') return 'delete-account';
  if (path === '/privacy-policy') return 'privacy-policy';
  return 'not-found';
}
