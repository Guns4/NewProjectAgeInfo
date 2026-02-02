import { useState, useEffect } from 'react';
import {
    differenceInYears,
    differenceInMonths,
    differenceInDays,
    addYears,
    addMonths,
    isValid,
    parseISO
} from 'date-fns';
import { calculateWorkingDays, type WorkingDaysResult } from '@/lib/productivityLogic';

export interface DateDurationResult extends WorkingDaysResult {
    years: number;
    months: number;
    days: number;
    // Overriding/Creating union with WorkingDaysResult
    isValid: boolean;
}

export function useDateDuration(startDateStr: string, endDateStr: string): DateDurationResult {
    const [result, setResult] = useState<DateDurationResult>({
        years: 0,
        months: 0,
        days: 0,
        totalDays: 0,
        workingDays: 0,
        holidaysCount: 0,
        weekendsCount: 0,
        holidayDetails: [],
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
            setResult(prev => ({ ...prev, isValid: false }));
            return;
        }

        // Granular Duration (Years, Months, Days)
        const years = differenceInYears(end, start);
        const dateAfterYears = addYears(start, years);
        const months = differenceInMonths(end, dateAfterYears);
        const dateAfterMonths = addMonths(dateAfterYears, months);
        const days = differenceInDays(end, dateAfterMonths);

        // Working Days & Holidays Logic
        const productivityStats = calculateWorkingDays(start, end);

        setResult({
            years,
            months,
            days,
            ...productivityStats,
            isValid: true,
        });

    }, [startDateStr, endDateStr]);

    return result;
}
