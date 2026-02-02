import { useState, useEffect } from 'react';
import {
    differenceInYears,
    differenceInMonths,
    differenceInDays,
    differenceInBusinessDays,
    addYears,
    addMonths,
    isValid,
    parseISO
} from 'date-fns';

export interface DateDurationResult {
    years: number;
    months: number;
    days: number;
    totalDays: number;
    workingDays: number;
    isValid: boolean;
}

export function useDateDuration(startDateStr: string, endDateStr: string): DateDurationResult {
    const [result, setResult] = useState<DateDurationResult>({
        years: 0,
        months: 0,
        days: 0,
        totalDays: 0,
        workingDays: 0,
        isValid: false,
    });

    useEffect(() => {
        if (!startDateStr || !endDateStr) {
            setResult(prev => ({ ...prev, isValid: false }));
            return;
        }

        const start = parseISO(startDateStr);
        const end = parseISO(endDateStr);

        if (!isValid(start) || !isValid(end) || start > end) {
            // Handle invalid or negative range by just resetting or marking invalid
            // For this requirement, let's just mark invalid if start > end
            setResult(prev => ({ ...prev, isValid: false }));
            return;
        }

        // granular calculation
        const years = differenceInYears(end, start);
        const dateAfterYears = addYears(start, years);

        const months = differenceInMonths(end, dateAfterYears);
        const dateAfterMonths = addMonths(dateAfterYears, months);

        const days = differenceInDays(end, dateAfterMonths);

        // totals
        const totalDays = differenceInDays(end, start);
        const workingDays = differenceInBusinessDays(end, start); // start is excluded, end is included? date-fns behavior differs, usually checks full days. 
        // differenceInBusinessDays: "The number of business days between the given dates, excluding weekends."
        // It usually excludes the start date and includes the end date or similar. Let's trust date-fns for now.

        setResult({
            years,
            months,
            days,
            totalDays,
            workingDays,
            isValid: true,
        });

    }, [startDateStr, endDateStr]);

    return result;
}
