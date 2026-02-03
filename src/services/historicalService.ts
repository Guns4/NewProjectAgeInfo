/**
 * Historical Data Service - Fase 351-380
 * Fetches historical events for a given birth year
 */

import historicalData from '@/data/historicalData.json';

export interface HistoricalEvent {
    title: string;
    date?: string;
    description: string;
    category?: 'world' | 'popCulture' | 'technology' | 'film' | 'music';
}

export interface TimeCapsule {
    year: number;
    worldEvents: HistoricalEvent[];
    popCulture: HistoricalEvent[];
    technology: HistoricalEvent[];
    hasData: boolean;
}

/**
 * Get historical events for a specific year
 * @param year - Birth year
 * @returns TimeCapsule with historical events
 */
export async function getTimeCapsule(year: number): Promise<TimeCapsule> {
    // Check if we have curated data for this year
    const yearKey = year.toString();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (historicalData as Record<string, any>)[yearKey];

    if (data) {
        return {
            year,
            worldEvents: data.worldEvents || [],
            popCulture: data.popCulture || [],
            technology: data.technology || [],
            hasData: true,
        };
    }

    // No data available for this year
    // In the future, this could fallback to an API
    return {
        year,
        worldEvents: [],
        popCulture: [],
        technology: [],
        hasData: false,
    };
}

/**
 * Check if we have historical data for a given year
 */
export function hasHistoricalData(year: number): boolean {
    const yearKey = year.toString();
    return yearKey in historicalData;
}

/**
 * Get available years in the database
 */
export function getAvailableYears(): number[] {
    return Object.keys(historicalData)
        .map((y) => parseInt(y))
        .sort((a, b) => b - a);
}
