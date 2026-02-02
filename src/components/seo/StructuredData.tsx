/**
 * StructuredData Component - Fase 96-100
 * React component for injecting JSON-LD structured data into pages
 * 
 * Usage:
 * <StructuredData schema={yourSchema} />
 */

interface StructuredDataProps {
    /**
     * Single schema object or array of schemas
     */
    schema: object | object[];
}

/**
 * Component to inject JSON-LD structured data into page <head>
 * 
 * @example
 * ```tsx
 * import { StructuredData } from '@/components/seo/StructuredData';
 * import { generateSoftwareApplicationSchema } from '@/lib/seo/structured-data';
 * 
 * export default function Page() {
 *   const schema = generateSoftwareApplicationSchema({
 *     url: 'https://ageinfo.online/en',
 *     locale: 'en'
 *   });
 * 
 *   return (
 *     <>
 *       <StructuredData schema={schema} />
 *       <h1>Content...</h1>
 *     </>
 *   );
 * }
 * ```
 */
export function StructuredData({ schema }: StructuredDataProps) {
    // Convert to JSON string
    const jsonLd = JSON.stringify(schema, null, 0);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
            suppressHydrationWarning
        />
    );
}
