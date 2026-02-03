import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { supabase } from '@/lib/supabase';
import { BlogPost } from '@/types/blog';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Calendar, User, Clock, Share2 } from 'lucide-react';
import { Balancer } from 'react-wrap-balancer';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { TableOfContents } from '@/components/shared/table-of-contents';
import { RelatedTools } from '@/components/shared/related-tools';

export const revalidate = 3600; // ISR: 1 hour

// TODO: Implement actual static params for blog posts if needed during build
export async function generateStaticParams() {
    return [];
}

interface BlogPostPageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

async function getBlogPost(slug: string, locale: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('locale', locale)
        .eq('status', 'published')
        .single();

    if (error || !data) return null;
    return data as BlogPost;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = await getBlogPost(slug, locale);

    if (!post) return constructMetadata({ title: 'Blog Post Not Found', locale });

    const seo = post.seo_metadata;

    return constructMetadata({
        title: seo.title || post.title,
        description: seo.description || post.excerpt || '',
        image: seo.og_image || post.featured_image || undefined,
        canonical: `/blog/${slug}`,
        locale: locale,
        type: 'article'
    });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { locale, slug } = await params;
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const post = await getBlogPost(slug, locale);

    if (!post) {
        notFound();
    }

    return (
        <SectionWrapper className="py-12 md:py-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Fixed ToC for Desktop */}
                <aside className="hidden lg:block lg:col-span-3">
                    <TableOfContents selector="#article-content" />
                </aside>

                {/* Main Article Content */}
                <article className="lg:col-span-9 space-y-12">
                    <Breadcrumbs className="mb-8" />

                    {/* Post Header */}
                    <header className="space-y-6">
                        <Badge variant="premium" className="capitalize text-sm px-4 py-1">
                            {post.category}
                        </Badge>

                        <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1]">
                            <Balancer>{post.title}</Balancer>
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-medium border-y border-zinc-100 dark:border-zinc-800 py-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="text-zinc-900 dark:text-zinc-100">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.published_at).toLocaleDateString(locale, { dateStyle: 'long' })}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>5 min read</span>
                            </div>
                            <button className="ml-auto flex items-center gap-2 hover:text-primary transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] shadow-2xl border border-border">
                            <Image
                                src={post.featured_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Article Body */}
                    <div className="grid grid-cols-1 gap-12">
                        <div
                            id="article-content"
                            className="prose prose-zinc dark:prose-invert max-w-none 
                                prose-headings:font-black prose-headings:tracking-tight 
                                prose-p:text-xl prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-3xl prose-img:shadow-xl"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Injection Point for Related Tools */}
                        {post.related_tool_id && (
                            <RelatedTools
                                toolId={post.related_tool_id}
                                className="my-12"
                            />
                        )}
                    </div>

                    {/* Post Footer */}
                    <footer className="pt-12 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                        <div className="flex gap-4">
                            <Badge variant="soft">#AgeInfo</Badge>
                            <Badge variant="soft">#{post.category}</Badge>
                        </div>
                    </footer>
                </article>
            </div>
        </SectionWrapper>
    );
}
