"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <motion.div
            className={cn(
                "rounded-md bg-muted/50",
                className
            )}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.5, 1]
            }}
            {...props}
        />
    );
}

export { Skeleton };
