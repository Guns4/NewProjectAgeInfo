'use client';

import * as React from 'react';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMilestones } from '@/hooks/useMilestones';
import { generateICS, downloadICS } from '@/lib/calendarExport';
import { toast } from 'sonner';

interface CalendarExportProps {
    age: any; // Using any to match existing flexibility, ideally AgeResult
    birthDate: Date | null;
}

export function CalendarExport({ age, birthDate }: CalendarExportProps) {
    const { upcomingMilestones } = useMilestones(birthDate, age);

    const handleExport = () => {
        if (upcomingMilestones.length === 0) {
            toast.error('No upcoming milestones found to export.');
            return;
        }

        try {
            const icsContent = generateICS(upcomingMilestones);
            downloadICS(icsContent);
            toast.success('Calendar file downloaded! Import it to your calendar app.');
        } catch (error) {
            console.error(error);
            toast.error('Failed to generate calendar file.');
        }
    };

    if (!birthDate || upcomingMilestones.length === 0) return null;

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2 text-xs border-dashed border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all"
        >
            <CalendarIcon className="w-3 h-3" />
            Add Milestones to Calendar
            <Download className="w-3 h-3 ml-1 opacity-50" />
        </Button>
    );
}
