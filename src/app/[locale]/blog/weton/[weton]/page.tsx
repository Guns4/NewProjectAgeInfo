import { supabase } from '@/lib/supabase';
import { unstable_setRequestLocale } from 'next-intl/server';
import { WetonInsight } from '@/types/blog';
import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Briefcase, Paintbrush, Share2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { TableOfContents } from '@/components/shared/table-of-contents';
import { Balancer } from 'react-wrap-balancer';
import { RelatedTools } from '@/components/shared/related-tools';

interface WetonPageProps {
    params: Promise<{
        locale: string;
        weton: string; // This is the slug
    }>;
}

export async function generateStaticParams() {
    const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
    const pasarans = ['legi', 'pahing', 'pon', 'wage', 'kliwon'];

    const params: { locale: string; weton: string }[] = [];

    ['en', 'id'].forEach(locale => {
        days.forEach(day => {
            pasarans.forEach(pasaran => {
                params.push({ locale, weton: `${day}-${pasaran}` });
            });
        });
    });

    return params;
}

async function getWetonData(slug: string, locale: string): Promise<WetonInsight | null> {
    const { data, error } = await supabase
        .from('weton_insights')
        .select('*')
        .eq('slug', slug)
        .eq('locale', locale)
        .single();

    if (error || !data) return null;
    return data as WetonInsight;
}

export async function generateMetadata({ params }: WetonPageProps): Promise<Metadata> {
    const { locale, weton } = await params;
    const formattedName = weton.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return constructMetadata({
        title: `All About ${formattedName} - Weton Analysis & Personality`,
        description: `Explore the hidden meaning, personality traits, and future insights for someone born on ${formattedName} according to Javanese Weton.`,
        canonical: `/blog/weton/${weton}`,
        locale: locale,
    });
}

export default async function WetonArticlePage({ params }: WetonPageProps) {
    const { locale, weton: slug } = await params;
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const data = await getWetonData(slug, locale);

    if (!data) {
        // Fallback for demo if DB is empty
        return (
            <SectionWrapper className="py-20">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <Breadcrumbs className="justify-center mb-8" />
                    <Badge variant="soft" className="px-4 py-1 text-sm">Programmatic SEO Page</Badge>
                    <h1 className="text-5xl md:text-8xl font-black capitalize tracking-tighter">
                        Weton {slug.replace('-', ' ')}
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Our AI is currently calculating the deep cosmic insights for this specific day.
                        Please check back in a few minutes!
                    </p>
                    <Card className="p-12 bg-zinc-50 dark:bg-zinc-900 border-dashed border-2 flex items-center justify-center opacity-50">
                        <p className="text-zinc-500 italic font-medium">Pending Data Stream: {slug}</p>
                    </Card>
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper className="py-12 md:py-20 font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* TOC Sidebar */}
                <aside className="hidden lg:block lg:col-span-3">
                    <TableOfContents selector="#weton-content" />
                </aside>

                {/* Main Content */}
                <article className="lg:col-span-9 space-y-12" id="weton-content">
                    <Breadcrumbs className="mb-4" />

                    <header className="space-y-6">
                        <div className="flex gap-3">
                            <Badge variant="premium">Weton Guide</Badge>
                            <Badge variant="secondary">Heritage Insights</Badge>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
                            <Balancer>
                                The Power of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                    {data.weton_name}
                                </span>
                            </Balancer>
                        </h1>
                        <p className="text-2xl text-muted-foreground leading-relaxed max-w-3xl font-medium">
                            {data.philosophy}
                        </p>

                        <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <span className="text-zinc-900 dark:text-zinc-100 font-bold">AgeInfo Intelligence</span>
                            </div>
                            <button className="ml-auto text-muted-foreground hover:text-primary transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </header>

                    {/* Main Insight Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                        <section id="personality" className="scroll-mt-24 space-y-6">
                            <Card className="p-8 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 border-none shadow-none">
                                <div className="flex items-center gap-3 text-indigo-500">
                                    <Sparkles className="w-8 h-8" />
                                    <h2 className="text-3xl font-black">Personality</h2>
                                </div>
                                <ul className="space-y-4">
                                    {data.lucky_traits.map((trait, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                                            <span className="text-lg leading-tight">{trait}</span>
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </section>

                        <section id="career" className="scroll-mt-24">
                            <Card className="p-8 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 border-none shadow-none h-full">
                                <div className="flex items-center gap-3 text-blue-500">
                                    <Briefcase className="w-8 h-8" />
                                    <h2 className="text-3xl font-black">Career Path</h2>
                                </div>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {data.work_advice}
                                </p>
                            </Card>
                        </section>

                        <section id="love" className="scroll-mt-24">
                            <Card className="p-8 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 border-none shadow-none h-full">
                                <div className="flex items-center gap-3 text-pink-500">
                                    <Heart className="w-8 h-8" />
                                    <h2 className="text-3xl font-black">Love Life</h2>
                                </div>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {data.love_insight}
                                </p>
                            </Card>
                        </section>

                        <section id="cosmic-elements" className="scroll-mt-24">
                            <Card className="p-8 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 border-none shadow-none h-full">
                                <div className="flex items-center gap-3 text-orange-500">
                                    <Paintbrush className="w-8 h-8" />
                                    <h2 className="text-3xl font-black">Elements</h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-bold uppercase text-zinc-400 mb-2">Lucky Colors</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {data.lucky_colors.map((color, i) => (
                                                <Badge key={i} variant="outline" className="capitalize px-3 py-1">{color}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase text-zinc-400 mb-2">Lucky Directions</h4>
                                        <p className="text-lg font-medium">{data.lucky_directions.join(', ')}</p>
                                    </div>
                                </div>
                            </Card>
                        </section>
                    </div>

                    {/* Integrated CTA */}
                    <RelatedTools
                        toolId="weton-calculator"
                        className="my-12 border-2 border-primary/20"
                    />

                    <footer className="pt-12 border-t border-zinc-100 dark:border-zinc-800 text-center">
                        <p className="text-muted-foreground mb-6">Want to explore more cosmic patterns?</p>
                        <div className="flex justify-center gap-4">
                            <Badge variant="soft">#Weton</Badge>
                            <Badge variant="soft">#JavanesePsychology</Badge>
                            <Badge variant="soft">#DailyInsights</Badge>
                        </div>
                    </footer>
                </article>
            </div>
        </SectionWrapper>
    );
}
