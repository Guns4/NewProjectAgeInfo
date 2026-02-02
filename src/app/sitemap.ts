import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

/**
 * Dynamic Sitemap Generation - Fase 96-100 Enhanced
 * Includes all routes for both locales (en, id)
 * with proper hreflang alternates
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ageinfo.online';

    // Define all static routes that should be in the sitemap
    const routes = [
        '',  // Home page
        '/about',
        '/features',
        '/pricing',
        '/contact',
        '/faq',
        '/privacy',
        '/terms',
        // Add more routes as they are created
    ];

    const sitemap: MetadataRoute.Sitemap = [];

    // Generate sitemap entries for each locale
    routing.locales.forEach((locale: string) => {
        routes.forEach((route) => {
            const fullPath = `${baseUrl}/${locale}${route}`;

            sitemap.push({
                url: fullPath,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'daily' : 'weekly',
                priority: route === '' ? 1 : route === '/about' ? 0.9 : 0.8,
                alternates: {
                    languages: Object.fromEntries(
                        routing.locales.map((loc: string) => [
                            loc,
                            `${baseUrl}/${loc}${route}`
                        ])
                    ),
                },
            });
        });
    });

    return sitemap;
}
