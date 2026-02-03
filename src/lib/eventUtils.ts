import { HOLIDAYS, Holiday } from '@/data/holidays';
import { isAfter, parseISO, startOfDay, differenceInDays } from 'date-fns';

export interface UpcomingEvent extends Holiday {
    daysUntil: number;
}

export function getUpcomingHolidays(limit: number = 3): UpcomingEvent[] {
    const today = startOfDay(new Date());

    // Filter holidays that are in the future or today
    const upcoming = HOLIDAYS
        .map(h => ({
            ...h,
            parsedDate: parseISO(h.date)
        }))
        .filter(h => isAfter(h.parsedDate, today) || h.parsedDate.getTime() === today.getTime())
        .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime())
        .slice(0, limit)
        .map(h => ({
            date: h.date,
            name: h.name,
            isNational: h.isNational,
            daysUntil: differenceInDays(h.parsedDate, today)
        }));

    return upcoming;
}
