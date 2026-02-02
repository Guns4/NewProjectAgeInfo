/**
 * Biological Statistics Component - Fase 326-350
 * Animated cards showing cumulative biological statistics
 */

'use client';

import { motion } from 'framer-motion';
import { Heart, Wind, Moon, Sparkles, Share2 } from 'lucide-react';
import type { BiologicalStats as BioStatsType } from '@/lib/biologicalStats';
import { formatBioStat } from '@/lib/biologicalStats';
import { generateBioStatShareText, shareContent, getShareUrl } from '@/lib/shareUtils';
import { useState } from 'react';

interface BiologicalStatsProps {
    stats: BioStatsType;
    className?: string;
}

export function BiologicalStats({ stats, className }: BiologicalStatsProps) {
    const [shareLoading, setShareLoading] = useState<string | null>(null);
    const [shareSuccess, setShareSuccess] = useState<string | null>(null);
    const bioData = [
        {
            icon: Heart,
            label: 'Detak Jantung',
            value: stats.heartbeats,
            formatted: formatBioStat(stats.heartbeats),
            description: 'Jantungmu telah berdenyut dengan setia',
            color: {
                bg: 'bg-rose-500/10',
                border: 'border-rose-500/20',
                icon: 'text-rose-500',
                text: 'text-rose-700 dark:text-rose-300',
            },
            animation: 'heartbeat',
        },
        {
            icon: Wind,
            label: 'Napas',
            value: stats.breaths,
            formatted: formatBioStat(stats.breaths),
            description: 'Napas kehidupan yang kamu hirup',
            color: {
                bg: 'bg-cyan-500/10',
                border: 'border-cyan-500/20',
                icon: 'text-cyan-500',
                text: 'text-cyan-700 dark:text-cyan-300',
            },
            animation: 'breathe',
        },
        {
            icon: Moon,
            label: 'Waktu Tidur',
            value: stats.sleepYears,
            formatted: `${stats.sleepYears.toFixed(1)} tahun`,
            description: `${stats.sleepDays.toLocaleString('id-ID')} hari istirahat`,
            color: {
                bg: 'bg-indigo-500/10',
                border: 'border-indigo-500/20',
                icon: 'text-indigo-500',
                text: 'text-indigo-700 dark:text-indigo-300',
            },
            animation: 'glow',
        },
        {
            icon: Sparkles,
            label: 'Mimpi',
            value: stats.dreams,
            formatted: formatBioStat(stats.dreams),
            description: 'Petualangan di alam mimpi',
            color: {
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/20',
                icon: 'text-purple-500',
                text: 'text-purple-700 dark:text-purple-300',
            },
            animation: 'twinkle',
        },
    ];

    const handleShare = async (stat: typeof bioData[0]) => {
        setShareLoading(stat.label);

        const text = generateBioStatShareText(stat.label, stat.formatted);
        const success = await shareContent({
            text,
            url: getShareUrl(),
        });

        setShareLoading(null);
        if (success) {
            setShareSuccess(stat.label);
            setTimeout(() => setShareSuccess(null), 2000);
        }
    };

    return (
        <>
            {/* CSS Animations */}
            <style jsx>{`
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    25% { transform: scale(1.15); }
                    50% { transform: scale(1); }
                }
                
                @keyframes breathe {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }
                
                @keyframes glow {
                    0%, 100% { opacity: 0.7; filter: brightness(1); }
                    50% { opacity: 1; filter: brightness(1.3); }
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 1; transform: rotate(0deg) scale(1); }
                    25% { opacity: 0.5; transform: rotate(10deg) scale(0.9); }
                    75% { opacity: 0.8; transform: rotate(-10deg) scale(1.1); }
                }
            `}</style>

            <div className={className}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl font-bold mb-2">Statistik Biologis</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                        Estimasi akumulatif sejak kamu lahir
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bioData.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`relative overflow-hidden rounded-3xl border p-8 backdrop-blur-sm bg-white/40 dark:bg-black/20 ${stat.color.bg} ${stat.color.border}`}
                            >
                                {/* Animated Icon */}
                                <div className={`mb-6 ${stat.color.icon}`}>
                                    <Icon
                                        className="w-12 h-12"
                                        style={{
                                            animation: `${stat.animation} ${stat.animation === 'heartbeat' ? '1.5s' :
                                                stat.animation === 'breathe' ? '3s' :
                                                    stat.animation === 'glow' ? '2s' :
                                                        '2.5s'
                                                } ease-in-out infinite`,
                                        }}
                                    />
                                </div>

                                {/* Label */}
                                <p className="text-xs font-semibold uppercase tracking-wider opacity-60 mb-2">
                                    {stat.label}
                                </p>

                                {/* Value */}
                                <h4 className={`text-4xl font-bold mb-2 ${stat.color.text}`}>
                                    {stat.formatted}
                                </h4>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground italic mb-4">
                                    {stat.description}
                                </p>

                                {/* Share Button */}
                                <button
                                    onClick={() => handleShare(stat)}
                                    disabled={shareLoading === stat.label}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${shareSuccess === stat.label
                                            ? 'bg-green-500/20 text-green-700 dark:text-green-300 border border-green-500/30'
                                            : `${stat.color.bg} ${stat.color.border} ${stat.color.text} border hover:shadow-md`
                                        }`}
                                >
                                    {shareLoading === stat.label ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Berbagi...
                                        </>
                                    ) : shareSuccess === stat.label ? (
                                        <>
                                            ✓ Tersalin!
                                        </>
                                    ) : (
                                        <>
                                            <Share2 className="w-4 h-4" />
                                            Bagikan Fakta Unik
                                        </>
                                    )}
                                </button>

                                {/* Decorative blob */}
                                <div
                                    className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none ${stat.color.bg.replace('/10', '/30')}`}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
