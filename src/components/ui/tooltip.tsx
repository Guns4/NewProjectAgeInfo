"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            "z-50 overflow-hidden rounded-xl border bg-slate-900/95 px-3 py-1.5 text-xs text-white shadow-soft-lg transition-all animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 backdrop-blur-md dark:border-slate-800",
            "scale-in-spring", // Target for custom animation if needed
            className
        )}
        {...props}
    />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface InfoTooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipTrigger> {
    content: string
    className?: string
}

const InfoTooltip = ({ content, className, ...props }: InfoTooltipProps) => {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild {...props}>
                    <button
                        type="button"
                        className={cn(
                            "inline-flex items-center justify-center rounded-full text-muted-foreground/60 hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-target-icon active:scale-90",
                            className
                        )}
                    >
                        <Info className="h-4 w-4" />
                    </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                    <p className="max-w-[200px] leading-relaxed">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, InfoTooltip }
