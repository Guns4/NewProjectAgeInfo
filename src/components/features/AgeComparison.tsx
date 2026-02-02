/**
 * Age Comparison Component - Fase 381-400
 * Inspirational comparisons with famous figures and cosmic context
 */

'use client';

import { motion } from 'framer-motion';
import { Trophy, Rocket, Moon, Globe } from 'lucide-react';
import type { AgeComparison as AgeComparisonType, CosmicContext } from '@/services/comparisonService';
import { formatDistance } from '@/services/comparisonService';

interface AgeComparisonProps {
    comparisons: AgeComparisonType[];
    cosmicContext: CosmicContext;
    currentAge: number;
    className?: string;
}

const CATEGORY_ICONS = {
    technology: Rocket,
    business: Trophy,
    science: Globe,
    arts: Trophy,
    sports: Trophy,
    history: Globe,
};

const CATEGORY_COLORS = {
    technology: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-500', text: 'text-blue-700 dark:text-blue-300' },
    business: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
    science: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-500', text: 'text-purple-700 dark:text-purple-300' },
    arts: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', icon: 'text-pink-500', text: 'text-pink-700 dark:text-pink-300' },
    sports: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: 'text-orange-500', text: 'text-orange-700 dark:text-orange-300' },
    history: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-500', text: 'text-amber-700 dark:text-amber-300' },
};

export function AgeComparison({ comparisons, cosmicContext, currentAge, className }: AgeComparisonProps) {
    return (
        <div className={className}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-2xl font-bold mb-2">Komparasi Kreatif</h3>
                <p className="text-sm text-muted-foreground mb-8">
                    Inspirasi dari tokoh-tokoh hebat dan konteks kosmik perjalananmu
                </p>
            </motion.div>

            {/* Famous Achievements Section */}
            {comparisons.length > 0 && (
                <div className="mb-8">
                    <motion.h4
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-lg font-bold mb-4"
                    >
                        Di Usia {currentAge} Tahun
                    </motion.h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {comparisons.map((comparison, index) => {
                            const Icon = CATEGORY_ICONS[comparison.category];
                            const colors = CATEGORY_COLORS[comparison.category];

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className={`relative overflow-hidden rounded-3xl border p-6 backdrop-blur-sm bg-white/40 dark:bg-black/20 ${colors.bg} ${colors.border}`}
                                >
                                    {/* Icon */}
                                    <div className={`mb-4 ${colors.icon}`}>
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    {/* Quote-style content */}
                                    <div className="mb-4">
                                        <p className={`text-sm font-bold ${colors.text}`}>
                                            {comparison.person}
                                        </p>
                                        <p className="text-lg font-semibold mt-2 leading-relaxed">
                                            {comparison.achievement}
                                        </p>
                                    </div>

                                    {/* Year badge */}
                                    <div className="inline-block px-3 py-1 rounded-full bg-white/50 dark:bg-black/20 text-xs font-semibold">
                                        {comparison.year}
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
            )}

            {/* Cosmic Context Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <h4 className="text-lg font-bold mb-4">Konteks Kosmik</h4>

                <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md p-8">
                    {/* Space background effect */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-10 left-20 w-2 h-2 bg-white rounded-full animate-pulse" />
                        <div className="absolute top-32 right-40 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute top-1/2 right-20 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 relative z-10">
                        Sejak kamu lahir, perjalanan kosmikmu:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        {/* Earth Orbit */}
                        <div className="text-center">
                            <div className="mb-3">
                                <Globe className="w-10 h-10 mx-auto text-blue-500" />
                            </div>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                {formatDistance(cosmicContext.earthOrbitDistance)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                jarak Bumi mengelilingi Matahari
                            </p>
                        </div>

                        {/* Moon Drift */}
                        <div className="text-center">
                            <div className="mb-3">
                                <Moon className="w-10 h-10 mx-auto text-purple-500" />
                            </div>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                                {cosmicContext.moonDrift} cm
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Bulan menjauh dari Bumi
                            </p>
                        </div>

                        {/* Galaxy Travel */}
                        <div className="text-center">
                            <div className="mb-3">
                                <Rocket className="w-10 h-10 mx-auto text-pink-500" />
                            </div>
                            <p className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">
                                {cosmicContext.galaxyDistance.toLocaleString('id-ID')} juta km
                            </p>
                            <p className="text-xs text-muted-foreground">
                                perjalanan melalui galaksi
                            </p>
                        </div>
                    </div>

                    {/* Decorative gradient blobs */}
                    <div className="absolute -top-8 -left-8 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-500/20 blur-3xl rounded-full pointer-events-none" />
                </div>
            </motion.div>
        </div>
    );
}
