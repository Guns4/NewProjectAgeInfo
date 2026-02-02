import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'id'],

    // Used when no locale matches
    defaultLocale: 'en',

    // Use 'always' for consistent SEO-friendly URLs
    // This ensures /en and /id prefixes are always visible
    localePrefix: 'always',

    // Locale detection configuration
    localeDetection: true,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation(routing);
