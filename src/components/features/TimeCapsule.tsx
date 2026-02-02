/**
 * Time Capsule Component - Fase 351-380
 * Retro newspaper-style display of historical events
 */

'use client';

import { motion } from 'framer-motion';
import { Globe, Film, Cpu, Calendar } from 'lucide-react';
import type { TimeCapsule as TimeCapsuleType } from '@/services/historicalService';

interface TimeCapsuleProps {
    data: TimeCapsuleType;
    className?: string;
}

export function TimeCapsule({ data, className }: TimeCapsuleProps) {
    if (!data.hasData) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={className}
            >
                <div className="text-center p-12 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-amber-500 opacity-50" />
                    <p className="text-muted-foreground">
                        Data historis untuk tahun {data.year} belum tersedia.
                    </p>
                </div>
            </motion.div>
        );
    }

    const sections = [
        {
            title: 'Peristiwa Dunia',
            icon: Globe,
            events: data.worldEvents,
            color: {
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/20',
                icon: 'text-blue-500',
                text: 'text-blue-700 dark:text-blue-300',
            },
        },
        {
            title: 'Kultur Pop',
            icon: Film,
            events: data.popCulture,
            color: {
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/20',
                icon: 'text-purple-500',
                text: 'text-purple-700 dark:text-purple-300',
            },
        },
        {
            title: 'Teknologi',
            icon: Cpu,
            events: data.technology,
            color: {
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/20',
                icon: 'text-emerald-500',
                text: 'text-emerald-700 dark:text-emerald-300',
            },
        },
    ];

    return (
        <div className={className}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <h3 className="text-4xl font-bold mb-2 font-serif">Kapsul Waktu: {data.year}</h3>
                    <p className="text-lg text-muted-foreground italic">
                        Saat kamu lahir, dunia sedang...
                    </p>
                </div>
            </motion.div>

            {/* Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {sections.map((section, sectionIndex) => {
                    const Icon = section.icon;

                    return (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
                            className={`relative overflow-hidden rounded-3xl border backdrop-blur-sm bg-white/40 dark:bg-black/20 ${section.color.bg} ${section.color.border}`}
                        >
                            {/* Section Header */}
                            <div className="p-6 border-b border-current/10">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-white/50 dark:bg-black/20 ${section.color.icon}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-lg">{section.title}</h4>
                                </div>
                            </div>

                            {/* Events */}
                            <div className="p-6 space-y-4">
                                {section.events.length === 0 ? (
                                    <p className="text-sm text-muted-foreground italic text-center py-4">
                                        Tidak ada data tersedia
                                    </p>
                                ) : (
                                    section.events.map((event, eventIndex) => {
                                        // Alternate animation direction: even from left, odd from right
                                        const isEven = eventIndex % 2 === 0;
                                        const direction = isEven ? -50 : 50; // negative = left, positive = right

                                        return (
                                            <motion.div
                                                key={eventIndex}
                                                initial={{ opacity: 0, x: direction, scale: 0.95 }}
                                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                                viewport={{ once: true, margin: "-50px" }}
                                                transition={{
                                                    delay: eventIndex * 0.15,
                                                    duration: 0.6,
                                                    ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth entrance
                                                }}
                                                className="group"
                                            >
                                                {/* Event Card */}
                                                <div className="relative p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-current/10 hover:shadow-lg transition-shadow duration-300">
                                                    {/* Date Badge (if available) */}
                                                    {event.date && (
                                                        <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-md">
                                                            {new Date(event.date).toLocaleDateString('id-ID', {
                                                                day: 'numeric',
                                                                month: 'short',
                                                            })}
                                                        </div>
                                                    )}

                                                    {/* Title */}
                                                    <h5 className={`font-bold mb-2 font-serif ${section.color.text}`}>
                                                        {event.title}
                                                    </h5>

                                                    {/* Description */}
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {event.description}
                                                    </p>

                                                    {/* Category Badge (for pop culture) */}
                                                    {event.category && ['film', 'music'].includes(event.category) && (
                                                        <div className="mt-3 inline-block">
                                                            <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300 font-semibold">
                                                                {event.category === 'film' ? '🎬 Film' : '🎵 Musik'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Decorative blob */}
                            <div
                                className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none ${section.color.bg.replace('/10', '/30')}`}
                            />
                        </motion.div>
                    );
                })}
            </div>

            {/* Vintage Newspaper Border Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-multiply">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,currentColor_2px,currentColor_3px)]" />
            </div>
        </div>
    );
}
