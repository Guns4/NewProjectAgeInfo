"use client";

import * as React from "react";
import { CardHeader, CardTitle, CardContent } from "@/components/ui";
import { PremiumCard } from "@/components/ui/card-premium";
import { FloatingInput } from "@/components/ui/input-floating";
import { calculateHaul, type HaulEvent } from "@/lib/haulLogic";
import { generateICS, downloadICS } from "@/lib/calendarExport";
import { Calendar, Moon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";

export function HaulCalculator() {
    const [deathDate, setDeathDate] = React.useState("");
    const [events, setEvents] = React.useState<HaulEvent[]>([]);

    React.useEffect(() => {
        if (!deathDate) return;

        const date = new Date(deathDate);
        if (!isNaN(date.getTime())) {
            const results = calculateHaul(date);
            setEvents(results);
        }
    }, [deathDate]);

    return (
        <div className="space-y-6">
            <PremiumCard className="p-6">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Moon className="w-5 h-5 text-indigo-500" />
                        Haul & Memorial Calculator
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                    <FloatingInput
                        label="Date of Passing (Tanggal Wafat)"
                        type="date"
                        value={deathDate}
                        onChange={(e) => setDeathDate(e.target.value)}
                    />

                    {events.length > 0 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid gap-3">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="relative overflow-hidden rounded-xl border bg-card/50 p-4 transition-colors hover:bg-card/80"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-primary">{event.title}</span>
                                                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                                                        {event.weton}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {format(event.date, "EEEE, d In MMMM yyyy", { locale: id })}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 gap-1.5"
                                                    onClick={() => downloadICS(generateICS([
                                                        {
                                                            type: 'days', // Hack to reuse existing type
                                                            target: 0,
                                                            reached: false,
                                                            date: event.date,
                                                            daysUntil: 0,
                                                            percentage: 0,
                                                            label: event.title,
                                                            description: 'Haul Event Reminder'
                                                        }
                                                    ]), `${event.id}.ics`)}
                                                >
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span className="sr-only sm:not-sr-only">.ics</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </PremiumCard>
        </div>
    );
}
