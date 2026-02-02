/**
 * Age Calculator Hook - Fase 101-120
 * Uses date-fns for 100% accurate age calculations
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    differenceInYears,
    differenceInMonths,
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    differenceInWeeks,
    addYears,
    isValid,
} from 'date-fns';
import { isLeapYear, isLeapDayBirthday } from './useLeapYearCheck';

/**
 * Age Result Interface
 * Complete breakdown of age with all time units
 */
// Age Result Interface
export interface AgeResult {
    // Precise age breakdown
    years: number;
    months: number;
    days: number;

    // Total conversions
    totalMonths: number;
    totalWeeks: number;
    totalDays: number;
    totalHours: number;
    totalMinutes: number;
    totalSeconds: number;

    // Additional info
    nextBirthday: Date;
    nextAge: number;
    isLeapYearBirth: boolean;
    isLeapDayBirth: boolean;

    // Countdown
    countdownMonths: number;
    countdownDays: number;
    countdownHours: number;
}

/**
 * Calculate precise age using date-fns
 * @param birthDate - Birth date
 * @param currentDate - Current date (default: now)
 * @returns Detailed age breakdown
 * @throws Error if birthDate is invalid or in the future
 */
export function calculateAge(birthDate: Date, currentDate: Date = new Date()): AgeResult {
    // Validation 1: Check if birth date is a valid Date object
    if (!isValid(birthDate)) {
        throw new Error('Tanggal lahir tidak valid. Mohon masukkan tanggal yang benar.');
    }

    // Validation 2: Check if current date is valid
    if (!isValid(currentDate)) {
        throw new Error('Tanggal saat ini tidak valid.');
    }

    // Validation 3: Check if birth date is in the future
    if (birthDate.getTime() > currentDate.getTime()) {
        throw new Error('Tanggal lahir tidak boleh di masa depan.');
    }

    // Validation 4: Check if birth date is too old (before 1900)
    if (birthDate.getFullYear() < 1900) {
        throw new Error(`Tanggal lahir harus setelah tahun 1900. Anda memasukkan tahun ${birthDate.getFullYear()}.`);
    }

    // Validation 5: Maximum age limit (150 years)
    const today = new Date();
    const maxAge = 150;
    const minBirthYear = today.getFullYear() - maxAge;
    if (birthDate.getFullYear() < minBirthYear) {
        throw new Error(`Tanggal lahir terlalu lama. Harus setelah tahun ${minBirthYear}.`);
    }

    // Calculate precise age using date-fns
    const years = differenceInYears(currentDate, birthDate);

    // Calculate months (total months between dates)
    const totalMonths = differenceInMonths(currentDate, birthDate);

    // Calculate remaining months after accounting for full years
    const months = totalMonths - (years * 12);

    // Calculate total days
    const totalDays = differenceInDays(currentDate, birthDate);

    // Calculate remaining days after accounting for years and months
    // Create a date that is birthDate + years + months
    const birthDatePlusYearsMonths = new Date(birthDate);
    birthDatePlusYearsMonths.setFullYear(birthDate.getFullYear() + years);
    birthDatePlusYearsMonths.setMonth(birthDate.getMonth() + months);

    const days = differenceInDays(currentDate, birthDatePlusYearsMonths);

    // Calculate all total conversions using date-fns
    const totalWeeks = differenceInWeeks(currentDate, birthDate);
    const totalHours = differenceInHours(currentDate, birthDate);
    const totalMinutes = differenceInMinutes(currentDate, birthDate);
    const totalSeconds = differenceInSeconds(currentDate, birthDate);

    // Calculate next birthday
    let nextBirthday = new Date(
        currentDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    // Handle leap day birthdays: if born Feb 29, and current year is NOT leap year, use Mar 1
    if (isLeapDayBirthday(birthDate) && !isLeapYear(currentDate.getFullYear())) {
        nextBirthday = new Date(currentDate.getFullYear(), 2, 1); // Mar 1 (Month is 0-indexed)
    }

    // If birthday already passed this year, move to next year
    if (nextBirthday.getTime() <= currentDate.getTime()) {
        nextBirthday = addYears(nextBirthday, 1);

        // Check leap day rule again for next year
        if (isLeapDayBirthday(birthDate) && !isLeapYear(nextBirthday.getFullYear())) {
            nextBirthday = new Date(nextBirthday.getFullYear(), 2, 1); // Mar 1
        }
    }

    // Countdown Calculation
    const countdownMonths = differenceInMonths(nextBirthday, currentDate);

    // Create intermediate date for day calc
    const currentDatePlusMonths = new Date(currentDate);
    currentDatePlusMonths.setMonth(currentDate.getMonth() + countdownMonths);
    const countdownDays = differenceInDays(nextBirthday, currentDatePlusMonths);

    // Hour calc (approx)
    const countdownHours = differenceInHours(nextBirthday, currentDate) % 24;

    return {
        // Precise age
        years,
        months,
        days,

        // Total conversions
        totalMonths,
        totalWeeks,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,

        // Additional info
        nextBirthday,
        nextAge: years + 1,
        isLeapYearBirth: isLeapYear(birthDate.getFullYear()),
        isLeapDayBirth: isLeapDayBirthday(birthDate),

        // Countdown
        countdownMonths,
        countdownDays,
        countdownHours,
    };
}

/**
 * React hook for age calculation with date-fns
 * @param birthDate - Birth date (can be null)
 * @returns Age result or null with error state
 */
export function useAgeCalculator(birthDate: Date | null) {
    const [age, setAge] = useState<AgeResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    // Phase 121-140: Real-time ticker state REMOVED for Phase 190.2 Optimization
    // The hook now calculates age statically. Dynamic updates should be handled by specific components.

    // Phase 121-140: Performance - memoize age calculation
    // Only recalculate when birthDate changes
    const calculatedAge = useMemo(() => {
        // Reset if no birth date
        if (!birthDate) {
            return null;
        }

        try {
            // We use new Date() here. Since this runs in useMemo, it will run on render.
            // To be hydration safe, we might need to be careful.
            // But usually this hook is used in Client Components that might already be hydration-safe or don't render immediately.
            // For safety, let's just calculate based on current time.
            return calculateAge(birthDate, new Date());
        } catch (err) {
            console.error('Age calculation error:', err);
            return null;
        }
    }, [birthDate]);

    // Update state when memoized calculation changes
    useEffect(() => {
        if (!birthDate) {
            setAge(null);
            setError(null);
            setIsCalculating(false);
            return;
        }

        setIsCalculating(true);

        if (calculatedAge) {
            setAge(calculatedAge);
            setError(null);
        } else {
            // Fallback or initial client-side calc if needed
            try {
                const testCalc = calculateAge(birthDate, new Date());
                setAge(testCalc);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Calculation error');
                setAge(null);
            }
        }

        setIsCalculating(false);
    }, [birthDate, calculatedAge]);

    return {
        age,
        error,
        isCalculating,
        calculate: calculateAge, // Expose function for manual calculation
    };
}

/**
 * Validate birth date with comprehensive checks
 * @param birthDate - Date to validate
 * @returns Validation result with specific error message
 */
export function validateBirthDate(birthDate: Date): {
    isValid: boolean;
    error: string | null;
} {
    // Check 1: Valid Date object
    if (!birthDate || !(birthDate instanceof Date)) {
        return {
            isValid: false,
            error: 'Mohon masukkan tanggal yang valid.',
        };
    }

    // Check 2: Valid date value (not NaN)
    if (!isValid(birthDate) || isNaN(birthDate.getTime())) {
        return {
            isValid: false,
            error: 'Format tanggal tidak valid. Contoh: 15 Mei 1990',
        };
    }

    // Check 3: Not in the future
    const now = new Date();
    if (birthDate.getTime() > now.getTime()) {
        const userDate = birthDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        return {
            isValid: false,
            error: `Tanggal lahir (${userDate}) tidak boleh di masa depan.`,
        };
    }

    // Check 4: Not too old (before year 1900)
    if (birthDate.getFullYear() < 1900) {
        return {
            isValid: false,
            error: `Tahun ${birthDate.getFullYear()} terlalu lama. Mohon masukkan tahun setelah 1900.`,
        };
    };

    // Check 5: Reasonable date range (not more than 150 years old)
    const maxAge = 150;
    const minBirthYear = now.getFullYear() - maxAge;
    if (birthDate.getFullYear() < minBirthYear) {
        return {
            isValid: false,
            error: `Tanggal lahir terlalu lama. Harus setelah tahun ${minBirthYear}.`,
        };
    }

    // All checks passed
    return {
        isValid: true,
        error: null,
    };
}
