'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { findSpecialDates, DAYS_OF_WEEK, PASARAN_TYPES, DateCriteria } from '@/lib/smartDateFinder';
import { Pasaran } from '@/lib/identity-engine';
import { toast } from 'sonner';

// Dynamic import for ICS features (client-side only/heavy)
// We'll use the import inside the handler as before

export function SmartDateFinder() {
    const [selectedDay, setSelectedDay] = React.useState<string>('Senin');
    const [selectedPasaran, setSelectedPasaran] = React.useState<Pasaran>('Legi');
    const [results, setResults] = React.useState<Date[]>([]);
    const [isSearching, setIsSearching] = React.useState(false);

    const handleSearch = () => {
        setIsSearching(true);
        // Simulate "thinking" for effect
        setTimeout(() => {
            const criteria: DateCriteria = {
                dayName: selectedDay,
                pasaran: selectedPasaran
            };
            const found = findSpecialDates(new Date(), criteria, 6); // Find next 6 occurrences
            setResults(found);
            setIsSearching(false);
        }, 600);
    };

    const handleAddToCalendar = async (date: Date) => {
        const { generateICSEvent, downloadICSFile } = await import('@/lib/icsGenerator');

        const event = {
            start: date,
            title: `Hari Baik: ${selectedDay} ${selectedPasaran}`,
            description: `Momen spesial Weton ${selectedDay} ${selectedPasaran} yang Anda cari.`,
            uid: `special-${date.getTime()}@ageinfo.online`
        };

        const ics = generateICSEvent(event);
        downloadICSFile(ics, `special-date-${date.toISOString().slice(0, 10)}.ics`);
        toast.success('Saved to Calendar!');
    };

    return (
        <Card className="w-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-indigo-100 dark:border-indigo-900/30">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Cari Hari Baik
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Temukan tanggal masa depan berdasarkan Weton pilihan Anda.
                </p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Controls */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-medium uppercase text-muted-foreground">Hari</label>
                        <Select value={selectedDay} onValueChange={setSelectedDay}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Hari" />
                            </SelectTrigger>
                            <SelectContent>
                                {DAYS_OF_WEEK.map(d => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-medium uppercase text-muted-foreground">Pasaran</label>
                        <Select value={selectedPasaran} onValueChange={(v) => setSelectedPasaran(v as Pasaran)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Pasaran" />
                            </SelectTrigger>
                            <SelectContent>
                                {PASARAN_TYPES.map(p => (
                                    <SelectItem key={p} value={p}>{p}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-end">
                        <Button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className="w-full md:w-auto min-w-[120px]"
                        >
                            {isSearching ? 'Mencari...' : (
                                <>
                                    <Search className="w-4 h-4 mr-2" />
                                    Cari Tanggal
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Results Grid */}
                <AnimatePresence mode="wait">
                    {results.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-2 md:grid-cols-3 gap-4"
                        >
                            {results.map((date, idx) => (
                                <motion.div
                                    key={date.toISOString()}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-white/50 dark:bg-slate-900/50 hover:shadow-md transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-900 text-indigo-600"
                                            onClick={() => handleAddToCalendar(date)}
                                            title="Add to Calendar"
                                        >
                                            <CalendarIcon className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                                            {date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                        </p>
                                        <p className="text-3xl font-bold text-foreground">
                                            {date.getDate()}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {selectedDay} {selectedPasaran}
                                        </p>
                                    </div>

                                    {/* Decorative subtle stripe */}
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}
