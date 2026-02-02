/**
 * Lucky Traits Generator - Fase 295.3
 * Generates lucky colors and numbers based on Weton and Zodiac elements
 */

import { calculateZodiac } from './identity-engine';

export interface LuckyTraits {
    colors: Array<{ name: string; hex: string; description: string }>;
    numbers: number[];
    element: string;
}

/**
 * Element-to-Color mapping with Hex codes
 */
const ELEMENT_COLORS = {
    Fire: [
        { name: 'Crimson Flame', hex: '#FF6B6B', description: 'Passion & Energy' },
        { name: 'Solar Burst', hex: '#FF8E53', description: 'Vitality & Warmth' },
        { name: 'Phoenix Red', hex: '#E74C3C', description: 'Transformation' },
    ],
    Earth: [
        { name: 'Forest Grove', hex: '#6B8E23', description: 'Growth & Stability' },
        { name: 'Rustic Brown', hex: '#8B7355', description: 'Grounding & Wisdom' },
        { name: 'Jade Stone', hex: '#556B2F', description: 'Balance & Harmony' },
    ],
    Air: [
        { name: 'Sky Blue', hex: '#87CEEB', description: 'Clarity & Freedom' },
        { name: 'Cloud White', hex: '#E0F7FA', description: 'Purity & Peace' },
        { name: 'Azure Breeze', hex: '#4FC3F7', description: 'Communication' },
    ],
    Water: [
        { name: 'Ocean Deep', hex: '#4A90E2', description: 'Intuition & Flow' },
        { name: 'Mystic Purple', hex: '#6A5ACD', description: 'Spiritual Depth' },
        { name: 'Twilight Blue', hex: '#5B7C99', description: 'Emotional Balance' },
    ],
    Metal: [
        { name: 'Silver Gleam', hex: '#C0C0C0', description: 'Precision & Clarity' },
        { name: 'Steel Gray', hex: '#778899', description: 'Strength & Resilience' },
        { name: 'Platinum Shine', hex: '#E5E4E2', description: 'Excellence' },
    ],
    Wood: [
        { name: 'Emerald Leaf', hex: '#50C878', description: 'Expansion & Growth' },
        { name: 'Moss Green', hex: '#8A9A5B', description: 'Natural Wisdom' },
        { name: 'Spring Bud', hex: '#A7C957', description: 'Renewal & Vitality' },
    ],
};

/**
 * Seeded random number generator for deterministic results
 */
function seededRandom(seed: number): number {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

/**
 * Generate deterministic lucky numbers based on birth date
 */
function generateLuckyNumbers(birthDate: Date): number[] {
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;
    const year = birthDate.getFullYear();

    // Create seed from birth date components
    const seed = day + month * 100 + year;

    const numbers: number[] = [];
    const seen = new Set<number>();

    // Generate 5 unique numbers (1-99)
    let currentSeed = seed;
    while (numbers.length < 5) {
        const rand = seededRandom(currentSeed);
        const num = Math.floor(rand * 99) + 1;

        if (!seen.has(num)) {
            numbers.push(num);
            seen.add(num);
        }
        currentSeed++;
    }

    // Sort for better visual presentation
    return numbers.sort((a, b) => a - b);
}

/**
 * Get lucky traits based on birth date
 * Combines Weton and Zodiac elements for color selection
 */
export function getLuckyTraits(birthDate: Date): LuckyTraits {
    const zodiac = calculateZodiac(birthDate);

    // Primary element from Zodiac
    const primaryElement = zodiac.element;

    // Get colors for the primary element
    const colors = ELEMENT_COLORS[primaryElement as keyof typeof ELEMENT_COLORS] || ELEMENT_COLORS.Fire;

    // Generate deterministic lucky numbers
    const numbers = generateLuckyNumbers(birthDate);

    return {
        colors,
        numbers,
        element: primaryElement,
    };
}

/**
 * Get a single lucky color (the first/primary one)
 */
export function getPrimaryLuckyColor(birthDate: Date): { name: string; hex: string; description: string } {
    const traits = getLuckyTraits(birthDate);
    return traits.colors[0] || { name: 'Crimson Flame', hex: '#FF6B6B', description: 'Passion & Energy' };
}

/**
 * Get all lucky numbers as a formatted string
 */
export function formatLuckyNumbers(numbers: number[]): string {
    return numbers.join(' • ');
}
