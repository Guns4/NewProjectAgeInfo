"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatLocaleDate, cn } from "@/lib/utils";
import { HistoryItem } from "@/hooks/useSearchHistory";
import { useLocale } from "next-intl";
import { Clock } from "lucide-react";

interface HistoryChipsProps {
    history: HistoryItem[];
    onSelect: (date: string) => void;
    className?: string;
}

export function HistoryChips({ history, onSelect, className }: HistoryChipsProps) {
    const locale = useLocale();
    const currentLocale = locale.startsWith('id') ? 'id' : 'en';

    if (history.length === 0) return null;

    return (
        <div className={cn("w-full overflow-hidden", className)}>
            <div className="flex items-center gap-2 mb-2 text-xs font-medium text-muted-foreground/70 uppercase tracking-widest pl-1">
                <Clock className="w-3 h-3" />
                <span>Recent History</span>
            </div>

            <div className="flex flex-wrap gap-2">
                <AnimatePresence initial={false}>
                    {history.map((item) => (
                        <motion.button
                            key={item.date}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelect(item.date)}
                            className={cn(
                                "inline-flex items-center px-3 py-1.5 rounded-full text-sm",
                                "bg-background/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5",
                                "backdrop-blur-sm transition-colors duration-200",
                                "cursor-pointer select-none text-foreground/80"
                            )}
                        >
                            {formatLocaleDate(new Date(item.date), currentLocale as 'en' | 'id')}
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
