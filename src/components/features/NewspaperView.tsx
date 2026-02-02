'use client';

import { motion } from 'framer-motion';
import { TimeCapsule } from '@/services/historicalService';
import { useLocale } from 'next-intl';

interface NewspaperViewProps {
    date: Date;
    data: TimeCapsule;
    className?: string;
}

export function NewspaperView({ date, data, className = '' }: NewspaperViewProps) {
    const locale = useLocale();
    const formattedDate = date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Determine the "Headline" event (first world event)
    const headlineEvent = data.events.worldEvents[0];
    const subEvents = [
        ...data.events.worldEvents.slice(1),
        ...data.events.technology.slice(0, 1),
    ].slice(0, 3); // Take next 3 mixed events

    const popCulture = data.events.popCulture[0];

    return (
        <div className={className}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="relative bg-[#f4e4bc] dark:bg-[#2c241b] text-black dark:text-[#e0d0b0] p-6 md:p-8 rounded-sm shadow-2xl overflow-hidden max-w-4xl mx-auto"
            >
                {/* Paper Texture Overlay (CSS Pattern) */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`
                    }}
                />

                {/* Header */}
                <header className="border-b-4 border-black dark:border-[#e0d0b0] pb-4 mb-6 relative z-10 text-center">
                    <h1 className="font-playfair text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">
                        The Daily Chronicle
                    </h1>
                    <div className="flex justify-between items-center text-xs md:text-sm font-serif border-t border-black dark:border-[#e0d0b0] pt-2 mt-2 uppercase tracking-widest">
                        <span>Vol. {date.getFullYear()}</span>
                        <span className="font-bold">{formattedDate}</span>
                        <span>{data.generation} Edition</span>
                    </div>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 font-serif">

                    {/* LEFT COLUMN (Headline) */}
                    <div className="md:col-span-8 space-y-6">
                        {headlineEvent && (
                            <div className="border-b border-black/20 dark:border-[#e0d0b0]/20 pb-6">
                                <span className="inline-block bg-black dark:bg-[#e0d0b0] text-[#f4e4bc] dark:text-[#2c241b] px-2 py-1 text-xs font-bold uppercase mb-2">
                                    Breaking News
                                </span>
                                <h2 className="font-playfair text-3xl md:text-4xl font-bold leading-tight mb-3">
                                    {headlineEvent.title}
                                </h2>
                                <p className="text-lg leading-relaxed opacity-90 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
                                    {headlineEvent.description}
                                </p>
                            </div>
                        )}

                        {/* Sub Headlines */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {subEvents.map((event, idx) => (
                                <div key={idx} className="border-l-2 border-black/10 dark:border-[#e0d0b0]/10 pl-4">
                                    <h4 className="font-bold font-playfair uppercase text-sm mb-1">{event.title}</h4>
                                    <p className="text-sm opacity-80 line-clamp-3">{event.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="md:col-span-4 border-l border-black/20 dark:border-[#e0d0b0]/20 md:pl-6 flex flex-col gap-6">

                        {/* Weather / Chart Placeholder */}
                        <div className="bg-black/5 dark:bg-[#e0d0b0]/5 p-4 rounded-sm border border-black/10">
                            <h3 className="font-playfair font-bold text-lg mb-2 text-center uppercase border-b border-black/10 pb-1">Stats</h3>
                            <div className="text-center font-mono text-sm space-y-1">
                                <p>Year: {date.getFullYear()}</p>
                                <p>Era: {data.generation}</p>
                            </div>
                        </div>

                        {/* Pop Culture Section */}
                        {popCulture && (
                            <div>
                                <h3 className="font-playfair font-bold text-xl mb-3 border-y-2 border-black dark:border-[#e0d0b0] py-2 text-center">
                                    Pop Culture
                                </h3>
                                <div className="space-y-4">
                                    <div className="text-center">
                                        <p className="text-xs uppercase tracking-widest font-bold opacity-60">Top Hit / Movie</p>
                                        <h4 className="text-lg font-bold italic">"{popCulture.title}"</h4>
                                        <p className="text-sm mt-1">{popCulture.description}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 'It Was You' Box */}
                        <div className="mt-auto bg-black dark:bg-[#e0d0b0] text-[#f4e4bc] dark:text-[#2c241b] p-4 text-center">
                            <h4 className="font-playfair font-bold text-xl mb-1">A Star is Born!</h4>
                            <p className="text-sm italic">
                                On this very day, the world welcomed a new legend. Happy Birthday!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Stamp */}
                <div className="absolute bottom-4 right-4 opacity-10 rotate-[-15deg] pointer-events-none">
                    <div className="border-4 border-red-800 dark:border-red-400 p-2 rounded-lg">
                        <span className="font-black text-4xl text-red-800 dark:text-red-400 uppercase">Archive</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
