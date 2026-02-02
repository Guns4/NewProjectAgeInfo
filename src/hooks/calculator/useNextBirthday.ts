/**
 * Next Birthday Calculator - Phase 102
 * Calculate countdown to next birthday
 */

'use client';

import { useState, useEffect } from 'react';
import { isLeapDayBirthday, isLeapYear, getNextLeapDayBirthday } from './useLeapYearCheck';

export interface NextBirthdayResult {
    nextBirthday: Date;
    nextAge: number;
    daysUntil: number;
    hoursUntil: number;
    minutesUntil: number;
    secondsUntil: number;
    dayOfWeek: string;
    isBirthdayToday: boolean;
    isBirthdayThisWeek: boolean;
    isBirthdayThisMonth: boolean;
    isLeapDayBirthday: boolean;

    formatted: {
        countdown: string;        // "15 days"
        countdownDetailed: string; // "15 days, 8 hours, 32 minutes"
        date: string;             // "March 15, 2024"
    };
}

/**
 * Calculate next birthday
 */
export function calculateNextBirthday(
    birthDate: Date,
    currentDate: Date = new Date()
): NextBirthdayResult {
    const currentYear = currentDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    // Handle leap day birthdays
    let nextBirthday: Date;
    if (isLeapDayBirthday(birthDate)) {
        nextBirthday = getNextLeapDayBirthday(birthDate, currentDate);
    } else {
        // Normal birthday
        nextBirthday = new Date(currentYear, birthMonth, birthDay);

        // If birthday already passed this year, use next year
        if (nextBirthday < currentDate) {
            nextBirthday = new Date(currentYear + 1, birthMonth, birthDay);
        }
    }

    // Calculate next age
    const nextAge = nextBirthday.getFullYear() - birthDate.getFullYear();

    // Calculate time until
    const timeDiff = nextBirthday.getTime() - currentDate.getTime();
    const secondsUntil = Math.floor(timeDiff / 1000);
    const minutesUntil = Math.floor(secondsUntil / 60);
    const hoursUntil = Math.floor(minutesUntil / 60);
    const daysUntil = Math.floor(hoursUntil / 24);

    // Day of week
    const dayOfWeek = nextBirthday.toLocaleDateString('en-US', { weekday: 'long' });

    // Checks
    const isBirthdayToday = daysUntil === 0;
    const isBirthdayThisWeek = daysUntil <= 7;
    const isBirthdayThisMonth = daysUntil <= 30;

    // Formatted strings
    const formatted = {
        countdown: formatCountdown(daysUntil, hoursUntil, minutesUntil),
        countdownDetailed: formatCountdownDetailed(daysUntil, hoursUntil % 24, minutesUntil % 60, secondsUntil % 60),
        date: nextBirthday.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
    };

    return {
        nextBirthday,
        nextAge,
        daysUntil,
        hoursUntil,
        minutesUntil,
        secondsUntil,
        dayOfWeek,
        isBirthdayToday,
        isBirthdayThisWeek,
        isBirthdayThisMonth,
        isLeapDayBirthday: isLeapDayBirthday(birthDate),
        formatted,
    };
}

/**
 * Format countdown (simple)
 */
function formatCountdown(days: number, hours: number, minutes: number): string {
    if (days === 0) {
        if (hours === 0) {
            return `${minutes} minutes`;
        }
        return `${hours} hours`;
    }
    return `${days} ${days === 1 ? 'day' : 'days'}`;
}

/**
 * Format countdown (detailed)
 */
function formatCountdownDetailed(days: number, hours: number, minutes: number, seconds: number): string {
    const parts: string[] = [];

    if (days > 0) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
    if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    if (seconds > 0 && days === 0 && hours === 0) {
        parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
    }

    if (parts.length === 0) return 'Now!';
    if (parts.length === 1) return parts[0];

    return parts.join(', ');
}

/**
 * React hook for next birthday
 */
export function useNextBirthday(birthDate: Date | null) {
    const [nextBirthday, setNextBirthday] = useState<NextBirthdayResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!birthDate) {
            setNextBirthday(null);
            setError(null);
            return;
        }

        try {
            const result = calculateNextBirthday(birthDate);
            setNextBirthday(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Calculation error');
            setNextBirthday(null);
        }
    }, [birthDate]);

    return { nextBirthday, error, calculate: calculateNextBirthday };
}

/**
 * Real-time next birthday countdown
 */
export function useNextBirthdayCountdown(birthDate: Date | null) {
    const [countdown, setCountdown] = useState<NextBirthdayResult | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !birthDate) return;

        const update = () => {
            try {
                setCountdown(calculateNextBirthday(birthDate));
            } catch (err) {
                console.error('Countdown calculation error:', err);
            }
        };

        update();
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, [birthDate, isClient]);

    return { countdown, isClient };
}
