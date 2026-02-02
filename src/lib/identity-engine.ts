export type Pasaran = 'Legi' | 'Pahing' | 'Pon' | 'Wage' | 'Kliwon';
export type WetonResult = {
    day: string; // Senin, Selasa, etc.
    pasaran: Pasaran;
    neptu: number;
};

export type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';
export type ZodiacResult = {
    sign: ZodiacSign;
    element: 'Fire' | 'Earth' | 'Air' | 'Water';
    dateRange: string;
};

export type ShioAnimal = 'Rat' | 'Ox' | 'Tiger' | 'Rabbit' | 'Dragon' | 'Snake' | 'Horse' | 'Goat' | 'Monkey' | 'Rooster' | 'Dog' | 'Pig';
export type ShioResult = {
    animal: ShioAnimal;
    yinYang: 'Yin' | 'Yang';
    fixedElement: 'Water' | 'Earth' | 'Wood' | 'Gold' | 'Fire';
};

// --- Weton Logic ---
// Anchor: 1 Jan 1900 was Monday (Senin) Pahing
const PASARAN_CYCLE = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'] as const;
const DAY_NEPTU: Record<number, number> = {
    0: 5, // Sunday (Minggu)
    1: 4, // Monday (Senin)
    2: 3, // Tuesday (Selasa)
    3: 7, // Wednesday (Rabu)
    4: 8, // Thursday (Kamis)
    5: 6, // Friday (Jumat)
    6: 9  // Saturday (Sabtu)
};
const PASARAN_NEPTU: Record<Pasaran, number> = {
    'Legi': 5,
    'Pahing': 9,
    'Pon': 7,
    'Wage': 4,
    'Kliwon': 8
};

// Helper: Get day difference from anchor
function getDayDiff(date: Date): number {
    const anchor = new Date(1900, 0, 1); // 1 Jan 1900
    // Reset hours to ensure clean day diff
    const d = new Date(date); d.setHours(0, 0, 0, 0);
    const a = new Date(anchor); a.setHours(0, 0, 0, 0);
    const diffTime = d.getTime() - a.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateWeton(date: Date): WetonResult {
    const diff = getDayDiff(date);

    // 1 Jan 1900 = Pahing (Index 1 in our cycle Legi, Pahing...)
    // Cycle is 5 days. 
    // NewIndex = (AnchorIndex + Diff) % 5
    // BUT JS Modulo of negative numbers is tricky, so handle absolute or normalized
    // If diff is negative (pre-1900), standardized modulo:
    const anchorIndex = 1; // Pahing
    let pasaranIndex = (anchorIndex + diff) % 5;
    if (pasaranIndex < 0) pasaranIndex += 5;

    const pasaran = PASARAN_CYCLE[pasaranIndex]!;

    // Day of week (0=Sun, 1=Mon...)
    const dayIndex = date.getDay();
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = dayNames[dayIndex]!;

    const neptu = DAY_NEPTU[dayIndex]! + PASARAN_NEPTU[pasaran];

    return {
        day: dayName,
        pasaran,
        neptu
    };
}

// --- Zodiac Logic ---
export function calculateZodiac(date: Date): ZodiacResult {
    const day = date.getDate();
    const month = date.getMonth() + 1; // 1-12

    let sign: ZodiacSign = 'Capricorn';

    if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) sign = 'Capricorn';
    else if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) sign = 'Aquarius';
    else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) sign = 'Pisces';
    else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) sign = 'Aries';
    else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) sign = 'Taurus';
    else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) sign = 'Gemini';
    else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) sign = 'Cancer';
    else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) sign = 'Leo';
    else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) sign = 'Virgo';
    else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) sign = 'Libra';
    else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) sign = 'Scorpio';
    else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) sign = 'Sagittarius';

    const elements: Record<ZodiacSign, ZodiacResult['element']> = {
        Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
        Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
        Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
        Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water'
    };

    const ranges: Record<ZodiacSign, string> = {
        Capricorn: 'Dec 22 - Jan 19',
        Aquarius: 'Jan 20 - Feb 18',
        Pisces: 'Feb 19 - Mar 20',
        Aries: 'Mar 21 - Apr 19',
        Taurus: 'Apr 20 - May 20',
        Gemini: 'May 21 - Jun 20',
        Cancer: 'Jun 21 - Jul 22',
        Leo: 'Jul 23 - Aug 22',
        Virgo: 'Aug 23 - Sep 22',
        Libra: 'Sep 23 - Oct 22',
        Scorpio: 'Oct 23 - Nov 21',
        Sagittarius: 'Nov 22 - Dec 21'
    };

    return {
        sign,
        element: elements[sign],
        dateRange: ranges[sign]
    };
}

// --- Shio Logic ---
const SHIO_ANIMALS: ShioAnimal[] = [
    'Monkey', 'Rooster', 'Dog', 'Pig',
    'Rat', 'Ox', 'Tiger', 'Rabbit',
    'Dragon', 'Snake', 'Horse', 'Goat'
]; // 1900 % 12 = 4 (Rat). Wait.
// 1900 was Year of the Rat (Metal Rat).
// 1900 % 12 = 4. 
// If Array[4] needs to be Rat.
// Let's verify.
// 1900 % 12 = 4. 
// If loop index is 0=Monkey, 1=Rooster, 2=Dog, 3=Pig, 4=Rat. Correct.

export function calculateShio(date: Date): ShioResult {
    const year = date.getFullYear();
    const index = year % 12;
    const animal = SHIO_ANIMALS[index]!;

    // Simple Element Logic based on last digit of year
    // 0,1 Metal (Gold)
    // 2,3 Water
    // 4,5 Wood
    // 6,7 Fire
    // 8,9 Earth
    // This is "Heavenly Stems" element for the year, typically used with Shio
    const lastDigit = year % 10;
    let fixedElement: ShioResult['fixedElement'] = 'Gold';

    if (lastDigit === 0 || lastDigit === 1) fixedElement = 'Gold';
    else if (lastDigit === 2 || lastDigit === 3) fixedElement = 'Water';
    else if (lastDigit === 4 || lastDigit === 5) fixedElement = 'Wood';
    else if (lastDigit === 6 || lastDigit === 7) fixedElement = 'Fire';
    else fixedElement = 'Earth';

    // Yin/Yang: Even years Yang, Odd years Yin? 
    // Actually standard Chinese zodiac year polarity is fixed per animal or stem. 
    // Rat is Yang, Ox is Yin, etc.
    // Rat(Yang), Ox(Yin), Tiger(Yang), Rabbit(Yin)...
    // Since our array starts at 0=Monkey(Yang), 1=Rooster(Yin)...
    const yinYang = index % 2 === 0 ? 'Yang' : 'Yin';

    return {
        animal,
        yinYang,
        fixedElement
    };
}
