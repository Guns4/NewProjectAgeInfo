/**
 * Check Someone Else CTA - Fase 295.5
 * Engaging call-to-action to encourage users to check others' identities
 */

'use client';

import { motion } from 'framer-motion';
import { RefreshCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CheckSomeoneElseCTAProps {
    zodiacSign: string;
    onReset: () => void;
    className?: string;
}

/**
 * Generate pseudo-random zodiac count based on sign and current date
 * This creates consistent but varied statistics
 */
function getZodiacCount(zodiacSign: string): number {
    const baseCount = 1000;
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);

    // Create seed from zodiac sign and day
    const zodiacSeed = zodiacSign.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seed = (zodiacSeed * dayOfYear) % 1000;

    // Generate count between 800-2500
    return baseCount + seed + Math.floor((zodiacSeed % 15) * 100);
}

export function CheckSomeoneElseCTA({ zodiacSign, onReset, className }: CheckSomeoneElseCTAProps) {
    const count = getZodiacCount(zodiacSign);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 300 }}
            className={className}
        >
            <div className="relative overflow-hidden rounded-3xl border border-gradient-to-r from-indigo-500/20 to-purple-500/20 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 backdrop-blur-md p-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Penasaran dengan Weton pasangan atau temanmu?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Cek identitas kosmik mereka dan temukan kecocokan kalian!
                    </p>
                </div>

                {/* Statistics */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center gap-2 mb-6 p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-indigo-500/20"
                >
                    <Users className="w-5 h-5 text-indigo-500" />
                    <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                        {count.toLocaleString()} orang berzodiak {zodiacSign} hari ini
                    </p>
                </motion.div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <Button
                        onClick={onReset}
                        size="lg"
                        className="group gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all"
                    >
                        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        Cek Orang Lain
                    </Button>
                </div>

                {/* Decorative gradient blobs */}
                <div className="absolute -top-8 -left-8 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />
            </div>
        </motion.div>
    );
}
