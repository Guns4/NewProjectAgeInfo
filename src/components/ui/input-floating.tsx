"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
    ({ className, label, error, id, ...props }, ref) => {
        // Generate a unique ID if not provided, for label association
        const generatedId = React.useId()
        const inputId = id || generatedId

        return (
            <div className="relative w-full group">
                <input
                    id={inputId}
                    className={cn(
                        "peer block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 pb-2.5 pt-6 text-sm text-foreground ring-offset-background focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:focus:border-primary font-medium transition-all duration-200",
                        error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
                        className
                    )}
                    placeholder=" "
                    ref={ref}
                    {...props}
                />
                <label
                    htmlFor={inputId}
                    className={cn(
                        "absolute left-4 top-4 z-10 origin-[0] -translate-y-2.5 scale-75 transform text-sm text-muted-foreground duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2.5 peer-focus:scale-75 peer-focus:text-primary dark:text-slate-400",
                        error && "text-rose-500 peer-focus:text-rose-500"
                    )}
                >
                    {label}
                </label>
            </div>
        )
    }
)
FloatingInput.displayName = "FloatingInput"

export { FloatingInput }
