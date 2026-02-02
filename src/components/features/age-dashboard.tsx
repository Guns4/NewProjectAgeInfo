"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PremiumCard } from "@/components/ui/card-premium";
import { FloatingInput } from "@/components/ui/input-floating";
import { BirthdayCountdown } from "@/components/features/birthday-countdown";
import { SecondsCounter } from "@/components/features/SecondsCounter";
import { useAgeCalculator, AgeResult } from "@/hooks/calculator/useAgeCalculator";
import { cn, formatUnit } from "@/lib/utils";
import { IdentitySection } from "@/components/features/IdentitySection";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

interface AgeDashboardProps {
    className?: string;
}

// Animation variants for staggered reveal
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// Counter animation component
const CountUp = ({ value, label, className }: { value: number; label: string; className?: string }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className={cn("font-bold tabular-nums tracking-tighter", className)}
            >
                {value}
            </motion.span>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-2">
                {label}
            </span>
        </div>
    );
};

import { useSearchHistory } from "@/hooks/useSearchHistory";
import { HistoryChips } from "@/components/features/HistoryChips";
import confetti from "canvas-confetti";
import { Rocket, Baby, PartyPopper } from "lucide-react";

export function AgeDashboard({ className }: AgeDashboardProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const locale = useLocale();
    const { history, addToHistory, isLoaded } = useSearchHistory();

    const [dateString, setDateString] = React.useState<string>("");
    const [birthDate, setBirthDate] = React.useState<Date | null>(null);

    // Derived states for Edge Cases
    const [dashboardMode, setDashboardMode] = React.useState<'standard' | 'future' | 'newborn' | 'birthday'>('standard');

    // ... (helper updateDateSource) ...
    const updateDateSource = (value: string) => {
        setDateString(value);
        // ... (existing helper logic, just copy it if replacing block, or assume it exists if I target below it)
        // Wait, I am replacing the top part of the function, so I need to include the helper if it's in the range. 
        // My StartLine is 56 (export function...). 

        // Let's implement the FULL Logic here because I need to insert the derived state logic which depends on birthDate.

        // Update URL
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set('dob', value);
        else params.delete('dob');
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });

        if (value) {
            const date = new Date(value);
            // Relaxed validation for future date check
            if (!isNaN(date.getTime())) {
                setBirthDate(date);
                // History saving is separate
            } else {
                setBirthDate(null);
            }
        } else {
            setBirthDate(null);
        }
    };

    // Edge Case Logic
    React.useEffect(() => {
        if (!birthDate) {
            setDashboardMode('standard');
            return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const compareDate = new Date(birthDate);
        compareDate.setHours(0, 0, 0, 0);

        // 1. Future Date (Time Traveler)
        if (compareDate > today) {
            setDashboardMode('future');
            return;
        }

        // 2. Birthday (Confetti)
        const isBday = today.getDate() === compareDate.getDate() && today.getMonth() === compareDate.getMonth();
        if (isBday) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                zIndex: 9999
            });
        }

        // 3. Newborn (< 30 days)
        const diffTime = Math.abs(today.getTime() - compareDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) {
            setDashboardMode('newborn');
        } else {
            setDashboardMode('standard');
        }
    }, [birthDate]);


    // Phase 190.1: Initialize from URL
    React.useEffect(() => {
        const dobParam = searchParams.get('dob');
        if (dobParam && dobParam !== dateString) {
            // Validate basic format YYYY-MM-DD
            const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(dobParam);
            if (isValidFormat) {
                const date = new Date(dobParam);
                if (!isNaN(date.getTime())) {
                    // Only set if different to avoid loop
                    if (dateString !== dobParam) {
                        setDateString(dobParam);
                        setBirthDate(date);
                    }
                }
            }
        }
    }, [searchParams, dateString]); // Added dateString to dependencies to prevent infinite loop if dobParam is same as dateString

    // Phase 190.4: Save to history when a valid birthDate is set
    // We debounce this slightly to avoid saving rapid changes if any
    React.useEffect(() => {
        if (birthDate && dateString) {
            // Check if valid full date string YYYY-MM-DD
            if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
                const timer = setTimeout(() => {
                    addToHistory(dateString);
                }, 1000); // 1s debounce to ensure user finished typing if manual
                return () => clearTimeout(timer);
            }
        }
    }, [birthDate, dateString, addToHistory]); // Added addToHistory to dependencies

    // Use the hook
    const { age, error } = useAgeCalculator(birthDate);

    // Helper for determining visibility (Zero Handling Phase 190.3)
    // Rule: Hide 0 months unless total age < 1 month (newborn)
    const getVisibility = (currentAge: typeof age) => {
        if (!currentAge) return { year: false, month: false, day: false };

        const isNewborn = currentAge.years === 0 && currentAge.months === 0; // Less than 1 month old

        return {
            year: currentAge.years > 0,
            month: currentAge.months > 0 || isNewborn,
            // Note: If newborn (0y, 0m, 5d), month is 0 but we might want to hide it based on "Hide... unless...". 
            // The prompt says: "Hide '0 Month' ... EXCEPT if total age < 1 month".
            // So if total age < 1 month (isNewborn), we SHOW '0 Month'? 
            // "Sembunyikan ... KECUALI jika umurnya total di bawah 1 bulan".
            // This means for a 5 day old baby, we see "0 Bulan, 5 Hari".
            // This seems logical for completeness for babies.

            day: true // Always show days
        };
    };

    // Calculate visibility
    const visibility = age ? getVisibility(age) : { year: false, month: false, day: false };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateDateSource(e.target.value);
    };

    const handleHistorySelect = (date: string) => {
        updateDateSource(date);
    };

    return (
        <div className={cn("w-full max-w-4xl mx-auto space-y-8", className)}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md mx-auto"
            >
                <PremiumCard className="p-6 space-y-6">
                    <FloatingInput
                        label="Enter your birth date"
                        type="date"
                        value={dateString}
                        onChange={handleDateChange}
                        error={error || undefined}
                        className="w-full"
                    />

                    {/* Phase 190.4: Search History */}
                    {isLoaded && (
                        <HistoryChips
                            history={history}
                            onSelect={handleHistorySelect}
                        />
                    )}
                </PremiumCard>
            </motion.div>

            <AnimatePresence mode="wait">
                {/* Future Mode (Time Traveler) */}
                {dashboardMode === 'future' && (
                    <motion.div
                        key="future"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full"
                    >
                        <PremiumCard className="p-12 text-center space-y-6 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-600/5" />
                            <motion.div
                                initial={{ y: 20 }} animate={{ y: 0 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="flex justify-center"
                            >
                                <div className="p-4 rounded-full bg-primary/10 text-primary">
                                    <Rocket className="w-12 h-12" />
                                </div>
                            </motion.div>
                            <div className="space-y-2 relative z-10">
                                <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                                    Wah, kamu penjelajah waktu?
                                </h2>
                                <p className="text-muted-foreground font-medium">
                                    Time Traveler detected! 🚀
                                </p>
                            </div>
                        </PremiumCard>
                    </motion.div>
                )}

                {/* Newborn Mode (< 30 Days) */}
                {dashboardMode === 'newborn' && age && (
                    <motion.div
                        key="newborn"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <PremiumCard glowColor="rgba(236, 72, 153, 0.2)" className="p-8 relative overflow-visible">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="p-3 rounded-full bg-pink-100 text-pink-500 shadow-lg">
                                    <Baby className="w-8 h-8" />
                                </div>
                            </div>

                            <div className="text-center mb-8 mt-4">
                                <h2 className="text-3xl font-bold text-foreground">Welcome to the world! 👋</h2>
                                <p className="text-muted-foreground">Newborn Mode</p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                                <motion.div variants={itemVariants} className="flex justify-center">
                                    <CountUp
                                        value={Math.floor(age.totalDays / 7)}
                                        label="Weeks"
                                        className="text-6xl text-pink-500/80"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants} className="flex justify-center">
                                    <CountUp
                                        value={Math.floor(age.totalDays % 7)}
                                        label="Days"
                                        className="text-6xl text-pink-500/80"
                                    />
                                </motion.div>
                            </div>

                            {/* Detailed stats for newborn (optional, maybe seconds?) */}
                            <div className="mt-8 pt-8 border-t border-border/50 text-center">
                                <SecondsCounter birthDate={birthDate!} />
                            </div>
                        </PremiumCard>
                    </motion.div>
                )}

                {/* Standard Mode */}
                {dashboardMode === 'standard' && age && !error && (
                    <motion.div
                        key="results"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <PremiumCard glowColor="rgba(59, 130, 246, 0.2)" className="relative overflow-visible">
                            {/* CSS Grid Layout for Dashboard */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

                                {/* LEFT: Main Year Display - Largest */}
                                {/* Only show if years > 0 */}
                                {visibility.year && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border/50 pb-8 md:pb-0 md:pr-8"
                                    >
                                        <CountUp
                                            value={age.years}
                                            label={formatUnit(age.years, 'year', locale)}
                                            className="text-8xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50"
                                        />
                                    </motion.div>
                                )}

                                {/* MIDDLE: Month and Day Display */}
                                {/* Adjust grid span if Year is hidden */}
                                <div className={cn(
                                    "grid gap-4 border-b md:border-b-0 md:border-r border-border/50 pb-8 md:pb-0 md:pr-8",
                                    visibility.year ? "md:col-span-4 grid-cols-2" : "md:col-span-8 grid-cols-2 md:grid-cols-2"
                                )}>
                                    {visibility.month && (
                                        <motion.div variants={itemVariants} className="flex justify-center">
                                            <CountUp
                                                value={age.months}
                                                label={formatUnit(age.months, 'month', locale)}
                                                className="text-5xl md:text-6xl text-foreground/80"
                                            />
                                        </motion.div>
                                    )}

                                    <motion.div variants={itemVariants} className="flex justify-center">
                                        <CountUp
                                            value={age.days}
                                            label={formatUnit(age.days, 'day', locale)}
                                            className="text-5xl md:text-6xl text-foreground/80"
                                        />
                                    </motion.div>
                                </div>

                                {/* NEW: Smooth Seconds Counter */}
                                <div className="md:col-span-12 flex justify-center py-4 border-b border-border/50">
                                    <SecondsCounter birthDate={birthDate!} />
                                </div>

                                {/* RIGHT: Birthday Countdown */}
                                <motion.div
                                    variants={itemVariants}
                                    className="md:col-span-4 flex justify-center py-4"
                                >
                                    <BirthdayCountdown
                                        nextBirthday={age.nextBirthday}
                                        countdownMonths={age.countdownMonths}
                                        countdownDays={age.countdownDays}
                                        countdownHours={age.countdownHours}
                                    />
                                </motion.div>
                            </div>
                        </PremiumCard>
                    </motion.div>
                )}


                {/* Phase 191: Identity Section (Weton, Zodiac, Shio) */}
                {dashboardMode !== 'future' && birthDate && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <IdentitySection date={birthDate} className="mt-8" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
