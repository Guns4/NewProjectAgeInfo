"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents({ selector }: { selector: string }) {
    const [headings, setHeadings] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll(`${selector} h2, ${selector} h3`));
        const items = elements.map((el) => {
            // Ensure ID exists
            if (!el.id) {
                el.id = el.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || "";
            }
            return {
                id: el.id,
                text: el.textContent || "",
                level: parseInt(el.tagName.substring(1))
            };
        });
        setHeadings(items);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0% -80% 0%" }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [selector]);

    if (headings.length === 0) return null;

    return (
        <div className="hidden lg:block sticky top-32 h-fit space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-400">
                <List className="w-4 h-4" />
                Table of Contents
            </div>
            <nav className="flex flex-col space-y-3 border-l-2 border-zinc-100 dark:border-zinc-800">
                {headings.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                            "pl-4 text-sm transition-all hover:text-primary py-1 -ml-[2px] border-l-2",
                            item.level === 3 ? "ml-4" : "",
                            activeId === item.id
                                ? "text-primary font-bold border-primary"
                                : "text-muted-foreground border-transparent"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        {item.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}
