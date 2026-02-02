/**
 * Breadcrumb Component - Fase 90.3
 * Multilingual breadcrumb navigation with JSON-LD schema
 * 
 * Features:
 * - Multi-language support (EN/ID)
 * - Automatic JSON-LD BreadcrumbList schema
 * - SEO-friendly with proper attributes
 * - Responsive design
 */

'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export interface BreadcrumbItem {
    /**
     * Display label for the breadcrumb
     * Can be translation key or direct string
     */
    label: string;

    /**
     * URL path for the breadcrumb link
     * Relative path without locale prefix
     * @example "/about" or "/calculator/weton"
     */
    href: string;

    /**
     * Whether this is the current page (last item)
     * @default false
     */
    isCurrentPage?: boolean;
}

export interface BreadcrumbProps {
    /**
     * Array of breadcrumb items
     * First item (Home) is automatically added
     */
    items: BreadcrumbItem[];

    /**
     * Custom home label
     * @default "Home" (EN) or "Beranda" (ID)
     */
    homeLabel?: string;

    /**
     * Include JSON-LD schema in page
     * @default true
     */
    includeSchema?: boolean;

    /**
     * Custom className for styling
     */
    className?: string;
}

/**
 * Breadcrumb navigation component with SEO support
 * 
 * @example
 * ```tsx
 * <Breadcrumb items={[
 *   { label: 'Calculator', href: '/calculator' },
 *   { label: 'Weton', href: '/calculator/weton', isCurrentPage: true }
 * ]} />
 * ```
 */
export function Breadcrumb({
    items,
    homeLabel,
    includeSchema = true,
    className = '',
}: BreadcrumbProps) {
    const locale = useLocale() as 'en' | 'id';
    const baseUrl = 'https://ageinfo.online';

    // Default home label based on locale
    const defaultHomeLabel = locale === 'id' ? 'Beranda' : 'Home';
    const homeLabelText = homeLabel || defaultHomeLabel;

    // Construct full breadcrumb path with Home
    const fullBreadcrumbs: BreadcrumbItem[] = [
        { label: homeLabelText, href: '/' },
        ...items,
    ];

    // Generate JSON-LD schema
    const schemaItems = fullBreadcrumbs.map((item) => ({
        name: item.label,
        url: `${baseUrl}/${locale}${item.href}`,
    }));

    const breadcrumbSchema = generateBreadcrumbSchema(schemaItems);

    return (
        <>
            {/* JSON-LD Schema */}
            {includeSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(breadcrumbSchema),
                    }}
                    suppressHydrationWarning
                />
            )}

            {/* Breadcrumb Navigation */}
            <nav
                aria-label="Breadcrumb"
                className={`flex items-center gap-2 text-sm ${className}`}
            >
                <ol className="flex items-center gap-2 flex-wrap">
                    {fullBreadcrumbs.map((item, index) => {
                        const isLast = index === fullBreadcrumbs.length - 1;
                        const isFirst = index === 0;

                        return (
                            <li
                                key={item.href}
                                className="flex items-center gap-2"
                            >
                                {/* Separator */}
                                {!isFirst && (
                                    <ChevronRight
                                        className="h-4 w-4 text-gray-400"
                                        aria-hidden="true"
                                    />
                                )}

                                {/* Breadcrumb Link or Text */}
                                {isLast || item.isCurrentPage ? (
                                    <span
                                        className="font-medium text-gray-900 dark:text-white"
                                        aria-current="page"
                                    >
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                        rel="breadcrumb"
                                    >
                                        {isFirst && (
                                            <Home
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        )}
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

/**
 * Compact breadcrumb variant (mobile-friendly)
 */
export function BreadcrumbCompact({
    items,
    homeLabel,
    className = '',
}: BreadcrumbProps) {
    const locale = useLocale() as 'en' | 'id';
    const defaultHomeLabel = locale === 'id' ? 'Beranda' : 'Home';
    const homeLabelText = homeLabel || defaultHomeLabel;

    // Show only Home and current page for compact view
    const currentPage = items[items.length - 1];

    return (
        <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-2 text-sm ${className}`}
        >
            <Link
                href="/"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                rel="breadcrumb"
            >
                <Home className="h-4 w-4" aria-hidden="true" />
                {homeLabelText}
            </Link>

            <ChevronRight className="h-4 w-4 text-gray-400" aria-hidden="true" />

            <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                {currentPage?.label}
            </span>
        </nav>
    );
}
