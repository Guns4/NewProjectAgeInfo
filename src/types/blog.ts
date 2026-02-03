/**
 * Content Engine Types - Phase 501
 */

export type Locale = 'en' | 'id';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    published_at: string;
    updated_at: string;
    author: string;
    locale: Locale;
    category: string;
    status: 'draft' | 'published';
    seo_metadata: {
        title: string | null;
        description: string | null;
        keywords: string[];
        og_image: string | null;
    };
    related_tool_id: string | null;
}

export interface WetonInsight {
    id: string;
    weton_name: string;
    slug: string;
    locale: Locale;
    philosophy: string | null;
    lucky_traits: string[];
    work_advice: string | null;
    love_insight: string | null;
    lucky_colors: string[];
    lucky_directions: string[];
    ai_prompt_seed: string | null;
    created_at: string;
}

export type WetonSlug =
    | 'senin-legi' | 'senin-pahing' | 'senin-pon' | 'senin-wage' | 'senin-kliwon'
    | 'selasa-legi' | 'selasa-pahing' | 'selasa-pon' | 'selasa-wage' | 'selasa-kliwon'
    | 'rabu-legi' | 'rabu-pahing' | 'rabu-pon' | 'rabu-wage' | 'rabu-kliwon'
    | 'kamis-legi' | 'kamis-pahing' | 'kamis-pon' | 'kamis-wage' | 'kamis-kliwon'
    | 'jumat-legi' | 'jumat-pahing' | 'jumat-pon' | 'jumat-wage' | 'jumat-kliwon'
    | 'sabtu-legi' | 'sabtu-pahing' | 'sabtu-pon' | 'sabtu-wage' | 'sabtu-kliwon'
    | 'minggu-legi' | 'minggu-pahing' | 'minggu-pon' | 'minggu-wage' | 'minggu-kliwon';
