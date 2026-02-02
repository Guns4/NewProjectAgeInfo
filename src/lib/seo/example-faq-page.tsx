/**
 * Example: Using StructuredData component with FAQ
 * This demonstrates how to implement FAQPage schema for Google Rich Snippets
 */

import { StructuredData } from '@/components/seo';
import { generateFAQPageSchema, combineSchemas, generateSoftwareApplicationSchema } from '@/lib/seo/structured-data';
import { faqDataEN, faqDataID } from '@/data/faq';

export default async function FAQPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const faqData = locale === 'id' ? faqDataID : faqDataEN;

    // Generate FAQ schema
    const faqSchema = generateFAQPageSchema(
        {
            url: `https://ageinfo.online/${locale}/faq`,
            locale,
        },
        faqData
    );

    // Optionally combine with other schemas
    const softwareSchema = generateSoftwareApplicationSchema({
        url: `https://ageinfo.online/${locale}`,
        locale,
    });

    const combinedSchema = combineSchemas(faqSchema, softwareSchema);

    return (
        <>
            {/* Inject structured data */}
            <StructuredData schema={combinedSchema} />

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold mb-8">
                    {locale === 'id' ? 'Pertanyaan Umum' : 'Frequently Asked Questions'}
                </h1>

                <div className="space-y-6">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-semibold mb-3">
                                {item.question}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
