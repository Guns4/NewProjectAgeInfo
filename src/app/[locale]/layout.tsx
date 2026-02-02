import type { Metadata, Viewport } from 'next';
import { Inter, Manrope, Playfair_Display } from 'next/font/google';
import '../globals.css';
import { defaultViewport } from '@/lib';
import { Navbar, Footer, ThemeProvider } from '@/components/shared';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from '@/components/ui';
import { generateWebsiteSchema } from '@/lib/seo/structured-data';

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
});

const manrope = Manrope({
    variable: '--font-manrope',
    subsets: ['latin'],
});

const playfair = Playfair_Display({
    variable: '--font-playfair',
    subsets: ['latin'],
});

export const viewport: Viewport = defaultViewport;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'SEO' });
    const baseUrl = 'https://ageinfo.online';

    return {
        title: t('defaultTitle'),
        description: t('defaultDescription'),
        keywords: t('keywords'),
        authors: [{ name: 'AgeInfo Team' }],
        creator: 'AgeInfo',
        publisher: 'AgeInfo',
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'en': '/en',
                'id': '/id',
                'x-default': '/en',
            },
        },
        openGraph: {
            title: t('defaultTitle'),
            description: t('defaultDescription'),
            url: `${baseUrl}/${locale}`,
            siteName: 'AgeInfo',
            locale: locale,
            type: 'website',
            images: [
                {
                    url: `${baseUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: 'AgeInfo - Premium Age Calculator',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('defaultTitle'),
            description: t('defaultDescription'),
            images: [`${baseUrl}/twitter-image.png`],
            creator: '@ageinfo',
        },
        robots: {
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
        verification: {
            // Add when available
            // google: 'your-google-verification-code',
            // yandex: 'your-yandex-verification-code',
        },
        other: {
            // Google AdSense meta tag
            'google-adsense-account': 'ca-pub-5099892029462046',
        },
    };
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();
    const baseUrl = 'https://ageinfo.online';

    // Generate structured data for SEO
    const structuredData = generateWebsiteSchema({
        locale,
        url: `${baseUrl}/${locale}`,
    });

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                {/* Google AdSense */}
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5099892029462046"
                    crossOrigin="anonymous"
                />
                {/* Structured Data (JSON-LD) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </head>
            <body className={`${inter.variable} ${manrope.variable} ${playfair.variable} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="flex min-h-screen flex-col">
                            <Navbar />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                        <Toaster />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
