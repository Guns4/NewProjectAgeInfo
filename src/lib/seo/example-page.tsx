/**
 * Example Page with SEO Metadata
 * Demonstrates how to use constructMetadata for perfect SEO
 */

import { constructMetadata } from '@/lib/seo';
import { useTranslations } from 'next-intl';

// Generate metadata for this page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Simple usage - just override what you need
    return constructMetadata({
        title: locale === 'id' ? 'Beranda' : 'Home',
        description:
            locale === 'id'
                ? 'Kalkulator umur premium gratis. Hitung umurmu dalam tahun, bulan, hari!'
                : 'Free premium age calculator. Calculate your age in years, months, days!',
        canonical: '/',
        locale,
    });

    // Result includes:
    // ✅ Full title with site name
    // ✅ og:title, og:description, og:image
    // ✅ twitter:card with all fields
    // ✅ canonical URL with locale
    // ✅ hreflang alternates (en, id)
    // ✅ robots meta for SEO
}

export default function HomePage() {
    const t = useTranslations('HomePage');

    return (
        <div>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.subtitle')}</p>
        </div>
    );
}
