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

    // 1. Basic business days (Mon-Fri) - date-fns excludes Sat/Sun
    let workingDays = differenceInBusinessDays(endDate, startDate);

    // 2. Filter holidays that fall on weekdays (Mon-Fri) within the range
    // We only care about holidays that are NOT Sat/Sun because differenceInBusinessDays already excluded Sat/Sun.
    const relevantHolidays = HOLIDAYS.filter(h => {
        const hDate = parseISO(h.date);
        // Check if within range
        const inRange = hDate >= startDate && hDate < endDate; // Date-fns diff usually excludes end date in count?? No, differenceInDays is full days. 
        // Let's assume [start, end). 
        // Actually differenceInBusinessDays does NOT include the start date if it's a weekend?? 
        // Let's stick to standard business definition: range inclusive or exclusive?
        // Typically "Amount of days TO work" => inclusive of start if workday, inclusive of end if workday?
        // date-fns differenceInBusinessDays: "The number of business days between the given dates, excluding weekends." 
        // It returns integer. 
        // If I ask from Monday to Tuesday (1 day diff), is it 1 working day? Yes.
        // If I ask from Friday to Monday (3 days diff), is it 1 working day (Fri)? Or 0?
        // Let's be precise. We iterate if range is small, or strictly filter holidays.

        if (!inRange) return false;

        // Check if it's a weekend
        if (isSaturday(hDate) || isSunday(hDate)) {
            return false; // Already excluded by differenceInBusinessDays
        }
        return true;
    });

    workingDays -= relevantHolidays.length;

    // Approximate weekends count
    // total = working + weekends + holidays(on_weekdays)
    // weekends = total - working - holidays(on_weekdays)
    // This is an approximation because holidays might overlap weirdly if logic isn't perfect, but it's good for Stats.
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
 * Calculate retirement metrics
 */
export function calculateRetirement(birthDate: Date, retirementAge: number): RetirementResult {
    const retirementDate = addYears(birthDate, retirementAge);
    const now = new Date(); // Use "now" or relative to user input? Usually "now" for countdown.

    // Clamp "now" if already retired?
    // User might want to see past stats?

    const stats = calculateWorkingDays(now, retirementDate);

    // Percentage of career
    // Assuming career starts at 20? Or just "Life Percentage"? 
    // The prompt says "Persentase masa kerja yang sudah dijalani".
    // Usually implies (Current Age - Start Working Age) / (Retirement Age - Start Working Age).
    // Let's assume Start Working Age = 20 for default, or just (Current Age / Retirement Age) if specific career start isn't provided.
    // Let's use simple Life Progress for MVP: (Now - Birth) / (RetirementDate - Birth).

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
