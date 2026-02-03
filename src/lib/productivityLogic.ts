import { differenceInBusinessDays, isSaturday, isSunday, parseISO, addYears, differenceInDays, differenceInYears } from "date-fns";
import { HOLIDAYS } from "@/data/holidays";

export interface WorkingDaysResult {
    totalDays: number;
    workingDays: number;
    holidaysCount: number;
    weekendsCount: number;
    holidayDetails: { date: string; name: string }[];
}

export interface RetirementResult {
    retirementDate: Date;
    remainingTotalDays: number;
    remainingWorkingDays: number;
    completedPercentage: number;
    age: number;
    retirementAge: number;
}

/**
 * Calculate working days between two dates, excluding weekends AND holidays.
 */
export function calculateWorkingDays(startDate: Date, endDate: Date): WorkingDaysResult {
    if (startDate > endDate) {
        return { totalDays: 0, workingDays: 0, holidaysCount: 0, weekendsCount: 0, holidayDetails: [] };
    }

    const totalDays = differenceInDays(endDate, startDate);

    // 1. Basic business days (Mon-Fri)
    let workingDays = differenceInBusinessDays(endDate, startDate);

    // 2. Filter holidays that fall on weekdays (Mon-Fri) within the range
    const relevantHolidays = HOLIDAYS.filter(h => {
        const hDate = parseISO(h.date);
        const inRange = hDate >= startDate && hDate < endDate;

        if (!inRange) return false;

        // Check if it's a weekend
        if (isSaturday(hDate) || isSunday(hDate)) {
            return false; // Already excluded by differenceInBusinessDays
        }
        return true;
    });

    workingDays -= relevantHolidays.length;

    // Approximate weekends count
    const weekendsCount = totalDays - workingDays - relevantHolidays.length;

    return {
        totalDays,
        workingDays: Math.max(0, workingDays),
        holidaysCount: relevantHolidays.length,
        weekendsCount: Math.max(0, weekendsCount),
        holidayDetails: relevantHolidays.map(h => ({ date: h.date, name: h.name })),
    };
}

/**
 * Calculate estimated holidays lived since birth.
 * Approximation: 15 holidays per year on average (typical for Indonesia/Global).
 */
export function calculateHolidaysLived(birthDate: Date): number {
    const ageInYears = differenceInYears(new Date(), birthDate);
    // Estimated 15 national holidays per year
    // This is a "fun stat" estimation since we don't have historical holiday data for 50 years back.
    return ageInYears * 15;
}

/**
 * Calculate retirement metrics
 */
export function calculateRetirement(birthDate: Date, retirementAge: number): RetirementResult {
    const retirementDate = addYears(birthDate, retirementAge);
    const now = new Date();

    const stats = calculateWorkingDays(now, retirementDate);

    // Percentage of Life Progress towards Retirement Age
    const totalCareerDuration = differenceInDays(retirementDate, birthDate);
    const elapsed = differenceInDays(now, birthDate);

    let completedPercentage = (elapsed / totalCareerDuration) * 100;
    completedPercentage = Math.min(100, Math.max(0, completedPercentage));

    return {
        retirementDate,
        remainingTotalDays: stats.totalDays,
        remainingWorkingDays: stats.workingDays,
        completedPercentage,
        age: differenceInYears(now, birthDate),
        retirementAge
    };
}
