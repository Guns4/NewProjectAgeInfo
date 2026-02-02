import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { calculateWeton, calculateZodiac, calculateShio } from '@/lib/identity-engine';
import { IdentityCard } from './IdentityCard';
import { Calendar, Star, PawPrint, Sparkles } from 'lucide-react';
import { useLocale } from 'next-intl';
import { generateInsights } from '@/services/insightService';

interface IdentitySectionProps {
    date: Date;
    className?: string;
}

export function IdentitySection({ date, className }: IdentitySectionProps) {
    const t = useTranslations('Identity');

    // Memoize calculations
    const weton = useMemo(() => calculateWeton(date), [date]);
    const zodiac = useMemo(() => calculateZodiac(date), [date]);
    const shio = useMemo(() => calculateShio(date), [date]);

    const locale = useLocale();
    const insights = useMemo(() =>
        generateInsights(weton.neptu, zodiac.element, locale),
        [weton.neptu, zodiac.element, locale]
    );

    return (
        <div className={className}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Weton Card */}
                <IdentityCard
                    title={t('weton.title')}
                    value={`${weton.day} ${weton.pasaran}`}
                    subValue={`Neptu ${weton.neptu}`}
                    description={t(`weton.pasaranDesc.${weton.pasaran}`)}
                    icon={Calendar}
                    colorTheme="amber"
                    delay={0.1}
                />

                {/* Zodiac Card */}
                <IdentityCard
                    title={t('zodiac.title')}
                    value={zodiac.sign}
                    subValue={zodiac.element}
                    description={t(`zodiac.traits.${zodiac.sign}`)}
                    icon={Star}
                    colorTheme="purple"
                    delay={0.2}
                />

                {/* Shio Card */}
                <IdentityCard
                    title={t('shio.title')}
                    value={shio.animal}
                    subValue={shio.fixedElement}
                    description={t(`shio.traits.${shio.animal}`)}
                    icon={PawPrint}
                    colorTheme="rose"
                    delay={0.3}
                />
            </div>

            {/* Phase 295.2: Insight Generator Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                className="mt-6 p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 backdrop-blur-md relative overflow-hidden"
            >
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-indigo-900 dark:text-indigo-100">Cosmic Insights</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500/60">Philosophy</p>
                        <p className="text-sm font-medium leading-relaxed">{insights.neptuInsight}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500/60">Energy Tip</p>
                        <p className="text-sm font-medium leading-relaxed">{insights.elementAffinity}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500/60">Daily Vibe</p>
                        <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{insights.genZVibe}</p>
                    </div>
                </div>

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
            </motion.div>
        </div>
    );
}
