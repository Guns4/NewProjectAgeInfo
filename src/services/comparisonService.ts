/**
 * Comparison Service - Fase 381-400
 * Age comparisons with famous figures and cosmic context calculations
 */

import ageComparisons from '@/data/ageComparisons.json';

export interface AgeComparison {
    age: number;
    person: string;
    achievement: string;
    year: string | number;
    category: 'technology' | 'business' | 'science' | 'arts' | 'sports' | 'history';
}

export interface CosmicContext {
    earthOrbitDistance: number; // km traveled around sun
    moonDrift: number; // cm moon has drifted away
    galaxyDistance: number; // million km traveled through galaxy
}

/**
 * Get age comparisons for a specific age
 * Returns up to 3 random comparisons if available
 */
export function getAgeComparisons(age: number): AgeComparison[] {
    const ageKey = age.toString();
    const comparisonsData = (ageComparisons as any)[ageKey] as Omit<AgeComparison, 'age'>[] | undefined;

    if (!comparisonsData || comparisonsData.length === 0) {
        // Try nearby ages (±2 years)
        for (let offset = 1; offset <= 2; offset++) {
            const nearbyAge = age + offset;
            const nearbyKey = nearbyAge.toString();
            const nearbyData = (ageComparisons as any)[nearbyKey] as Omit<AgeComparison, 'age'>[] | undefined;

            if (nearbyData && nearbyData.length > 0) {
                return nearbyData.map(c => ({ ...c, age: nearbyAge })).slice(0, 3);
            }
        }

        return [];
    }

    // Return up to 3 random comparisons with age field added
    const shuffled = [...comparisonsData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3).map(c => ({ ...c, age }));
}

/**
 * Calculate cosmic context since birth
 * Uses scientifically accurate astronomical data
 */
export function getCosmicContext(birthDate: Date): CosmicContext {
    const now = new Date();
    const ageInYears = (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

    // Earth's orbital velocity: ~940 million km/year (29.78 km/s × 365.25 days)
    const earthOrbitDistance = Math.floor(ageInYears * 940000000);

    // Moon drift: ~3.8 cm/year (tidal forces push moon away)
    const moonDrift = parseFloat((ageInYears * 3.8).toFixed(1));

    // Solar system through Milky Way: ~828,000 km/hour
    // Convert to years: 828,000 km/h × 24h × 365.25 days
    const galaxyDistance = Math.floor(ageInYears * 828000 * 24 * 365.25 / 1000000); // in million km

    return {
        earthOrbitDistance,
        moonDrift,
        galaxyDistance,
    };
}

/**
 * Format large distances for display
 */
export function formatDistance(km: number): string {
    if (km >= 1000000000) {
        return `${(km / 1000000000).toFixed(1)} miliar km`;
    }
    if (km >= 1000000) {
        return `${(km / 1000000).toFixed(1)} juta km`;
    }
    if (km >= 1000) {
        return `${(km / 1000).toFixed(0)} ribu km`;
    }
    return `${km.toLocaleString('id-ID')} km`;
}

/**
 * Check if we have comparisons for a given age
 */
export function hasComparisons(age: number): boolean {
    const ageKey = age.toString();
    const data = (ageComparisons as any)[ageKey];
    return data !== undefined && Array.isArray(data) && data.length > 0;
}
