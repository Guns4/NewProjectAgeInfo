"use client"

import * as React from "react"
import { Balancer } from "react-wrap-balancer"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const typographyVariants = cva(
    "text-foreground transition-colors",
    {
        variants: {
            variant: {
                h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-heading",
                h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-heading",
                h3: "scroll-m-20 text-2xl font-semibold tracking-tight font-heading",
                p: "leading-7 [&:not(:first-child)]:mt-6 font-body",
                blockquote: "mt-6 border-l-2 pl-6 italic",
                code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            },
            weight: {
                light: "font-light",
                normal: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
                extrabold: "font-extrabold",
            },
            gradient: {
                true: "bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent",
                false: "",
            },
        },
        defaultVariants: {
            variant: "p",
        },
    }
)

interface TypographyProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
    as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
    ({ className, variant, weight, gradient, as, children, ...props }, ref) => {
        const Component = as || (variant === "code" || variant === "blockquote" ? variant : variant || "p")
        const isHeading = ["h1", "h2", "h3"].includes(variant as string)

        const content = isHeading ? <Balancer>{children}</Balancer> : children

        return (
            <Component
                ref={ref as any}
                className={cn(typographyVariants({ variant, weight, gradient, className }))}
                {...props}
            >
                {content}
            </Component>
        )
    }
)

Typography.displayName = "Typography"

export { Typography, typographyVariants }
