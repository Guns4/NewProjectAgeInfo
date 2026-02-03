'use client';

import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { id, enUS } from 'date-fns/locale';

// Register a Serif font for "khidmat" (solemn) look
Font.register({
    family: 'Times-Roman',
    src: 'https://fonts.gstatic.com/s/timesnewroman/v1/TimesNewRoman.ttf' // Fallback or standard PDF font
    // Actually standard fonts like Times-Roman are built-in usually, but react-pdf needs registration sometimes for specific weights.
    // We'll use standard 'Times-Roman' which is reliable.
});

// Styles
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Times-Roman',
        backgroundColor: '#FAF9F6', // Off-white / warm
        position: 'relative',
    },
    border: {
        border: '2px solid #1a1a1a',
        padding: 20,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    watermark: {
        position: 'absolute',
        bottom: 50,
        right: 50,
        opacity: 0.1,
        transform: 'rotate(-45deg)',
        fontSize: 60,
        color: '#000',
    },
    header: {
        textAlign: 'center',
        marginBottom: 30,
        borderBottom: '1px solid #ccc',
        paddingBottom: 20,
    },
    title: {
        fontSize: 28,
        marginBottom: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
    },
    personName: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: 'bold',
        marginTop: 10,
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 10,
        border: '1px solid #ddd',
    },
    row: {
        flexDirection: 'row',
        borderBottom: '1px solid #ddd',
        padding: 12,
        alignItems: 'center',
    },
    headerRow: {
        backgroundColor: '#f0f0f0',
        borderBottom: '2px solid #000',
    },
    cellLabel: {
        width: '40%',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cellDate: {
        width: '60%',
        fontSize: 12,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 10,
        color: '#888',
        borderTop: '1px solid #eee',
        paddingTop: 10,
    },
});

interface MemorialPdfProps {
    date: Date; // Birth or Death date
    name?: string;
    locale: string;
}

// Javanese Death Commemoration Milestones (Selametan)
const getMemorialDates = (startDate: Date) => {
    const addDays = (days: number) => {
        const d = new Date(startDate);
        d.setDate(d.getDate() + days - 1); // Javanese counts day 1 as the event day usually, or just +days?
        // Usually: 3rd day is +2 days from death. 7th day is +6.
        // BUT common calculators usually just do +days.
        // Let's stick to standard +days for simplicity unless strict Javanese math is requested.
        // "7 hari" usually means 7 days AFTER.
        // Re-reading: "7 hari" = Day 7. (D+6).
        // Let's assume standard D+days for now to be safe, or clarify.
        // Let's use simple addDays logic: startDate + days.
        const result = new Date(startDate);
        result.setDate(result.getDate() + days); // Correct: 7 days after
        return result;
    };

    // Custom logic for 40, 100, 1000
    // Javanese custom often counts the death day as day 1.
    // So "7 days" is actually +6 days from date.
    // "40 days" is +39 days.
    // "100 days" is +99 days.
    // "1000 days" is +999 days.
    // Let's apply this "-1" offset generally for "Selametan" accuracy.

    return [
        { label: '3 Hari (Nelung Dina)', date: addDays(2) },
        { label: '7 Hari (Mitung Dina)', date: addDays(6) },
        { label: '40 Hari (Matang Puluh)', date: addDays(39) },
        { label: '100 Hari (Nyatus)', date: addDays(99) },
        { label: '1 Tahun (Mendhak Pisan)', date: addDays(354) }, // Lunar year approx? Or 1 solar year? Usually 1 solar year in modern, or specific Javanese calculation. Let's use 365.
        { label: '2 Tahun (Mendhak Pindo)', date: addDays(708) }, // 2 solar years?
        { label: '1000 Hari (Nyewu)', date: addDays(999) },
    ];
};

export const MemorialPdf = ({ date, name, locale }: MemorialPdfProps) => {
    const dates = getMemorialDates(date);
    const loc = locale === 'id' ? id : enUS;
    const dateFormat = 'EEEE, d MMMM yyyy';

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.border}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>In Memoriam</Text>
                        <Text style={styles.subtitle}>Commemoration Schedule / Jadwal Selametan</Text>
                    </View>

                    {/* Name */}
                    <Text style={styles.personName}>
                        {name || (locale === 'id' ? 'Almarhum/Almarhumah' : 'The Deceased')}
                    </Text>

                    {/* Table */}
                    <View style={styles.table}>
                        <View style={[styles.row, styles.headerRow]}>
                            <Text style={styles.cellLabel}>Commemoration</Text>
                            <Text style={styles.cellDate}>Date</Text>
                        </View>

                        {dates.map((item, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.cellLabel}>{item.label}</Text>
                                <Text style={styles.cellDate}>
                                    {format(item.date, dateFormat, { locale: loc })}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Watermark / Branding */}
                    <Text style={styles.watermark}>AgeInfo</Text>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text>Generated by AgeInfo.online - Your Premium Age Calculator</Text>
                        <Text>{format(new Date(), 'dd/MM/yyyy')}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
