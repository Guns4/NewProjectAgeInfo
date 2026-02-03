'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { calculateZodiac } from '@/lib/identity-engine';

interface YearInReviewProps {
    birthDate: Date;
    isOpen: boolean;
    onClose: () => void;
    workHours: number; // Reusing workHours / 8 or so as days? Or passing days directly?
    // User said: "Kamu melewati X hari kerja". 
    // We can calculate work days roughly from years * 260.
    // Or pass a prop. Let's pass `workDays` prop.
}

export const YearInReviewSlides = ({ birthDate, isOpen, onClose, workHours }: YearInReviewProps) => {
    const t = useTranslations('Results.YearInReview');
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;

    const zodiac = calculateZodiac(birthDate);
    const workDays = Math.floor(workHours / 8);
    const age = new Date().getFullYear() - birthDate.getFullYear();

    // Zodiac Shining Month Logic (Simple Map)
    const zodiacMonthMap: Record<string, string> = {
        Capricorn: 'January', Aquarius: 'February', Pisces: 'March', Aries: 'April',
        Taurus: 'May', Gemini: 'June', Cancer: 'July', Leo: 'August',
        Virgo: 'September', Libra: 'October', Scorpio: 'November', Sagittarius: 'December'
    };
    const shiningMonth = zodiacMonthMap[zodiac.sign] || 'January';

    // Auto-advance timer
    useEffect(() => {
        if (!isOpen) return;

        // If not last slide, advance
        if (currentSlide < totalSlides - 1) {
            const timer = setTimeout(() => {
                setCurrentSlide(prev => prev + 1);
            }, 5000); // 5 seconds per slide
            return () => clearTimeout(timer);
        }
        return;
    }, [currentSlide, isOpen]);

    // Reset when opened
    useEffect(() => {
        if (isOpen) setCurrentSlide(0);
    }, [isOpen]);

    const slides = [
        {
            id: 0,
            content: (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-6xl font-black mb-4"
                    >
                        {age}
                    </motion.div>
                    <div className="text-2xl font-medium">
                        {t('slide1', { age })}
                    </div>
                </div>
            )
        },
        {
            id: 1,
            content: (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gradient-to-br from-orange-400 to-pink-600 text-white">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl font-bold mb-6"
                    >
                        🏢 {workDays.toLocaleString()}
                    </motion.div>
                    <div className="text-2xl font-medium">
                        {t('slide2', { workDays })}
                    </div>
                </div>
            )
        },
        {
            id: 2,
            content: (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
                    <motion.div
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        className="text-6xl mb-6"
                    >
                        ✨
                    </motion.div>
                    <div className="text-xl font-medium mb-2">
                        {zodiac.sign}
                    </div>
                    <div className="text-3xl font-bold px-4 leading-tight">
                        {t('slide3', { zodiac: zodiac.sign, month: shiningMonth })}
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 w-full"
                    >
                        <Button
                            onClick={() => {
                                // Share Logic (Mock)
                                if (typeof navigator !== 'undefined' && 'share' in navigator) {
                                    navigator.share({
                                        title: 'My AgeInfo Journey',
                                        text: `I'm ${age} years old and survived ${workDays} work days! Check yours at AgeInfo.online`,
                                        url: window.location.href
                                    }).catch(console.error);
                                } else {
                                    alert('Thanks for sharing your journey!');
                                }
                            }}
                            className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold py-6 text-lg rounded-xl shadow-xl transform transition-transform active:scale-95"
                        >
                            <Share2 className="mr-2 w-5 h-5" />
                            {t('cta')}
                        </Button>
                    </motion.div>
                </div>
            )
        }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                >
                    <div className="relative w-full max-w-md aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        {/* Progress Bars */}
                        <div className="absolute top-4 left-4 right-4 flex gap-2 z-20">
                            {slides.map((_, idx) => (
                                <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-white"
                                        initial={{ width: '0%' }}
                                        animate={{
                                            width: idx < currentSlide ? '100%' : idx === currentSlide ? '100%' : '0%'
                                        }}
                                        transition={{
                                            duration: idx === currentSlide ? 5 : 0,
                                            ease: "linear"
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 text-white/80 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Slide Content */}
                        <div className="absolute inset-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full h-full"
                                >
                                    {slides[currentSlide]?.content}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Zones */}
                        <div className="absolute inset-0 flex z-10">
                            <div
                                className="w-1/3 h-full"
                                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                            />
                            <div
                                className="w-2/3 h-full"
                                onClick={() => {
                                    if (currentSlide < totalSlides - 1) {
                                        setCurrentSlide(currentSlide + 1);
                                    } else {
                                        // Loop or stay? Stay.
                                    }
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const YearInReviewTrigger = ({ onClick }: { onClick: () => void }) => {
    const t = useTranslations('Results.YearInReview');
    return (
        <Button
            onClick={onClick}
            variant="ghost"
            className="w-full h-auto py-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all group overflow-hidden relative"
        >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex flex-col items-center gap-2">
                <Play className="w-8 h-8 fill-current" />
                <span className="text-xl font-bold tracking-wide">{t('button')}</span>
                <span className="text-sm opacity-90 font-medium">Stories Style</span>
            </div>
        </Button>
    );
};
