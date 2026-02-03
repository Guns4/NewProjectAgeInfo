-- Refined Content Engine Schema - Phase 501-530
-- Optimized for ISR and Rich Metadata
-- 1. Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    -- Supports Markdown or HTML
    excerpt TEXT,
    category TEXT DEFAULT 'General',
    featured_image TEXT,
    author TEXT DEFAULT 'AgeInfo Team',
    locale TEXT NOT NULL DEFAULT 'en',
    status TEXT DEFAULT 'published',
    -- 'draft', 'published'
    -- Structured SEO data as JSONB
    seo_metadata JSONB DEFAULT '{
        "title": null,
        "description": null,
        "keywords": [],
        "og_image": null
    }',
    -- Related logic
    related_tool_id TEXT,
    -- Slug of the calculator to show (e.g., 'weton-calculator')
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Indices
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_locale ON posts(locale);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ language 'plpgsql';
CREATE TRIGGER update_posts_updated_at BEFORE
UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- 2. Weton Insights Table (Programmatic SEO)
CREATE TABLE IF NOT EXISTS weton_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    weton_name TEXT UNIQUE NOT NULL,
    -- e.g., 'Senin Legi'
    slug TEXT UNIQUE NOT NULL,
    -- e.g., 'senin-legi'
    philosophy TEXT,
    lucky_traits TEXT [],
    lucky_colors TEXT [],
    lucky_directions TEXT [],
    work_advice TEXT,
    love_insight TEXT,
    locale TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_weton_slug ON weton_insights(slug);
CREATE INDEX IF NOT EXISTS idx_weton_locale ON weton_insights(locale);