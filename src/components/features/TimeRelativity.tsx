'use client';

import { motion } from 'framer-motion';
import { Flag, Smartphone, Globe } from 'lucide-react';
import { calculateRelativity } from '@/lib/timeRelativity';

interface TimeRelativityProps {
    birthDate: Date;
    ageInYears: number;
    className?: string;
}

export function TimeRelativity({ birthDate, ageInYears, className = '' }: TimeRelativityProps) {
    const data = calculateRelativity(birthDate, ageInYears);

    const cards = [
        {
            icon: Flag,
            label: 'Sejarah Kemerdekaan',
            value: data.independencePercentage,
            desc: 'Kamu telah menjadi bagian dari sejarah Indonesia selama ini.',
            color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
        },
        {
            icon: Smartphone,
            label: 'Generasi iPhone',
            value: `${data.iphoneGenerations} Generasi`,
            desc: `Sejak kamu lahir, Apple telah merilis ${data.iphoneGenerations} generasi iPhone.`,
            color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
        },
        {
            icon: Globe,
            label: 'Skala Waktu Bumi',
            value: `${data.cosmicMilliseconds} ms`,
            desc: 'Jika sejarah Bumi dipadatkan jadi 24 jam, hidupmu setara sekedip mata ini.',
            color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
        }
    ];

    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
            {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-6 rounded-2xl border backdrop-blur-sm ${card.color}`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-semibold text-sm opacity-80">{card.label}</span>
                        </div>
                        <div className="text-2xl font-bold mb-2">
                            {card.value}
                        </div>
                        <p className="text-xs opacity-70 leading-relaxed">
                            {card.desc}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}
