/**
 * Middleware - Fase 90.5: Edge Runtime Configuration
 * Handles i18n routing with edge runtime for maximum performance
 * Implements selective X-Robots-Tag headers for SEO control
 */

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

// Paths that should not be indexed by search engines
const noIndexPaths = [
    '/admin',
    '/dashboard',
    '/settings',
    '/preview',
    '/test',
    '/dev',
    '/api',
    '/_next',
];

// Utility: Check if path should be excluded from indexing
function shouldNoIndex(pathname: string): boolean {
    return noIndexPaths.some((path) => pathname.startsWith(path));
}

// Create the base next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files
    const shouldSkip = [
        '/api/',
        '/_next/',
        '/_vercel/',
        '/favicon.ico',
        '/robots.txt',
        '/sitemap.xml',
        '/manifest.json',
    ].some(path => pathname.startsWith(path));

    const hasFileExtension = /\.[^/]+$/.test(pathname);

    if (shouldSkip || hasFileExtension) {
        return NextResponse.next();
    }

    // Smart locale detection for root path
    if (pathname === '/') {
        const acceptLanguage = request.headers.get('accept-language');
        let preferredLocale = routing.defaultLocale;

        if (acceptLanguage) {
            const languages = acceptLanguage
                .split(',')
                .map(lang => {
                    const [locale, q = 'q=1'] = lang.trim().split(';');
                    const quality = parseFloat(q.replace('q=', ''));
                    return { locale: locale.toLowerCase(), quality };
                })
                .sort((a, b) => b.quality - a.quality);

            for (const { locale } of languages) {
                const langCode = locale.split('-')[0];
                if (routing.locales.includes(langCode as any)) {
                    preferredLocale = langCode as typeof routing.defaultLocale;
                    break;
                }
            }
        }

        const url = request.nextUrl.clone();
        url.pathname = `/${preferredLocale}`;
        return NextResponse.redirect(url);
    }

    // Handle trailing slashes
    if (pathname !== '/' && pathname.endsWith('/')) {
        const url = request.nextUrl.clone();
        url.pathname = pathname.slice(0, -1);
        return NextResponse.redirect(url, 308);
    }

    // Run next-intl middleware
    const response = intlMiddleware(request);

    // Add X-Robots-Tag header for internal/private pages
    if (shouldNoIndex(pathname)) {
        response.headers.set(
            'X-Robots-Tag',
            'noindex, nofollow, noarchive, nosnippet'
        );
    } else {
        // Allow full crawling for public pages
        response.headers.set(
            'X-Robots-Tag',
            'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        );
    }

    // Add security headers
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Add performance headers
    response.headers.set('X-DNS-Prefetch-Control', 'on');

    return response;
}

// ✅ Edge Runtime Configuration for maximum performance
export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/'],
    runtime: 'experimental-edge', // ✅ Edge Runtime for peak performance
};
