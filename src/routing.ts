export type Page = 'home' | 'download' | 'privacy' | 'terms' | 'support' | 'delete-account' | 'not-found';

export function resolvePage(pathname: string, hash = ''): Page {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return hash === '#download' ? 'download' : 'home';
  return ({
    '/privacy-policy': 'privacy',
    '/terms-of-service': 'terms',
    '/support': 'support',
    '/delete-account': 'delete-account',
  } as Record<string, Page>)[path] || 'not-found';
}
