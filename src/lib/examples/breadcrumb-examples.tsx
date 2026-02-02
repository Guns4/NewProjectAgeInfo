/**
 * Breadcrumb Usage Examples - Fase 90.3
 */

import { Breadcrumb, BreadcrumbCompact } from '@/components/navigation';
import { useTranslations } from 'next-intl';

// Example 1: Basic Breadcrumb - Calculator > Weton Page
export function WetonCalculatorPage() {
    const t = useTranslations('Breadcrumbs');

    return (
        <div className="container mx-auto px-4 py-8">
            <Breadcrumb
                items={[
                    { label: t('calculator'), href: '/calculator' },
                    {
                        label: t('weton'),
                        href: '/calculator/weton',
                        isCurrentPage: true
                    },
                ]}
            />

            <h1 className="mt-6 text-4xl font-bold">
                {t('weton')}
            </h1>
            {/* Page content... */}
        </div>
    );
}

// Example 2: Three-Level Breadcrumb
export function FeatureDetailPage() {
    return (
        <div className="container">
            <Breadcrumb
                items={[
                    { label: 'Features', href: '/features' },
                    { label: 'Age Calculator', href: '/features/calculator' },
                    {
                        label: 'Detailed View',
                        href: '/features/calculator/detailed',
                        isCurrentPage: true
                    },
                ]}
            />
        </div>
    );
}

// Example 3: Custom Home Label
export function AboutPage() {
    return (
        <div className="container">
            <Breadcrumb
                homeLabel="🏠 Home"
                items={[
                    { label: 'About Us', href: '/about', isCurrentPage: true },
                ]}
            />
        </div>
    );
}

// Example 4: Compact Breadcrumb (Mobile)
export function MobileView() {
    return (
        <div className="container">
            {/* Show compact on mobile, full on desktop */}
            <div className="md:hidden">
                <BreadcrumbCompact
                    items={[
                        { label: 'Calculator', href: '/calculator' },
                        { label: 'Weton Calculator', href: '/calculator/weton' },
                    ]}
                />
            </div>

            <div className="hidden md:block">
                <Breadcrumb
                    items={[
                        { label: 'Calculator', href: '/calculator' },
                        { label: 'Weton Calculator', href: '/calculator/weton' },
                    ]}
                />
            </div>
        </div>
    );
}

// Example 5: Breadcrumb with Translations
export function LocalizedBreadcrumb() {
    const t = useTranslations('Breadcrumbs');

    // Translation keys in messages/en.json and messages/id.json:
    // {
    //   "Breadcrumbs": {
    //     "home": "Home",
    //     "calculator": "Calculator",
    //     "weton": "Weton Calculator",
    //     "about": "About Us",
    //     "features": "Features"
    //   }
    // }

    return (
        <Breadcrumb
            items={[
                { label: t('calculator'), href: '/calculator' },
                { label: t('weton'), href: '/calculator/weton' },
            ]}
        />
    );
}

// Example 6: Dynamic Breadcrumb from URL
export function DynamicBreadcrumb({ pathname }: { pathname: string }) {
    const t = useTranslations('Breadcrumbs');

    // Parse pathname to generate breadcrumbs
    // /calculator/weton → [calculator, weton]
    const segments = pathname.split('/').filter(Boolean);

    const items = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        return {
            label: t(segment), // Use translation key
            href,
            isCurrentPage: isLast,
        };
    });

    return <Breadcrumb items={items} />;
}

// Example 7: Breadcrumb without Schema (if already added elsewhere)
export function NoSchemaExample() {
    return (
        <Breadcrumb
            items={[
                { label: 'Features', href: '/features' },
            ]}
            includeSchema={false} // Disable JSON-LD
        />
    );
}

// Example 8: Styled Breadcrumb
export function StyledBreadcrumb() {
    return (
        <Breadcrumb
            items={[
                { label: 'Blog', href: '/blog' },
                { label: 'How to Calculate Age', href: '/blog/calculate-age' },
            ]}
            className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg"
        />
    );
}
