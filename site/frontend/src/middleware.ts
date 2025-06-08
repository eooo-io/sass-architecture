import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/settings',
  '/profile',
  '/team',
  '/analytics'
];

// Paths that are only accessible to non-authenticated users
const authPaths = [
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has('auth_token');

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));

  // Redirect authenticated users trying to access auth pages to dashboard
  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect non-authenticated users trying to access protected pages to login
  if (!isAuthenticated && isProtectedPath) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
};
