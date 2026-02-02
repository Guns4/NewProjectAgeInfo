/**
 * Detailed Age Calculator - Phase 101
 * Comprehensive age breakdown with all time units
 */

'use client';

import { useState, useEffect } from 'react';
import { calculateAge, type AgeResult } from './useAgeCalculator';

export interface DetailedAgeResult extends AgeResult {
    // Additional breakdowns
    weeks: number;
    totalWeeks: number;
    totalMonths: number;
    totalMilliseconds: number;

    // Life statistics (based on 80 years average)
    lifePercentage: number;
    lifePercentageExact: number;
    daysRemaining: number; // assuming 80 years
    yearsRemaining: number;

    // Formatted strings
    formatted: {
        short: string;       // "25 years, 3 months"
        medium: string;      // "25 years, 3 months, 15 days"
        long: string;        // "25 years, 3 months, 15 days, 8 hours"
        exact: string;       // Full breakdown with seconds
        humanReadable: string; // Natural language
    };

    // Milestones
    milestones: {
        passed: string[];
        upcoming: string[];
    };
}

const AVERAGE_LIFE_EXPECTANCY = 80; // years
const DAYS_PER_YEAR = 365.25; // accounting for leap years

/**
 * Calculate detailed age with comprehensive breakdown
 */
export function calculateDetailedAge(birthDate: Date, currentDate: Date = new Date()): DetailedAgeResult {
    const basicAge = calculateAge(birthDate, currentDate);

    const timeDiff = currentDate.getTime() - birthDate.getTime();

    // Calculate all units
    const totalMilliseconds = timeDiff;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = basicAge.years * 12 + basicAge.months;

    const weeks = Math.floor((totalDays % 365) / 7);

    // Life statistics
    const totalLifeDays = AVERAGE_LIFE_EXPECTANCY * DAYS_PER_YEAR;
    const lifePercentageExact = (totalDays / totalLifeDays) * 100;
    const lifePercentage = Math.min(parseFloat(lifePercentageExact.toFixed(2)), 100);
    const daysRemaining = Math.max(0, Math.floor(totalLifeDays - totalDays));
    const yearsRemaining = Math.max(0, AVERAGE_LIFE_EXPECTANCY - basicAge.years);

    // Formatted strings
    const formatted = {
        short: `${basicAge.years} years, ${basicAge.months} months`,
        medium: `${basicAge.years} years, ${basicAge.months} months, ${basicAge.days} days`,
        long: `${basicAge.years} years, ${basicAge.months} months, ${basicAge.days} days, ${basicAge.hours} hours`,
        exact: `${basicAge.years} years, ${basicAge.months} months, ${basicAge.days} days, ${basicAge.hours} hours, ${basicAge.minutes} minutes, ${basicAge.seconds} seconds`,
        humanReadable: formatHumanReadable(basicAge),
    };

    // Milestones
    const milestones = calculateMilestones(basicAge.years, totalDays);

    return {
        ...basicAge,
        weeks,
        totalWeeks,
        totalMonths,
        totalMilliseconds,
        lifePercentage,
        lifePercentageExact,
        daysRemaining,
        yearsRemaining,
        formatted,
        milestones,
    };
}

/**
 * Format age in human-readable format
 */
function formatHumanReadable(age: AgeResult): string {
    const parts: string[] = [];

    if (age.years > 0) {
        parts.push(`${age.years} ${age.years === 1 ? 'year' : 'years'}`);
    }

    if (age.months > 0) {
        parts.push(`${age.months} ${age.months === 1 ? 'month' : 'months'}`);
    }

    if (age.days > 0 && parts.length < 2) {
        parts.push(`${age.days} ${age.days === 1 ? 'day' : 'days'}`);
    }

    if (parts.length === 0) {
        return 'Less than a day old';
    }

    if (parts.length === 1) {
        return parts[0];
    }

    return parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1];
}

/**
 * Calculate age milestones
 */
function calculateMilestones(years: number, totalDays: number) {
    const milestones = {
        1: 'First Birthday',
        5: '5th Birthday',
        10: '10th Birthday',
        13: 'Teenager',
        16: '16th Birthday',
        18: 'Legal Adult',
        21: '21st Birthday',
        25: 'Quarter Century',
        30: '30th Birthday',
        40: '40th Birthday',
        50: 'Half Century',
        60: '60th Birthday',
        65: 'Retirement Age',
        70: '70th Birthday',
        75: '75th Birthday',
        80: '80th Birthday',
        90: '90th Birthday',
        100: 'Centennial',
    };

    const dayMilestones = {
        100: '100 Days',
        365: '365 Days (1 Year)',
        1000: '1000 Days',
        5000: '5000 Days',
        10000: '10,000 Days',
        20000: '20,000 Days',
        25000: '25,000 Days',
        30000: '30,000 Days',
    };

    const passed: string[] = [];
    const upcoming: string[] = [];

    // Year-based milestones
    Object.entries(milestones).forEach(([year, name]) => {
        const yearNum = parseInt(year);
        if (years >= yearNum) {
            passed.push(name);
        } else if (yearNum - years <= 5) {
            upcoming.push(name);
        }
    });

    // Day-based milestones
    Object.entries(dayMilestones).forEach(([days, name]) => {
        const daysNum = parseInt(days);
        if (totalDays >= daysNum) {
            if (!passed.includes(name)) passed.push(name);
        } else if (daysNum - totalDays <= 365) {
            if (!upcoming.includes(name)) upcoming.push(name);
        }
    });

    return {
        passed: passed.slice(-5), // Last 5 milestones
        upcoming: upcoming.slice(0, 3), // Next 3 milestones
    };
}

/**
 * React hook for detailed age calculation
 */
export function useDetailedAge(birthDate: Date | null) {
    const [detailedAge, setDetailedAge] = useState<DetailedAgeResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!birthDate) {
            setDetailedAge(null);
            setError(null);
            return;
        }

        try {
            const calculated = calculateDetailedAge(birthDate);
            setDetailedAge(calculated);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Calculation error');
            setDetailedAge(null);
        }
    }, [birthDate]);

    return { detailedAge, error, calculate: calculateDetailedAge };
}
