"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-heading",
    {
        variants: {
            variant: {
                primary:
                    "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-soft-md hover:opacity-90 hover:shadow-soft-lg border-0",
                secondary:
                    "bg-white/10 backdrop-blur-md border border-white/20 text-indigo-600 dark:text-indigo-300 hover:bg-white/20 hover:border-white/30",
                ghost:
                    "hover:bg-accent hover:text-accent-foreground text-foreground",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                link:
                    "text-primary underline-offset-4 hover:underline",
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90", // Fallback compatibility
            },
            size: {
                default: "h-auto px-8 py-4 rounded-2xl text-base", // px-8=32px (4×8), py-4=16px (2×8) ✅
                sm: "h-8 rounded-xl px-4",                          // h-8=32px (4×8), px-4=16px (2×8) ✅
                lg: "h-12 rounded-2xl px-10 text-lg",               // h-12=48px (6×8), px-10=40px (5×8) ✅
                icon: "h-10 w-10 rounded-xl",                       // h-10=40px (5×8), w-10=40px (5×8) ✅
            },
            loading: {
                true: "cursor-wait opacity-80",
                false: ""
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
            loading: false
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
        // If asChild is true, we use Slot. Otherwise we use motion.button for animations.
        // Note: If using asChild, framer-motion props won't automatically apply to the child unless the child handles them.
        // For this specific 'System' request, we prioritize the standard implementation.
        const Comp = asChild ? Slot : motion.button

        const motionProps = !asChild ? {
            whileHover: { scale: 0.98 },
            whileTap: { scale: 0.95 },
            transition: { type: "spring", stiffness: 400, damping: 17 }
        } : {}

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, loading: isLoading, className }))}
                ref={ref as any}
                disabled={isLoading || props.disabled}
                {...motionProps}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </Comp>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
