import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { calculateWeton, calculateZodiac, calculateShio } from '@/lib/identity-engine';
import { IdentityCard } from './IdentityCard';
import { Calendar, Star, PawPrint, Sparkles, Download } from 'lucide-react';
import { useLocale } from 'next-intl';
import { generateInsights } from '@/services/insightService';
import { ShareableIdentityCard } from './ShareableIdentityCard';
import { downloadStoryImage } from '@/lib/downloadStoryImage';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LuckyPalette } from './LuckyPalette';
import { ZodiacConstellation } from './ZodiacConstellation';
import { CheckSomeoneElseCTA } from './CheckSomeoneElseCTA';

interface IdentitySectionProps {
    date: Date;
    age?: {
        years: number;
        months: number;
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        totalDays: number;
        totalHours: number;
        totalMinutes: number;
        totalSeconds: number;
        nextBirthday: Date;
        nextAge: number;
        isLeapYearBirth: boolean;
        isLeapDayBirth: boolean;
        countdownMonths: number;
        countdownDays: number;
        countdownHours: number;
        totalMonths: number;
        totalWeeks: number;
    };
    className?: string;
    onReset?: () => void;
}

export function IdentitySection({ date, age, className, onReset }: IdentitySectionProps) {
    const t = useTranslations('Identity');
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    // Memoize calculations
    const weton = useMemo(() => calculateWeton(date), [date]);
    const zodiac = useMemo(() => calculateZodiac(date), [date]);
    const shio = useMemo(() => calculateShio(date), [date]);

    const locale = useLocale();
    const insights = useMemo(() =>
        generateInsights(weton.neptu, zodiac.element, locale),
        [weton.neptu, zodiac.element, locale]
    );

    const handleDownload = async () => {
        if (!cardRef.current || !age) return;

        setIsDownloading(true);
        try {
            await downloadStoryImage(
                cardRef.current,
                `ageinfo-${age.years}y-${new Date().getTime()}.png`
            );
            toast.success('Story image downloaded successfully! 🎉');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download image. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

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
                    backgroundElement={<ZodiacConstellation zodiacSign={zodiac.sign} />}
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

            {/* Fase 295.3: Lucky Palette Section */}
            <LuckyPalette birthDate={date} className="mt-6" />

            {/* Phase 295.1: Download Story Image Button */}
            {age && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                    className="mt-6 flex justify-center"
                >
                    <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        size="lg"
                        className="gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        <Download className="w-6 h-6" />
                        {isDownloading ? 'Generating Image...' : 'Download Story Image'}
                    </Button>
                </motion.div>
            )}

            {/* Hidden ShareableIdentityCard for Export */}
            {age && (
                <div className="fixed -left-[9999px] -top-[9999px] pointer-events-none">
                    <ShareableIdentityCard
                        ref={cardRef}
                        age={age}
                        weton={weton}
                        zodiac={zodiac}
                        shio={shio}
                        insight={insights}
                    />
                </div>
            )}

            {/* Fase 295.5: Check Someone Else CTA */}
            {onReset && (
                <CheckSomeoneElseCTA
                    zodiacSign={zodiac.sign}
                    onReset={onReset}
                    className="mt-6"
                />
            )}
        </div>
    );
}
