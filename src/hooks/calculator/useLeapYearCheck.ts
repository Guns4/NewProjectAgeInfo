/**
 * Leap Year Utilities - Phase 101
 * Accurate leap year detection and calculations
 * 
 * Rules:
 * - Divisible by 400: LEAP (2000, 2400)
 * - Divisible by 100: NOT LEAP (1900, 2100)
 * - Divisible by 4: LEAP (2024, 2028)
 * - Otherwise: NOT LEAP
 */

'use client';

/**
 * Check if a year is a leap year
 * @param year - Year to check
 * @returns true if leap year, false otherwise
 */
export function isLeapYear(year: number): boolean {
    // Rule 1: Divisible by 400 → LEAP YEAR
    if (year % 400 === 0) return true;

    // Rule 2: Divisible by 100 → NOT LEAP YEAR
    if (year % 100 === 0) return false;

    // Rule 3: Divisible by 4 → LEAP YEAR
    if (year % 4 === 0) return true;

    // Default: NOT LEAP YEAR
    return false;
}

/**
 * Get days in a specific month
 * @param year - Year
 * @param month - Month (0-11, JavaScript convention)
 * @returns Number of days in the month
 */
export function getDaysInMonth(year: number, month: number): number {
    // Use JavaScript Date API for accuracy
    return new Date(year, month + 1, 0).getDate();
}

/**
 * Count leap years between two dates
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of leap years in the range
 */
export function countLeapYearsBetween(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    let count = 0;
    for (let year = startYear; year <= endYear; year++) {
        if (isLeapYear(year)) {
            count++;
        }
    }

    return count;
}

/**
 * Get leap days between two dates
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of Feb 29th days between dates
 */
export function getLeapDaysBetween(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();

    let leapDays = 0;

    for (let year = startYear; year <= endYear; year++) {
        if (isLeapYear(year)) {
            const feb29 = new Date(year, 1, 29); // Feb 29

            // Only count if Feb 29 is within the range
            if (feb29 >= startDate && feb29 <= endDate) {
                leapDays++;
            }
        }
    }

    return leapDays;
}

/**
 * Check if a date is February 29th
 * @param date - Date to check
 * @returns true if Feb 29th, false otherwise
 */
export function isLeapDayBirthday(date: Date): boolean {
    return date.getMonth() === 1 && date.getDate() === 29;
}

/**
 * Get next occurrence of a leap day birthday
 * For leap day babies, returns next Feb 29 or Feb 28 in non-leap years
 * @param birthDate - Birth date (must be Feb 29)
 * @param fromDate - Date to calculate from (default: now)
 * @returns Next birthday date
 */
export function getNextLeapDayBirthday(birthDate: Date, fromDate: Date = new Date()): Date {
    if (!isLeapDayBirthday(birthDate)) {
        throw new Error('Birth date must be February 29th');
    }

    const currentYear = fromDate.getFullYear();

    // Try current year first
    let nextBirthday = new Date(currentYear, 1, 29);

    // If Feb 29 doesn't exist this year, use Feb 28
    if (!isLeapYear(currentYear)) {
        nextBirthday = new Date(currentYear, 1, 28);
    }

    // If already passed, try next year
    if (nextBirthday < fromDate) {
        const nextYear = currentYear + 1;

        if (isLeapYear(nextYear)) {
            nextBirthday = new Date(nextYear, 1, 29);
        } else {
            nextBirthday = new Date(nextYear, 1, 28);
        }
    }

    return nextBirthday;
}

/**
 * React hook for leap year utilities
 */
export function useLeapYearCheck(date: Date) {
    const year = date.getFullYear();

    return {
        isLeapYear: isLeapYear(year),
        isLeapDayBirthday: isLeapDayBirthday(date),
        daysInFebruary: getDaysInMonth(year, 1), // February
        getNextLeapYear: () => {
            let nextYear = year + 1;
            while (!isLeapYear(nextYear) && nextYear < year + 100) {
                nextYear++;
            }
            return nextYear;
        },
    };
}
