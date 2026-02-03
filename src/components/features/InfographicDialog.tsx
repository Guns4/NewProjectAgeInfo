/**
 * InfographicDialog Component - Fase 461-480
 * Dialog wrapper for the infographic generator
 */

'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog';
import { InfographicGenerator } from '@/components/features/InfographicGenerator';
import type { AgeResult } from '@/hooks/calculator/useAgeCalculator';

interface InfographicDialogProps {
    birthDate: Date;
    age: AgeResult;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function InfographicDialog({
    birthDate,
    age,
    open,
    onOpenChange
}: InfographicDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[1200px] w-[95vw] h-[90vh] md:h-auto p-0 gap-0 overflow-hidden rounded-2xl bg-card border-none shadow-2xl">
                <DialogHeader className="sr-only">
                    <DialogTitle>Generate Life Infographic</DialogTitle>
                    <DialogDescription>Create a custom poster based on your life statistics</DialogDescription>
                </DialogHeader>
                <div className="h-full w-full">
                    <InfographicGenerator
                        birthDate={birthDate}
                        age={age}
                        onClose={() => onOpenChange(false)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
