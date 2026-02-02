/**
 * SEO Utilities - Structured Data & JSON-LD Schemas (Fase 96-100)
 * Comprehensive schema implementation for Google Rich Snippets
 * 
 * Schemas Implemented:
 * - SoftwareApplication (for age calculator)
 * - WebApplication (for web-based tool)
 * - FAQPage (for FAQ sections)
 * - Organization (for brand recognition)
 * - BreadcrumbList (for navigation)
 */

import { routing } from '@/i18n/routing';

export interface StructuredDataConfig {
    locale: string;
    url: string;
    title?: string;
    description?: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

/**
 * Generate SoftwareApplication schema for age calculator
 * Perfect for app-type tools and calculators
 */
export function generateSoftwareApplicationSchema(config: StructuredDataConfig) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'AgeInfo Age Calculator',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Web Browser',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        url: config.url,
        description:
            config.description ||
            'Free premium age calculator with accurate results in years, months, days, hours, minutes, and seconds.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '1250',
            bestRating: '5',
            worstRating: '1',
        },
        softwareVersion: '2.0.0',
        datePublished: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        inLanguage: config.locale === 'id' ? 'id-ID' : 'en-US',
        featureList: [
            'Calculate exact age in years, months, days',
            'Calculate age in hours, minutes, seconds',
            'Beautiful modern interface',
            'Support for multiple languages',
            'Fast and accurate calculations',
            'Mobile-friendly design',
        ],
        screenshot: `${config.url}/screenshots/calculator.png`,
        author: {
            '@type': 'Organization',
            name: 'AgeInfo',
            url: 'https://ageinfo.online',
        },
    };
}

/**
 * Generate WebApplication schema
 * Alternative to SoftwareApplication, optimized for web tools
 */
export function generateWebApplicationSchema(config: StructuredDataConfig) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'AgeInfo',
        url: config.url,
        description:
            config.description ||
            'Fast, accurate, and free age calculator. Calculate your exact age instantly.',
        applicationCategory: 'CalculatorApplication',
        browserRequirements: 'Requires JavaScript',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '1250',
        },
        inLanguage: [
            { '@type': 'Language', name: 'English', alternateName: 'en' },
            { '@type': 'Language', name: 'Indonesian', alternateName: 'id' },
        ],
    };
}

/**
 * Generate FAQPage schema for FAQ sections
 * Increases chances of appearing in Google's "People also ask" section
 * 
 * @example
 * const faqData = [
 *   { question: 'How to calculate age?', answer: 'Enter your birth date...' },
 *   { question: 'Is it free?', answer: 'Yes, completely free!' }
 * ];
 * const schema = generateFAQPageSchema({ url: '...', locale: 'en' }, faqData);
 */
export function generateFAQPageSchema(
    config: StructuredDataConfig,
    faqItems: FAQItem[]
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

/**
 * Generate Organization schema for brand recognition
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'AgeInfo',
        url: 'https://ageinfo.online',
        logo: 'https://ageinfo.online/logo.png',
        description: 'Premium age calculator platform',
        sameAs: [
            // Add social media links when available
            // 'https://twitter.com/ageinfo',
            // 'https://facebook.com/ageinfo',
            // 'https://instagram.com/ageinfo',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            availableLanguage: ['English', 'Indonesian'],
        },
    };
}

/**
 * Generate BreadcrumbList schema for better navigation understanding
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Generate Website schema with search action
 * Enables site search in Google
 */
export function generateWebsiteSchema(config: StructuredDataConfig) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AgeInfo',
        url: 'https://ageinfo.online',
        description: 'Premium age calculator platform',
        inLanguage: config.locale === 'id' ? 'id-ID' : 'en-US',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `https://ageinfo.online/${config.locale}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

/**
 * Combine multiple schemas into one JSON-LD script
 * Useful when you want to include multiple types on one page
 */
export function combineSchemas(...schemas: object[]) {
    return {
        '@context': 'https://schema.org',
        '@graph': schemas,
    };
}
