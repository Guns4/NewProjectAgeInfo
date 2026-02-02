"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useTicker } from "@/hooks/useTicker"
import { differenceInSeconds } from "date-fns"

interface SecondsCounterProps {
    birthDate: Date | null | undefined
}

function SecondsCounterComponent({ birthDate }: SecondsCounterProps) {
    const now = useTicker();

    // If no birthdate, just render matching skeleton or zero
    if (!birthDate) {
        return (
            <div className="flex flex-col items-center justify-center p-4 opacity-50">
                <div className="text-4xl font-bold tabular-nums tracking-tighter text-muted-foreground">
                    0
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest mt-2">
                    Total Seconds
                </span>
            </div>
        )
    }

    const totalSeconds = differenceInSeconds(now, birthDate);
    // Calculate ms for visual effect - though standard date-fns doesn't give total ms easily without timestamps
    // Let's use timestamps
    const totalMs = now.getTime() - birthDate.getTime();
    const msPart = Math.floor((totalMs % 1000) / 10); // 2 digits

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="flex items-baseline space-x-1">
                <motion.span
                    className="text-4xl md:text-5xl font-bold tabular-nums tracking-tighter text-foreground/80"
                >
                    {totalSeconds.toLocaleString()}
                </motion.span>
                <span className="text-xl font-medium text-muted-foreground">
                    .{msPart.toString().padStart(2, '0')}
                </span>
            </div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-2">
                Total Seconds Alive
            </span>
        </div>
    )
}

export const SecondsCounter = React.memo(SecondsCounterComponent);
