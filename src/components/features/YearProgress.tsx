/**
 * Year Progress Component - Fase 301-325
 * Circular progress showing current year completion
 */

'use client';

import { motion } from 'framer-motion';
import { Calendar, TrendingUp } from 'lucide-react';

interface YearProgressProps {
    percentage: number;
    daysRemaining: number;
    daysPassed: number;
    daysTotal: number;
    className?: string;
}

export function YearProgress({
    percentage,
    daysRemaining,
    daysPassed,
    daysTotal,
    className,
}: YearProgressProps) {
    const circumference = 2 * Math.PI * 54; // radius 54
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 backdrop-blur-md p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Circular Progress */}
                    <div className="relative">
                        <svg width="140" height="140" className="transform -rotate-90">
                            {/* Background circle */}
                            <circle
                                cx="70"
                                cy="70"
                                r="54"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="none"
                                className="text-gray-200 dark:text-gray-700"
                            />
                            {/* Progress circle */}
                            <motion.circle
                                cx="70"
                                cy="70"
                                r="54"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ strokeDashoffset: circumference }}
                                whileInView={{ strokeDashoffset: offset }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                style={{
                                    strokeDasharray: circumference,
                                }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#14b8a6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        {/* Center text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                                {percentage.toFixed(1)}%
                            </p>
                            <p className="text-xs text-muted-foreground">Tahun {new Date().getFullYear()}</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">Progress Tahun Ini</h4>
                                <p className="text-sm text-muted-foreground">
                                    Seberapa jauh perjalananmu di {new Date().getFullYear()}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-emerald-500/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500/60">
                                        Sudah Lewat
                                    </p>
                                </div>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {daysPassed.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground">hari ({daysTotal} total)</p>
                            </div>

                            <div className="p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-emerald-500/20">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="w-4 h-4 text-emerald-500" />
                                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500/60">
                                        Tersisa
                                    </p>
                                </div>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {daysRemaining.toLocaleString()}
                                </p>
                                <p className="text-xs text-muted-foreground">hari lagi</p>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground italic">
                            "Manfaatkan setiap hari yang tersisa untuk mencapai tujuanmu!"
                        </p>
                    </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full pointer-events-none" />
            </div>
        </motion.div>
    );
}
