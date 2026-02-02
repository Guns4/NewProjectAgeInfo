/**
 * Life Progress Component - Fase 395.1
 * Visualizes life progress with minimalist segmented bars
 * - Year Progress: How far into the current year
 * - Decade Progress: How far into the current decade of age (20s, 30s)
 * - Life Expectancy: Optimistic view of life journey
 */

'use client';

import { motion } from 'framer-motion';

interface LifeProgressProps {
    age: {
        years: number;
        months: number;
        days: number;
    };
    yearProgress: number; // 0-100
    className?: string;
}

export function LifeProgress({ age, yearProgress, className }: LifeProgressProps) {
    // 1. Decade Progress (e.g., 25 years old -> 50% of 20s)
    const decadeStart = Math.floor(age.years / 10) * 10;
    const decadeProgress = ((age.years - decadeStart) / 10) * 100 + (age.months / 12) * 10;

    // 2. Life Journey (Optimistic 85 years ref, adjustable)
    // We use a "Level" metaphor instead of "End of Life"
    // e.g., Level 1 (>0), Level 2 (>20), etc. OR just % of 100 years
    const lifePercentage = Math.min((age.years / 100) * 100, 100);

    const segments = 20; // 20 segments for segmented bar (5% each)

    const renderSegmentedBar = (percentage: number, colorFrom: string, colorTo: string) => {
        const filledSegments = Math.ceil((percentage / 100) * segments);

        return (
            <div className="flex gap-1 h-3 w-full">
                {Array.from({ length: segments }).map((_, i) => (
                    <div
                        key={i}
                        className={`flex-1 rounded-sm transition-all duration-500 ${i < filledSegments
                            ? `bg-gradient-to-r ${colorFrom} ${colorTo} opacity-100`
                            : 'bg-muted/30'
                            }`}
                        style={{
                            opacity: i < filledSegments ? 1 : 0.3,
                        }}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={className}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-3xl p-6 border border-white/20 dark:border-white/10"
            >
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-indigo-500 rounded-full" />
                    <h3 className="text-lg font-bold">Life Progress</h3>
                </div>

                {/* 1. Year Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Tahun Ini ({new Date().getFullYear()})</span>
                        <span className="font-bold">{yearProgress.toFixed(1)}%</span>
                    </div>
                    {renderSegmentedBar(yearProgress, 'from-emerald-400', 'to-emerald-600')}
                    <p className="text-xs text-muted-foreground mt-1">
                        Kamu telah melewati {yearProgress.toFixed(0)}% dari tahun ini.
                    </p>
                </div>

                {/* 2. Decade Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Dekade {decadeStart}-an</span>
                        <span className="font-bold">{decadeProgress.toFixed(1)}%</span>
                    </div>
                    {renderSegmentedBar(decadeProgress, 'from-teal-400', 'to-cyan-600')}
                    <p className="text-xs text-muted-foreground mt-1">
                        Perjalananmu di usia kepala {decadeStart / 10}.
                    </p>
                </div>

                {/* 3. Life Journey (100 Year Scale) */}
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Perjalanan 1 Abad</span>
                        <span className="font-bold">{lifePercentage.toFixed(1)}%</span>
                    </div>
                    {renderSegmentedBar(lifePercentage, 'from-indigo-400', 'to-violet-600')}
                    <p className="text-xs text-muted-foreground mt-1">
                        Setiap detik adalah progres menuju versi terbaikmu. Level {age.years}!
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
