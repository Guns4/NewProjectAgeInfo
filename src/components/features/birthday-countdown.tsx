"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BirthdayCountdownProps {
    nextBirthday: Date;
    countdownMonths: number;
    countdownDays: number;
    countdownHours: number;
    className?: string;
}

export function BirthdayCountdown({
    nextBirthday,
    countdownMonths,
    countdownDays,
    countdownHours,
    className,
}: BirthdayCountdownProps) {
    // Basic i18n placeholders - to be replaced with Next-Intl
    const t = (key: string) => {
        const map: Record<string, string> = {
            'next_birthday': 'Next Birthday',
            'months': 'Months',
            'days': 'Days',
            'hours': 'Hours',
            'left': 'left',
        };
        return map[key] || key;
    };

    // Calculate progress percentage
    // 0% = Birthday just passed (365 days away)
    // 100% = Birthday is today/tomorrow (0 days away)
    // Formula: 100 - (Percent of year remaining)

    // Total milliseconds in a year (approx)
    const msInYear = 365.25 * 24 * 60 * 60 * 1000;
    const today = new Date();
    const msDiff = nextBirthday.getTime() - today.getTime();

    // Ensure we don't get negative values or > 100
    const rawProgress = 100 - ((msDiff / msInYear) * 100);
    const progress = Math.max(0, Math.min(100, rawProgress));

    // Circle config
    const size = 180;
    const strokeWidth = 12;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    // Animation variants
    const circleVariants = {
        hidden: { strokeDashoffset: circumference },
        visible: {
            strokeDashoffset: circumference - (progress / 100) * circumference,
            transition: { duration: 1.5, ease: "easeOut" }
        }
    };

    return (
        <div className={cn("flex flex-col items-center justify-center space-y-6", className)}>
            <div className="relative flex items-center justify-center">
                {/* Background Circle */}
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        className="text-muted/20"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        className="text-primary drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                        strokeDasharray={circumference}
                        initial="hidden"
                        animate="visible"
                        variants={circleVariants}
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                        {t('next_birthday')}
                    </span>
                    <span className="text-lg font-bold">
                        {nextBirthday.toLocaleDateString("id-ID", {
                            day: 'numeric',
                            month: 'short'
                        })}
                    </span>
                    <span className="text-xs text-primary/80 font-medium mt-1">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>

            {/* Countdown Grid */}
            <div className="grid grid-cols-3 gap-4 w-full text-center">
                <TimeBox value={countdownMonths} label={t('months')} />
                <TimeBox value={countdownDays} label={t('days')} />
                <TimeBox value={countdownHours} label={t('hours')} />
            </div>

            <p className="text-sm text-center text-muted-foreground animate-pulse">
                {t('left')}
            </p>
        </div>
    );
}

function TimeBox({ value, label }: { value: number, label: string }) {
    return (
        <div className="flex flex-col items-center p-3 bg-card/50 rounded-xl border border-border/50 backdrop-blur-sm">
            <span className="text-2xl font-bold tabular-nums">
                {value}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {label}
            </span>
        </div>
    );
}
