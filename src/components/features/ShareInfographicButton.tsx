/**
 * ShareInfographicButton Component - Fase 461-480
 * Premium CTA button to trigger infographic generation
 */

'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Share2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
// Lazy load the dialog to reduce initial bundle size (LCP)
const InfographicDialog = dynamic(
    () => import('@/components/features/InfographicDialog').then(mod => mod.InfographicDialog),
    { ssr: false }
);
import type { AgeResult } from '@/hooks/calculator/useAgeCalculator';

interface ShareInfographicButtonProps {
    birthDate: Date;
    age: AgeResult;
    className?: string;
}

export function ShareInfographicButton({ birthDate, age, className }: ShareInfographicButtonProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn("relative z-10", className)}
            >
                <Button
                    onClick={() => setIsOpen(true)}
                    size="lg"
                    className="relative group overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 px-8 py-6"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="relative flex items-center gap-2 font-bold text-lg">
                        <Share2 className="w-5 h-5" />
                        <span>Create Poster</span>
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                    </div>
                </Button>
            </motion.div>

            <InfographicDialog
                birthDate={birthDate}
                age={age}
                open={isOpen}
                onOpenChange={setIsOpen}
            />
        </>
    );
}
