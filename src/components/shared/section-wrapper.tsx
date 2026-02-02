import { cn } from "@/lib/utils";
import React from "react";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export function SectionWrapper({ children, className, ...props }: SectionWrapperProps) {
    return (
        <section
            className={cn(
                "container mx-auto px-4 py-12 sm:px-8 md:py-24",
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
}
