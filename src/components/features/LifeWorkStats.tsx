'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { formatLocaleNumber } from '@/lib/utils';

interface LifeWorkStatsProps {
    birthDate: Date;
    locale: string;
}

export function LifeWorkStats({ birthDate, locale }: LifeWorkStatsProps) {
    const t = useTranslations('Results.workLife');

    // Calculation Logic (Estimation)
    // Assuming working age starts at 20 (or simplified: total life estimation)
    // But prompt says "Dari total umurmu" (From your total age).
    // Let's use a simple heuristic for "Working Hours" vs "Weekend Hours" over a lifetime.
    // - Weekends: 2 days / 7 days
    // - Work days: 5 days / 7 days
    // - Work hours: 8 hours / work day (standard)
    // - Weekend hours: 24 active hours? Or maybe just "weekend time".
    // Let's stick to "Work Hours" (8h * 5d) vs "Weekend Time" (48h).

    const now = new Date();
    const ageInDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));

    // Estimation Formulas
    // 1. Total Holidays/Weekends (approx 2/7 of life + public holidays ~15 days/year)
    const totalWeeks = ageInDays / 7;
    const weekendDays = Math.floor(totalWeeks * 2);
    const publicHolidays = Math.floor((ageInDays / 365) * 15);
    const totalHolidays = weekendDays + publicHolidays;

    // 2. Work Hours
    // Assuming work starts effectively or distributed: user's life has "work-like" activity (school/work).
    // 5 days/week * 8 hours
    const workHours = Math.floor(totalWeeks * 5 * 8);

    // 3. Weekend Hours (Total hours in weekends)
    const weekendHours = Math.floor(weekendDays * 24);

    // Data for Donut Chart
    // Total bucket: Work Hours + Weekend Hours (just for visualization ratio)
    const total = workHours + weekendHours || 1; // Prevent division by zero
    const workPercentage = (workHours / total) * 100;
    const weekendPercentage = (weekendHours / total) * 100;

    // SVG Circle Config
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const workStrokeDasharray = `${(workPercentage / 100) * circumference} ${circumference}`;
    const weekendStrokeDashoffset = -((workPercentage / 100) * circumference);
    const weekendStrokeDasharray = `${(weekendPercentage / 100) * circumference} ${circumference}`;

    return (
        <Card className="p-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col md:flex-row items-center gap-8">

                {/* SVG Donut Chart */}
                <div className="relative w-48 h-48 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                        {/* Background Circle */}
                        <circle
                            cx="100"
                            cy="100"
                            r={radius}
                            className="stroke-zinc-200 dark:stroke-zinc-800"
                            strokeWidth="20"
                            fill="none"
                        />

                        {/* Work Segment (Primary Color) */}
                        <motion.circle
                            cx="100"
                            cy="100"
                            r={radius}
                            className="stroke-indigo-500"
                            strokeWidth="20"
                            fill="none"
                            strokeDasharray={workStrokeDasharray}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            strokeLinecap="round"
                        />

                        {/* Weekend Segment (Secondary Color) */}
                        <motion.circle
                            cx="100"
                            cy="100"
                            r={radius}
                            className="stroke-emerald-400"
                            strokeWidth="20"
                            fill="none"
                            strokeDasharray={weekendStrokeDasharray}
                            strokeDashoffset={weekendStrokeDashoffset}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-bold text-zinc-800 dark:text-white">
                            {Math.round(workPercentage)}%
                        </span>
                        <span className="text-xs text-zinc-500 font-medium">Work</span>
                    </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                        {t('title')}
                    </h3>

                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {t.rich('estText', {
                            work: () => <span className="font-bold text-indigo-500">{formatLocaleNumber(workHours, locale as 'en' | 'id')}</span>,
                            weekend: () => <span className="font-bold text-emerald-500">{formatLocaleNumber(weekendHours, locale as 'en' | 'id')}</span>
                        })}
                    </p>

                    <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
                        <p className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
                            <span>🏖️</span>
                            {t.rich('motivation', {
                                holidays: () => <span className="font-bold">{formatLocaleNumber(totalHolidays, locale as 'en' | 'id')}</span>
                            })}
                        </p>
                    </div>

                    {/* Legend */}
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-indigo-500" />
                            <span className="text-zinc-500">{t('workHours')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-400" />
                            <span className="text-zinc-500">{t('weekendHours')}</span>
                        </div>
                    </div>
                </div>

            </div>
        </Card>
    );
}
