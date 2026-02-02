/**
 * Locale Detection Utilities
 * Helper functions for smart language detection and user locale preferences
 */

import { routing } from '@/i18n/routing';

/**
 * Parse Accept-Language header and return preferred locale
 * 
 * @param acceptLanguageHeader - The Accept-Language header from request
 * @returns Preferred locale code (e.g., 'en', 'id')
 * 
 * @example
 * parseAcceptLanguage('id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7') // returns 'id'
 * parseAcceptLanguage('en-US,en;q=0.9') // returns 'en'
 */
export function parseAcceptLanguage(acceptLanguageHeader: string | null): string {
    if (!acceptLanguageHeader) {
        return routing.defaultLocale;
    }

    // Parse and sort by quality value
    const languages = acceptLanguageHeader
        .split(',')
        .map(lang => {
            const [locale, q = 'q=1'] = lang.trim().split(';');
            const quality = parseFloat(q.replace('q=', ''));
            return {
                locale: locale.toLowerCase(),
                quality: isNaN(quality) ? 1 : quality
            };
        })
        .sort((a, b) => b.quality - a.quality);

    // Find first matching locale from our supported locales
    for (const { locale } of languages) {
        // Extract language code (e.g., 'id-ID' -> 'id')
        const langCode = locale.split('-')[0];

        if (routing.locales.includes(langCode as any)) {
            return langCode;
        }
    }

    return routing.defaultLocale;
}

/**
 * Detect if user is from Indonesia based on various signals
 * 
 * @param request - Next.js request object
 * @returns true if user is likely from Indonesia
 */
export function isIndonesianUser(acceptLanguageHeader: string | null): boolean {
    if (!acceptLanguageHeader) {
        return false;
    }

    const lowerHeader = acceptLanguageHeader.toLowerCase();
    return lowerHeader.includes('id-id') || lowerHeader.includes('id;');
}

/**
 * Get locale from pathname
 * 
 * @param pathname - URL pathname
 * @returns Locale code if found in path, null otherwise
 * 
 * @example
 * getLocaleFromPathname('/en/about') // returns 'en'
 * getLocaleFromPathname('/id') // returns 'id'
 * getLocaleFromPathname('/about') // returns null
 */
export function getLocaleFromPathname(pathname: string): string | null {
    const segments = pathname.split('/').filter(Boolean);
    const firstSegment = segments[0];

    if (firstSegment && routing.locales.includes(firstSegment as any)) {
        return firstSegment;
    }

    return null;
}
