import { addDays, addYears, differenceInDays, format } from "date-fns";
import { id } from "date-fns/locale";

export type Pasaran = 'Legi' | 'Pahing' | 'Pon' | 'Wage' | 'Kliwon';
export type DayName = 'Minggu' | 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';

export interface HaulEvent {
    id: string;
    title: string;
    date: Date;
    weton: string; // e.g., "Senin Pahing"
    description: string;
}

// Reference: 1 Jan 2024 is Senin Pahing.
// Known anchors help avoid 1900 issues. 
// Cycle: 5 days. 
const PASARAN_NAMES: Pasaran[] = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
// Anchor: 1 Jan 2024 = Senin Pahing
const ANCHOR_DATE = new Date(2024, 0, 1); // Month is 0-indexed
const ANCHOR_PASARAN_INDEX = 1; // Pahing (Index in PASARAN_NAMES)

export function getWeton(date: Date): { dayName: string; pasaran: string; full: string } {
    const diff = differenceInDays(date, ANCHOR_DATE);

    // Pasaran calc
    // Positive or negative diff handled via modulo with positive normalization
    let pasaranIndex = (ANCHOR_PASARAN_INDEX + diff) % 5;
    if (pasaranIndex < 0) pasaranIndex += 5;

    const pasaran = PASARAN_NAMES[pasaranIndex] || '';
    const dayName = format(date, 'EEEE', { locale: id }); // date-fns locale

    return {
        dayName,
        pasaran,
        full: `${dayName} ${pasaran}`
    };
}

export function calculateHaul(deathDate: Date): HaulEvent[] {
    const events: HaulEvent[] = [];

    // Helper
    const createEvent = (title: string, date: Date, desc: string): HaulEvent => {
        const weton = getWeton(date);
        return {
            id: title.replace(/\s+/g, '-').toLowerCase(),
            title,
            date,
            weton: weton.full,
            description: desc
        };
    };

    // 1. 3 Hari (Day 3, so add 2 days)
    events.push(createEvent('3 Hari', addDays(deathDate, 2), 'Selamatan 3 Hari'));

    // 2. 7 Hari (Day 7, add 6 days)
    events.push(createEvent('7 Hari', addDays(deathDate, 6), 'Selamatan 7 Hari'));

    // 3. 40 Hari (Day 40, add 39 days)
    events.push(createEvent('40 Hari', addDays(deathDate, 39), 'Selamatan 40 Hari'));

    // 4. 100 Hari (Day 100, add 99 days)
    events.push(createEvent('100 Hari', addDays(deathDate, 99), 'Selamatan 100 Hari'));

    // 5. 1 Mendak (1 Tahun)
    // Tradition varies. Some use strict Gregorain, some use Javanese year (354 days).
    // The prompt says "1 Mendak (1 Tahun)". Let's defaults to Gregorian for standard usage, 
    // but maybe add note or use Javanese? "Religious Sync" implies cultural accuracy.
    // Javanese Mendak matches the Day and Pasaran? (Tumbuk).
    // Tumbuk happens differently. 
    // Usually Mendak 1 is celebrated 1 year later (Gregorian often used in modern context, or Hijri).
    // Let's use Gregorian Add 1 Year for MVP but show Weton.
    events.push(createEvent('Mendak 1 (1 Tahun)', addYears(deathDate, 1), 'Peringatan 1 Tahun'));

    // 6. Mendak 2 (2 Tahun)
    events.push(createEvent('Mendak 2 (2 Tahun)', addYears(deathDate, 2), 'Peringatan 2 Tahun'));

    // 7. 1000 Hari (Nyewu)
    events.push(createEvent('1000 Hari (Nyewu)', addDays(deathDate, 999), 'Selamatan 1000 Hari'));

    return events;
}
