/**
 * Milestone Cards Component - Fase 301-325
 * Visual cards showing upcoming life milestones with emotional narrative
 */

'use client';

import { motion } from 'framer-motion';
import { Clock, Calendar, Timer, Zap, Share2 } from 'lucide-react';
import type { Milestone } from '@/hooks/useMilestones';
import { generateMilestoneShareText, shareContent, getShareUrl } from '@/lib/shareUtils';
import { useState } from 'react';

interface MilestoneCardsProps {
    milestones: Milestone[];
    className?: string;
}

const MILESTONE_ICONS = {
    days: Calendar,
    hours: Clock,
    minutes: Timer,
    seconds: Zap,
    yearProgress: Calendar,
};

const MILESTONE_COLORS = {
    days: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-500', text: 'text-blue-700 dark:text-blue-300' },
    hours: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-500', text: 'text-purple-700 dark:text-purple-300' },
    minutes: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-500', text: 'text-amber-700 dark:text-amber-300' },
    seconds: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: 'text-rose-500', text: 'text-rose-700 dark:text-rose-300' },
    yearProgress: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
};

export function MilestoneCards({ milestones, className }: MilestoneCardsProps) {
    const [shareLoading, setShareLoading] = useState<string | null>(null);
    const [shareSuccess, setShareSuccess] = useState<string | null>(null);

    if (milestones.length === 0) return null;

    const handleShare = async (milestone: Milestone) => {
        const key = `${milestone.type}-${milestone.target}`;
        setShareLoading(key);

        const text = generateMilestoneShareText(milestone.label);
        const success = await shareContent({
            text,
            url: getShareUrl(),
        });

        setShareLoading(null);
        if (success) {
            setShareSuccess(key);
            setTimeout(() => setShareSuccess(null), 2000);
        }
    };

    return (
        <div className={className}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-2xl font-bold mb-2">Milestone Terdekat</h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Pencapaian waktu yang akan segera kamu raih
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {milestones.map((milestone, index) => {
                    const Icon = MILESTONE_ICONS[milestone.type];
                    const colors = MILESTONE_COLORS[milestone.type];

                    return (
                        <motion.div
                            key={`${milestone.type}-${milestone.target}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm bg-white/40 dark:bg-black/20 ${colors.bg} ${colors.border}`}
                        >
                            {/* Icon */}
                            <div className={`mb-4 p-3 rounded-xl bg-white/50 dark:bg-black/20 w-fit ${colors.icon}`}>
                                <Icon className="w-6 h-6" />
                            </div>

                            {/* Label */}
                            <h4 className="text-lg font-bold mb-1">{milestone.label}</h4>
                            <p className="text-xs text-muted-foreground mb-4">{milestone.description}</p>

                            {/* Countdown */}
                            <div className="mb-4">
                                <p className={`text-sm font-semibold ${colors.text}`}>
                                    {milestone.daysUntil === 0
                                        ? 'Tercapai hari ini!'
                                        : milestone.daysUntil === 1
                                            ? 'Besok!'
                                            : `Dalam ${milestone.daysUntil.toLocaleString()} hari lagi`}
                                </p>
                                {milestone.date && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {milestone.date.toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                )}
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${milestone.percentage}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
                                    className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${milestone.type === 'days'
                                        ? 'from-blue-400 to-blue-600'
                                        : milestone.type === 'hours'
                                            ? 'from-purple-400 to-purple-600'
                                            : milestone.type === 'minutes'
                                                ? 'from-amber-400 to-amber-600'
                                                : 'from-rose-400 to-rose-600'
                                        }`}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 text-right">
                                {milestone.percentage.toFixed(1)}% tercapai
                            </p>

                            {/* Action Buttons */}
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleShare(milestone)}
                                    disabled={shareLoading === `${milestone.type}-${milestone.target}`}
                                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${shareSuccess === `${milestone.type}-${milestone.target}`
                                        ? 'bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30'
                                        : `${colors.bg} ${colors.border} ${colors.text} border hover:shadow-md`
                                        }`}
                                >
                                    {shareLoading === `${milestone.type}-${milestone.target}` ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Sharing...
                                        </>
                                    ) : shareSuccess === `${milestone.type}-${milestone.target}` ? (
                                        <>
                                            ✓ Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={() => {
                                        import('@/lib/icsGenerator').then(({ generateICSEvent, downloadICSFile, mapMilestoneToEvent }) => {
                                            const event = mapMilestoneToEvent(milestone);
                                            if (event) {
                                                const ics = generateICSEvent(event);
                                                downloadICSFile(ics, `milestone-${milestone.target}.ics`);
                                                import('sonner').then(mod => mod.toast.success('Event saved!'));
                                            }
                                        });
                                    }}
                                    className={`px-3 py-2 rounded-lg border bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/40 transition-colors ${colors.border} ${colors.text}`}
                                    title="Add to Calendar"
                                >
                                    <Calendar className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Decorative blob */}
                            <div
                                className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none ${colors.bg.replace('/10', '/30')}`}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
