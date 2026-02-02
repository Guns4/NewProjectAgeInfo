"use client"

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    glowColor?: string
}

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
    ({ className, children, glowColor = "rgba(124, 58, 237, 0.15)", ...props }, ref) => {
        const mouseX = useMotionValue(0)
        const mouseY = useMotionValue(0)

        function handleMouseMove({
            currentTarget,
            clientX,
            clientY,
        }: React.MouseEvent) {
            const { left, top } = currentTarget.getBoundingClientRect()
            mouseX.set(clientX - left)
            mouseY.set(clientY - top)
        }

        return (
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                whileHover={{ y: -8 }}
                className={cn(
                    "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-shadow hover:shadow-soft-lg md:p-10 dark:border-white/5 dark:bg-slate-900/50",
                    className
                )}
                {...props}
            >
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                ${glowColor},
                transparent 80%
              )
            `,
                    }}
                />
                <div className="relative z-10">{children}</div>
            </motion.div>
        )
    }
)

PremiumCard.displayName = "PremiumCard"

export { PremiumCard }
