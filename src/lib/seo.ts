/**
 * Master SEO Utility - Fase 91-95
 * Comprehensive metadata management for Next.js App Router
 * 
 * Features:
 * - Easy metadata construction with type safety
 * - Automatic og:tags and twitter:card
 * - Canonical URL management per locale
 * - Prevents duplicate content issues
 * - Supports all OpenGraph and Twitter meta tags
 */

import { Metadata } from 'next';

const siteConfig = {
    name: 'AgeInfo',
    description: 'Premium age calculator for accurate age calculations',
    url: 'https://ageinfo.online',
    ogImage: '/og-image.png',
    twitterCreator: '@ageinfo',
    twitterSite: '@ageinfo',
};

export interface ConstructMetadataProps {
    /**
     * Page title - will be appended with site name
     * @example "Calculate Your Age" → "Calculate Your Age | AgeInfo"
     */
    title?: string;

    /**
     * Page description for meta tags and SEO
     * @example "Free online age calculator with precise results"
     */
    description?: string;

    /**
     * Open Graph image URL (absolute or relative)
     * @default "/og-image.png" or dynamic if useDynamicOG is true
     */
    image?: string;

    /**
     * Use dynamic OG image generation via API route
     * If true, generates image at /api/og with title and locale
     * @default true
     */
    useDynamicOG?: boolean;

    /**
     * Canonical URL for this page (will be combined with locale)
     * @example "/about" → "https://ageinfo.online/en/about"
     */
    canonical?: string;

    /**
     * Current locale (en, id, etc.)
     * Used for canonical URL and og:locale
     */
    locale?: string;

    /**
     * Additional keywords for SEO
     */
    keywords?: string[];

    /**
     * Disable search engine indexing
     * @default false
     */
    noIndex?: boolean;

    /**
     * Type of OpenGraph content
     * @default "website"
     */
    type?: 'website' | 'article' | 'profile';

    /**
     * Twitter card type
     * @default "summary_large_image"
     */
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

/**
 * Construct comprehensive metadata for Next.js pages
 * 
 * @example
 * ```tsx
 * export const metadata = constructMetadata({
 *   title: 'About Us',
 *   description: 'Learn more about AgeInfo',
 *   canonical: '/about',
 *   locale: 'en',
 * });
 * ```
 */
export function constructMetadata({
    title,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    useDynamicOG = true,
    canonical,
    locale = 'en',
    keywords = [],
    noIndex = false,
    type = 'website',
    twitterCard = 'summary_large_image',
}: ConstructMetadataProps = {}): Metadata {
    // Construct full title with site name
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;

    // Construct canonical URL with locale
    const canonicalUrl = canonical
        ? `${siteConfig.url}/${locale}${canonical}`
        : `${siteConfig.url}/${locale}`;

    // Construct image URL
    let imageUrl: string;

    if (useDynamicOG && title) {
        // Use dynamic OG image API with encoded parameters
        const encodedTitle = encodeURIComponent(title);
        imageUrl = `${siteConfig.url}/api/og?title=${encodedTitle}&locale=${locale}`;
    } else if (image.startsWith('http')) {
        // Use provided absolute URL
        imageUrl = image;
    } else {
        // Use provided relative URL or default
        imageUrl = `${siteConfig.url}${image}`;
    }

    return {
        title: fullTitle,
        description,
        keywords: keywords.length > 0 ? keywords : undefined,

        // Authors and creator
        authors: [{ name: 'AgeInfo Team' }],
        creator: 'AgeInfo',
        publisher: 'AgeInfo',

        // Alternate languages - prevents duplicate content
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'en': `${siteConfig.url}/en${canonical || ''}`,
                'id': `${siteConfig.url}/id${canonical || ''}`,
                'x-default': `${siteConfig.url}/en${canonical || ''}`,
            },
        },

        // OpenGraph tags for social media
        openGraph: {
            type,
            title: fullTitle,
            description,
            url: canonicalUrl,
            siteName: siteConfig.name,
            locale: locale === 'id' ? 'id_ID' : 'en_US',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                    type: 'image/png',
                },
            ],
        },

        // Twitter Card tags
        twitter: {
            card: twitterCard,
            title: fullTitle,
            description,
            creator: siteConfig.twitterCreator,
            site: siteConfig.twitterSite,
            images: [imageUrl],
        },

        // Robots meta tags
        robots: noIndex
            ? {
                index: false,
                follow: false,
            }
            : {
                index: true,
                follow: true,
                nocache: false,
                googleBot: {
                    index: true,
                    follow: true,
                    noimageindex: false,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },

        // Verification codes (add when available)
        verification: {
            // google: 'your-google-verification-code',
            // yandex: 'your-yandex-verification-code',
            // bing: 'your-bing-verification-code',
        },
    };
}

/**
 * Get base site config
 */
export function getSiteConfig() {
    return siteConfig;
}

/**
 * Update site configuration (useful for dynamic configs)
 * @param updates - Partial config to update
 */
export function updateSiteConfig(updates: Partial<typeof siteConfig>) {
    Object.assign(siteConfig, updates);
}
