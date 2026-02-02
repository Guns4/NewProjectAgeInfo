/**
 * Lucky Palette Component - Fase 295.3
 * Displays lucky colors and numbers in a minimalist, aesthetic design
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Palette, Sparkles } from 'lucide-react';
import { getLuckyTraits, type LuckyTraits } from '@/lib/luckyTraits';

interface LuckyPaletteProps {
    birthDate: Date;
    className?: string;
}

export function LuckyPalette({ birthDate, className }: LuckyPaletteProps) {
    const [traits, setTraits] = React.useState<LuckyTraits | null>(null);

    React.useEffect(() => {
        const luckyTraits = getLuckyTraits(birthDate);
        setTraits(luckyTraits);
    }, [birthDate]);

    if (!traits) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
            className={className}
        >
            <div className="p-8 rounded-3xl border border-gradient-to-r from-purple-500/20 to-pink-500/20 bg-gradient-to-br from-purple-500/5 to-pink-600/5 backdrop-blur-md relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                        <Palette className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-purple-900 dark:text-purple-100">
                        Your Lucky Palette
                    </h4>
                    <Sparkles className="w-4 h-4 text-purple-400 ml-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Lucky Colors Section */}
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-purple-500/60">
                            Lucky Colors ({traits.element} Element)
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                            {traits.colors.map((color, index) => (
                                <motion.div
                                    key={color.hex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div
                                        className="w-16 h-16 rounded-2xl shadow-lg border-2 border-white/20 relative overflow-hidden group cursor-pointer"
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">
                                            {color.name}
                                        </p>
                                        <p className="text-[9px] font-mono text-gray-500 dark:text-gray-400">
                                            {color.hex}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                            Colors that resonate with your cosmic energy
                        </p>
                    </div>

                    {/* Lucky Numbers Section */}
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-purple-500/60">
                            Lucky Numbers
                        </p>
                        <div className="grid grid-cols-5 gap-3">
                            {traits.numbers.map((number, index) => (
                                <motion.div
                                    key={number}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ scale: 1.1 }}
                                    className="aspect-square flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-300/30 shadow-md"
                                >
                                    <span className="text-2xl font-black text-purple-700 dark:text-purple-300">
                                        {number}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                            Numbers aligned with your birth essence
                        </p>
                    </div>
                </div>

                {/* Decorative gradient blob */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full pointer-events-none" />
            </div>
        </motion.div>
    );
}
