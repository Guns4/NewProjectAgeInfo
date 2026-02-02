import { Metadata, Viewport } from 'next';

export const siteConfig = {
    name: 'AgeInfo.Online',
    description: 'Premium Age Calculator & Life Tools. Discover your precise age, biorhythms, and life milestones.',
    url: 'https://ageinfo.online',
    ogImage: 'https://ageinfo.online/og.jpg',
    links: {
        twitter: '@ageinfo', // Placeholder
        github: 'https://github.com/Guns4/Project-AgeInfo',
    },
};

export const defaultMetadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    authors: [{ name: 'AgeInfo Team' }],
    creator: 'AgeInfo',
    metadataBase: new URL(siteConfig.url),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: siteConfig.links.twitter,
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
};

export const defaultViewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: '#020617' }, // Soft Navy from Phase 7
    ],
};

/**
 * Helper to generate JSON-LD structured data
 * @param data - The structured data object (excluding @context)
 * @returns JSON string for script/ld+json
 */
export function generateJsonLd<T extends object>(data: T) {
    return JSON.stringify({
        '@context': 'https://schema.org',
        ...data,
    });
}
