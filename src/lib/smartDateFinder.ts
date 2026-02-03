/**
 * Smart Date Finder Logic
 * Finds future dates that match specific Day + Pasaran combinations.
 * Uses the 35-day Selapan cycle for efficient calculation.
 */

import { calculateWeton, Pasaran } from './identity-engine';

export interface DateCriteria {
    dayName: string; // 'Senin', 'Selasa', etc.
    pasaran: Pasaran;
}

export function findSpecialDates(
    startDate: Date,
    criteria: DateCriteria,
    count: number = 5
): Date[] {
    const results: Date[] = [];
    let current = new Date(startDate);

    // Normalize time to start of day
    current.setHours(0, 0, 0, 0);

    // Limit search to avoid infinite loops if bad input (though Day/Pasaran always meet every 35 days)
    // Search max 40 days to find the first match
    let foundFirst = false;
    let attempts = 0;

    // 1. Find the first match
    while (!foundFirst && attempts < 40) {
        const weton = calculateWeton(current);

        if (weton.day === criteria.dayName && weton.pasaran === criteria.pasaran) {
            foundFirst = true;
            results.push(new Date(current));
        } else {
            // Next day
            current.setDate(current.getDate() + 1);
            attempts++;
        }
    }

    if (!foundFirst) return []; // Should mathematically not happen for valid inputs

    // 2. Generate subsequent matches by adding 35 days (Selapan)
    // We already have 1 result. 
    while (results.length < count) {
        // Get last found date
        const lastDate = results[results.length - 1];
        if (!lastDate) break; // Safety check
        const nextDate = new Date(lastDate);
        nextDate.setDate(nextDate.getDate() + 35);
        results.push(nextDate);
    }

    return results;
}

// Data for dropdowns
export const DAYS_OF_WEEK = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
export const PASARAN_TYPES: Pasaran[] = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
