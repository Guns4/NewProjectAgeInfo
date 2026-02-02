/**
 * Biological Statistics Module - Fase 326-350
 * Science-based estimates of biological accumulation since birth
 */

export interface BiologicalStats {
    heartbeats: number;
    breaths: number;
    sleepHours: number;
    sleepDays: number;
    sleepYears: number;
    dreams: number;
}

/**
 * Calculate biological statistics based on total days alive
 * 
 * @param totalDays - Total days lived
 * @param totalHours - Total hours lived
 * @returns Biological statistics
 */
export function calculateBiologicalStats(
    totalDays: number,
    totalHours: number
): BiologicalStats {
    // Scientific estimates:
    // - Average resting heart rate: ~70 bpm → ~100,000 beats/day
    // - Average breathing rate: ~14 breaths/min → ~20,000 breaths/day
    // - Average sleep: ~8 hours/day → 1/3 of life
    // - Average REM cycles: ~5 dreams/night

    const heartbeats = Math.floor(totalDays * 100000);
    const breaths = Math.floor(totalDays * 20000);

    // Sleep calculations
    const sleepHours = Math.floor(totalHours / 3);
    const sleepDays = Math.floor(sleepHours / 24);
    const sleepYears = sleepDays / 365;

    // Dreams (5 per night)
    const dreams = Math.floor(totalDays * 5);

    return {
        heartbeats,
        breaths,
        sleepHours,
        sleepDays,
        sleepYears,
        dreams,
    };
}

/**
 * Format large numbers for display
 */
export function formatBioStat(value: number): string {
    if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(2)} miliar`;
    }
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(2)} juta`;
    }
    return value.toLocaleString('id-ID');
}
