import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/lib/i18n/config';
import { toDefaultLocalePath } from '@/lib/i18n/runtime';

const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false,
});

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname === '/ko'
    || pathname.startsWith('/ko/')
    || pathname === '/ja'
    || pathname.startsWith('/ja/')
  ) {
    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = toDefaultLocalePath(pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(en|ko|ja)/:path*'],
};
