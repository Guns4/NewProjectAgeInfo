export interface Holiday {
    date: string; // YYYY-MM-DD
    name: string;
    isNational: boolean;
}

// Simplified static list for MVP. In a real app, this might come from an API.
// Focusing on Fixed Holidays and some movable religious holidays (estimated or hardcoded for near future).
// Source: Common knowledge for Indonesian holidays.

export const HOLIDAYS: Holiday[] = [
    // 2024
    { date: '2024-01-01', name: 'Tahun Baru 2024', isNational: true },
    { date: '2024-02-08', name: 'Isra Mi\'raj', isNational: true },
    { date: '2024-02-10', name: 'Tahun Baru Imlek', isNational: true },
    { date: '2024-03-11', name: 'Hari Suci Nyepi', isNational: true },
    { date: '2024-03-29', name: 'Wafat Isa Al Masih', isNational: true },
    { date: '2024-03-31', name: 'Paskah', isNational: true },
    { date: '2024-04-10', name: 'Hari Raya Idul Fitri 1445H', isNational: true },
    { date: '2024-04-11', name: 'Hari Raya Idul Fitri 1445H (Hari Ke-2)', isNational: true },
    { date: '2024-05-01', name: 'Hari Buruh Internasional', isNational: true },
    { date: '2024-05-09', name: 'Kenaikan Isa Al Masih', isNational: true },
    { date: '2024-05-23', name: 'Hari Raya Waisak', isNational: true },
    { date: '2024-06-01', name: 'Hari Lahir Pancasila', isNational: true },
    { date: '2024-06-17', name: 'Hari Raya Idul Adha 1445H', isNational: true },
    { date: '2024-07-07', name: 'Tahun Baru Islam 1446H', isNational: true },
    { date: '2024-08-17', name: 'Hari Kemerdekaan RI', isNational: true },
    { date: '2024-09-16', name: 'Maulid Nabi Muhammad SAW', isNational: true },
    { date: '2024-12-25', name: 'Hari Raya Natal', isNational: true },

    // 2025 (Estimated/Fixed)
    { date: '2025-01-01', name: 'Tahun Baru 2025', isNational: true },
    { date: '2025-01-27', name: 'Isra Mi\'raj', isNational: true }, // Est
    { date: '2025-01-29', name: 'Tahun Baru Imlek', isNational: true },
    { date: '2025-03-29', name: 'Hari Suci Nyepi', isNational: true },
    { date: '2025-03-31', name: 'Idul Fitri 1446H', isNational: true }, // Est
    { date: '2025-04-01', name: 'Idul Fitri 1446H', isNational: true }, // Est
    { date: '2025-04-18', name: 'Wafat Isa Al Masih', isNational: true },
    { date: '2025-05-01', name: 'Hari Buruh', isNational: true },
    { date: '2025-05-12', name: 'Hari Raya Waisak', isNational: true }, // Est
    { date: '2025-05-29', name: 'Kenaikan Isa Al Masih', isNational: true },
    { date: '2025-06-01', name: 'Hari Lahir Pancasila', isNational: true },
    { date: '2025-06-06', name: 'Idul Adha 1446H', isNational: true }, // Est
    { date: '2025-06-27', name: 'Tahun Baru Islam 1447H', isNational: true }, // Est
    { date: '2025-08-17', name: 'HUT RI', isNational: true },
    { date: '2025-09-05', name: 'Maulid Nabi', isNational: true }, // Est
    { date: '2025-12-25', name: 'Natal', isNational: true },

    // 2026 (Projected)
    { date: '2026-01-01', name: 'Tahun Baru 2026', isNational: true },
    { date: '2026-02-17', name: 'Imlek 2577', isNational: true },
    { date: '2026-03-20', name: 'Idul Fitri 1447H', isNational: true }, // Est
    { date: '2026-08-17', name: 'HUT RI', isNational: true },
    { date: '2026-12-25', name: 'Natal', isNational: true },
];
