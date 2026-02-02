import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface IdentityCardProps {
    title: string;
    value: string;
    subValue?: string;
    description?: string;
    icon: LucideIcon;
    colorTheme: 'purple' | 'blue' | 'amber' | 'emerald' | 'rose' | 'teal';
    className?: string;
    delay?: number;
}

const colorStyles = {
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'text-purple-500', text: 'text-purple-700 dark:text-purple-300' },
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'text-blue-500', text: 'text-blue-700 dark:text-blue-300' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-500', text: 'text-amber-700 dark:text-amber-300' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'text-emerald-500', text: 'text-emerald-700 dark:text-emerald-300' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', icon: 'text-rose-500', text: 'text-rose-700 dark:text-rose-300' },
    teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/20', icon: 'text-teal-500', text: 'text-teal-700 dark:text-teal-300' },
};

export function IdentityCard({
    title,
    value,
    subValue,
    description,
    icon: Icon,
    colorTheme,
    className,
    delay = 0
}: IdentityCardProps) {
    const theme = colorStyles[colorTheme];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, type: "spring", stiffness: 300 }}
            className={cn(
                "relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg",
                "backdrop-blur-sm bg-white/40 dark:bg-black/20",
                theme.bg,
                theme.border,
                className
            )}
        >
            <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md shadow-sm", theme.icon)}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider opacity-60">
                        {title}
                    </p>
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <h3 className="text-xl font-bold tracking-tight">
                            {value}
                        </h3>
                        {subValue && (
                            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full bg-white/20 dark:bg-black/10", theme.text)}>
                                {subValue}
                            </span>
                        )}
                    </div>
                    {description && (
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* Decorative Gradient Blob */}
            <div
                className={cn(
                    "absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-3xl opacity-20 pointer-events-none",
                    theme.bg.replace('/10', '/30')
                )}
            />
        </motion.div>
    );
}
