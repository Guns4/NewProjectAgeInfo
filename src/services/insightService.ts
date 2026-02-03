/**
 * Insight Generator Service - Fase 295.2
 * Provides philosophical and modern insights based on identity metrics.
 */

import type { ZodiacResult } from '@/lib/identity-engine';

export interface InsightResult {
    neptuInsight: string;
    elementAffinity: string;
    genZVibe: string;
}

const NEPTU_PHILOSOPHY: Record<number, { id: string; en: string }> = {
    7: {
        id: 'Melambangkan kerendahan hati dan ketenangan batin.',
        en: 'Symbolizes humility and inner peace.',
    },
    8: {
        id: 'Memiliki pendirian yang kuat dan tahan uji.',
        en: 'Possesses strong determination and resilience.',
    },
    9: {
        id: 'Penuh semangat dan memiliki potensi kepemimpinan.',
        en: 'Full of spirit and leadership potential.',
    },
    10: {
        id: 'Cerdas, diplomatis, dan mudah bergaul.',
        en: 'Intelligent, diplomatic, and sociable.',
    },
    11: {
        id: 'Berjiwa sosial tinggi dan penuh kasih sayang.',
        en: 'High social spirit and compassion.',
    },
    12: {
        id: 'Mampu menjadi penengah yang bijaksana.',
        en: 'Capable of being a wise mediator.',
    },
    13: {
        id: 'Melambangkan watak yang kuat namun tenang.',
        en: 'Symbolizes a strong yet calm character.',
    },
    14: {
        id: 'Memiliki intuisi tajam dan daya tarik alami.',
        en: 'Sharp intuition and natural charisma.',
    },
    15: {
        id: 'Suka petualangan dan memiliki visi yang luas.',
        en: 'Loves adventure and has a broad vision.',
    },
    16: {
        id: 'Memiliki kedalaman spiritual dan kreativitas.',
        en: 'Deep spiritual depth and creativity.',
    },
    17: {
        id: 'Berwibawa dan disegani banyak orang.',
        en: 'Authoritative and respected by many.',
    },
    18: {
        id: 'Melambangkan kesempurnaan dan keberuntungan.',
        en: 'Symbolizes perfection and good fortune.',
    },
};

const ELEMENT_TIPS: Record<string, { id: string; en: string }> = {
    Fire: {
        id: 'Energi kamu sedang membara! Salurkan lewat hobi kreatif untuk menghindari burn-out.',
        en: 'Your energy is burning bright! Channel it through creative hobbies to avoid burn-out.',
    },
    Earth: {
        id: 'Waktunya grounding. Cobalah jalan santai di alam untuk menstabilkan emosi.',
        en: 'Time for grounding. Try a leisure walk in nature to stabilize your emotions.',
    },
    Air: {
        id: 'Pikiranmu sedang jernih. Gunakan momen ini untuk networking atau belajar hal baru.',
        en: 'Your mind is clear. Use this moment for networking or learning something new.',
    },
    Water: {
        id: 'Intuisi kamu sedang naik tajam. Dengarkan kata hati sebelum mengambil keputusan besar.',
        en: 'Your intuition is peaking. Listen to your heart before making major decisions.',
    },
};

const GENZ_VIBES: { id: string; en: string }[] = [
    { id: 'Vibes kamu hari ini: Lunar Energy 🌙', en: "Today's vibe: Lunar Energy 🌙" },
    { id: 'Main Character Energy mode: ON ✨', en: 'Main Character Energy mode: ON ✨' },
    { id: 'Slay the day with Cosmic Confidence 💅', en: 'Slay the day with Cosmic Confidence 💅' },
    { id: 'Manifesting positive frequency only ⚡', en: 'Manifesting positive frequency only ⚡' },
    { id: 'Era kamu hari ini: Unstoppable Growth 📈', en: 'Your era today: Unstoppable Growth 📈' },
];

/**
 * Generate insights based on birth date parameters
 */
export function generateInsights(
    neptu: number,
    element: ZodiacResult['element'],
    locale: string
): InsightResult {
    const isID = locale.startsWith('id');
    const lang = isID ? 'id' : 'en';

    // 1. Neptu Insight
    const neptuData = NEPTU_PHILOSOPHY[neptu] || {
        id: 'Memiliki keunikan tersendiri dalam melangkah.',
        en: 'Possesses a unique way of moving forward.',
    };
    const neptuInsight = `Neptu ${neptu}: ${neptuData[lang]}`;

    // 2. Element Affinity
    const elementData = ELEMENT_TIPS[element] || {
        id: 'Elemen kamu memberikan keseimbangan dalam hidup.',
        en: 'Your element provides balance in life.',
    };
    const elementAffinity = elementData[lang];

    // 3. Gen Z Vibe (Deterministic based on neptu to keep stable for user)
    const vibeIndex = neptu % GENZ_VIBES.length;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const genZVibe = GENZ_VIBES[vibeIndex]![lang];

    return {
        neptuInsight,
        elementAffinity,
        genZVibe,
    };
}
