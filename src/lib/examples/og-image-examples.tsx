/**
 * Example: Dynamic OG Images Usage
 */

import { constructMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';

// Example 1: Using Dynamic OG Image (Default)
export async function generateMetadata1({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Pages' });

    return constructMetadata({
        title: t('calculator.title'), // "Kalkulator Weton" or "Weton Calculator"
        description: t('calculator.description'),
        canonical: '/kalkulator-weton',
        locale,
        // useDynamicOG: true is default
    });

    // Generated OG image URL:
    // https://ageinfo.online/api/og?title=Kalkulator%20Weton&locale=id
}

// Example 2: Disable Dynamic OG, Use Static Image
export async function generateMetadata2({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return constructMetadata({
        title: 'About Us',
        description: 'Learn more about AgeInfo',
        canonical: '/about',
        locale,
        image: '/static-og-about.png', // Static image
        useDynamicOG: false, // Disable dynamic generation
    });
}

// Example 3: Custom Dynamic Image with Specific Title
export async function generateMetadata3({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const customTitle = locale === 'id'
        ? 'Hitung Umurmu Sekarang!'
        : 'Calculate Your Age Now!';

    return constructMetadata({
        title: customTitle,
        description: 'Free premium age calculator',
        canonical: '/',
        locale,
        useDynamicOG: true, // Will use /api/og with customTitle
    });

    // Generated OG image will display:
    // ID: "Hitung Umurmu Sekarang!" with purple gradient
    // EN: "Calculate Your Age Now!" with purple gradient
}

// Example 4: Testing OG Image Directly
// Visit these URLs in browser:
// http://localhost:3000/api/og?title=Kalkulator%20Weton&locale=id
// http://localhost:3000/api/og?title=Calculate%20Your%20Age&locale=en

// Example 5: Preview in Social Media Debuggers
// Facebook: https://developers.facebook.com/tools/debug/
// Twitter: https://cards-dev.twitter.com/validator
// LinkedIn: https://www.linkedin.com/post-inspector/

// Paste your page URL:
// https://ageinfo.online/id/kalkulator-weton
// → Image will show: "Kalkulator Weton - Cek Hari Lahirmu"
