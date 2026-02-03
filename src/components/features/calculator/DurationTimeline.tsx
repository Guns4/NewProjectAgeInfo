"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DurationTimelineProps {
    percentage: number // 0 to 100
    label?: string
    color?: string
}

export function DurationTimeline({ percentage, label, color = "bg-primary" }: DurationTimelineProps) {
    // Clamp percentage between 0 and 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
                <span>Start</span>
                {label && <span className="text-foreground">{label}</span>}
                <span>End</span>
            </div>

            <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary/50">
                <motion.div
                    className={cn("h-full rounded-full", color)}
                    initial={{ width: 0 }}
                    animate={{ width: `${clampedPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>

            <div className="flex justify-between text-xs text-muted-foreground/50">
                <span>0%</span>
                <span>100%</span>
            </div>
        </div>
    )
}
