'use client';

import { motion } from 'framer-motion';
import { Gamepad2, Tv, Music } from 'lucide-react';
import { getTimeCapsule } from '@/services/historicalService';
import { useEffect, useState } from 'react';

interface NostalgiaViewProps {
    birthYear: number;
    className?: string;
}

interface EraData {
    age: number;
    year: number;
    title: string;
    description: string;
    icon: any;
    item: string;
}

export function NostalgiaView({ birthYear, className = '' }: NostalgiaViewProps) {
    const [eras, setEras] = useState<EraData[]>([]);

    useEffect(() => {
        const loadEras = async () => {
            const milestones = [
                { age: 5, label: 'Masuk TK/SD' },
                { age: 10, label: 'Anak-anak' },
                { age: 15, label: 'Remaja' }
            ];

            const erasData: EraData[] = [];

            for (const m of milestones) {
                const targetYear = birthYear + m.age;
                // Find closest decade for data (since we only have decade buckets 1980, 1990, etc for now)
                // Logic: 2005 -> 2000s data, 2012 -> 2010s data.
                const decade = Math.floor(targetYear / 10) * 10;

                // Fallback if decade doesn't exist? (e.g. 2026 -> 2020?)
                // Assuming getAvailableYears covers up to 2010 or we mocked it.
                // Note: existing data stops at 2010.

                // Try to get data
                // In a real app we'd have year-specific data. 
                // Here we simulate "Era Context" using the decade data we do have.
                const capsule = await getTimeCapsule(decade);

                let context = {
                    item: 'Unknown',
                    desc: 'Era misterius...',
                    icon: Gamepad2
                };

                if (capsule.hasData) {
                    if (m.age === 5) {
                        // Age 5: Toys/Tv (Pop Culture)
                        const item = capsule.popCulture[0]; // Movie/Song
                        context = {
                            item: item?.title || 'Kartun Minggu Pagi',
                            desc: `Populer saat kamu umur ${m.age}`,
                            icon: Tv
                        };
                    } else if (m.age === 10) {
                        // Age 10: Games/Tech
                        const item = capsule.technology[0];
                        context = {
                            item: item?.title || 'Game Console',
                            desc: `Teknologi masa kecilmu`,
                            icon: Gamepad2
                        };
                    } else {
                        // Age 15: Music/Trends
                        const item = capsule.popCulture[1] || capsule.popCulture[0];
                        context = {
                            item: item?.title || 'Musik Hits',
                            desc: `Soundtrack masa remajamu`,
                            icon: Music
                        };
                    }
                }

                erasData.push({
                    age: m.age,
                    year: targetYear,
                    title: m.label,
                    description: context.desc,
                    icon: context.icon,
                    item: context.item
                });
            }
            setEras(erasData);
        };

        loadEras();
    }, [birthYear]);

    if (eras.length === 0) return null;

    return (
        <div className={className}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-slate-900 border-4 border-slate-700 p-6 rounded-xl font-press-start text-xs md:text-sm text-green-400 relative overflow-hidden"
            >
                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

                <h3 className="text-center text-yellow-400 mb-8 uppercase tracking-widest text-lg animate-pulse">
                    &lt; MEMORY CARD /&gt;
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {eras.map((era, idx) => {
                        const Icon = era.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="flex flex-col items-center text-center space-y-3 group"
                            >
                                <div className="relative">
                                    <div className="w-16 h-16 bg-slate-800 border-2 border-green-500 rounded-none flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                        <Icon className="w-8 h-8 text-green-400" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 px-2 py-1 text-[10px] font-bold">
                                        LVL {era.age}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-slate-500 text-[10px]">YEAR {era.year}</div>
                                    <div className="text-white font-bold my-1 min-h-[40px] flex items-center justify-center">
                                        {era.item}
                                    </div>
                                    <div className="text-green-600/80 text-[10px] max-w-[150px] mx-auto">
                                        {era.description}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-8 text-center text-[10px] text-slate-600">
                    INSERT COIN TO CONTINUE...
                </div>
            </motion.div>
        </div>
    );
}
