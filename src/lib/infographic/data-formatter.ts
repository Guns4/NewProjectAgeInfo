/**
 * Infographic Data Formatter - Fase 461-480
 * Utilities for formatting age data into shareable highlights
 */

import type { AgeResult } from '@/hooks/calculator/useAgeCalculator';
import type { InfographicData } from '@/types/infographic';

/**
 * Format large numbers into human-readable format
 * Examples: 1,500,000 → "1.5M", 45,000 → "45K"
 */
export function formatLargeNumber(num: number): string {
    if (num >= 1_000_000_000) {
        return `${(num / 1_000_000_000).toFixed(1)}B`;
    }
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(1)}M`;
    }
    if (num >= 1_000) {
        return `${(num / 1_000).toFixed(1)}K`;
    }
    return num.toLocaleString();
}

/**
 * Select the most impressive/shareable stats from age data
 * Prioritizes large numbers and unique milestones
 */
export function selectHighlights(age: AgeResult): InfographicData['highlights'] {
    const highlights: InfographicData['highlights'] = [];

    // 1. Total days (always impressive)
    if (age.totalDays >= 1000) {
        highlights.push({
            label: 'Days on Earth',
            value: formatLargeNumber(age.totalDays),
            icon: '🌍',
        });
    }

    // 2. Total hours (big number impact)
    if (age.totalHours >= 100_000) {
        highlights.push({
            label: 'Hours Lived',
            value: formatLargeNumber(age.totalHours),
            icon: '⏰',
        });
    }

    // 3. Total minutes (for younger users or variety)
    if (age.totalMinutes >= 1_000_000) {
        highlights.push({
            label: 'Minutes of Life',
            value: formatLargeNumber(age.totalMinutes),
            icon: '⏱️',
        });
    }

    // 4. Total seconds (always a big number!)
    if (age.totalSeconds >= 1_000_000_000) {
        highlights.push({
            label: 'Seconds Alive',
            value: formatLargeNumber(age.totalSeconds),
            icon: '⚡',
        });
    } else if (age.totalSeconds >= 100_000_000) {
        highlights.push({
            label: 'Seconds Alive',
            value: formatLargeNumber(age.totalSeconds),
            icon: '⚡',
        });
    }

    // 5. Age in years (classic)
    highlights.push({
        label: 'Years Old',
        value: age.years.toString(),
        icon: '🎂',
    });

    // 6. Total weeks
    if (age.totalWeeks >= 1000) {
        highlights.push({
            label: 'Weeks of Journey',
            value: formatLargeNumber(age.totalWeeks),
            icon: '📅',
        });
    }

    // Select top 5-6 most impressive stats
    // Prioritize billions > millions > thousands
    return highlights.slice(0, 6);
}

/**
 * Get upcoming milestones based on age
 */
export function getTopMilestones(age: AgeResult): InfographicData['milestones'] {
    const milestones: InfographicData['milestones'] = [];

    // Next birthday
    milestones.push({
        label: `${age.nextAge}th Birthday`,
        date: age.nextBirthday.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }),
    });

    // 10,000 days milestone (if approaching)
    const daysTo10k = 10_000 - age.totalDays;
    if (daysTo10k > 0 && daysTo10k <= 365) {
        milestones.push({
            label: '10,000 Days Milestone',
        });
    }

    // 20,000 days milestone
    const daysTo20k = 20_000 - age.totalDays;
    if (daysTo20k > 0 && daysTo20k <= 365) {
        milestones.push({
            label: '20,000 Days Milestone',
        });
    }

    // 1 billion seconds milestone
    const secondsTo1B = 1_000_000_000 - age.totalSeconds;
    if (secondsTo1B > 0 && secondsTo1B <= 31_536_000) {
        // Within 1 year
        milestones.push({
            label: '1 Billion Seconds',
        });
    }

    // Round decade birthdays
    const nextDecade = Math.ceil(age.years / 10) * 10;
    if (nextDecade - age.years <= 3 && nextDecade - age.years > 0) {
        milestones.push({
            label: `${nextDecade}th Birthday`,
        });
    }

    return milestones.slice(0, 3); // Top 3 milestones
}

/**
 * Prepare complete infographic data from birth date and age
 */
export function prepareInfographicData(birthDate: Date, age: AgeResult): InfographicData {
    return {
        birthDate,
        age,
        highlights: selectHighlights(age),
        milestones: getTopMilestones(age),
        generatedAt: new Date(),
    };
}

/**
 * Get a motivational tagline based on age
 */
export function getMotivationalTagline(age: AgeResult): string {
    const taglines = [
        `${formatLargeNumber(age.totalDays)} days of amazing journey`,
        `Living life ${formatLargeNumber(age.totalSeconds)} seconds at a time`,
        `${age.years} years young and counting`,
        `${formatLargeNumber(age.totalHours)} hours of memories made`,
        `Every moment matters. ${formatLargeNumber(age.totalMinutes)} minutes and growing.`,
    ];

    // Select based on what's most impressive
    if (age.totalSeconds >= 1_000_000_000) return taglines[1] || "A billion seconds of life";
    if (age.totalDays >= 10_000) return taglines[0] || "Thousands of days traveled";
    if (age.years >= 25) return taglines[2] || "Years of wisdom";
    if (age.totalHours >= 500_000) return taglines[3] || "Hours of memories";
    return taglines[4] || "Every moment counts";
}
