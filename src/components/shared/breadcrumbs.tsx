"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    label: string;
    href: string;
    active?: boolean;
}

export function Breadcrumbs({ className }: { className?: string }) {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    // segments[0] is locale
    const locale = segments[0] || "en";

    const breadcrumbs: BreadcrumbItem[] = [
        { label: locale.toUpperCase(), href: `/${locale}` },
    ];

    let currentHref = `/${locale}`;

    // Skip the first segment (locale) in the loop
    for (let i = 1; i < segments.length; i++) {
        const segment = segments[i] || "";
        currentHref += `/${segment}`;

        // Custom labels for common segments
        let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
        if (segment === "blog") label = "Blog";
        if (segment === "weton") label = "Weton Analysis";

        breadcrumbs.push({
            label,
            href: currentHref,
            active: i === segments.length - 1
        });
    }

    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("flex items-center space-x-2 text-sm font-medium text-muted-foreground", className)}
        >
            <Link
                href={`/${locale}`}
                className="hover:text-primary transition-colors flex items-center gap-1"
            >
                <Home className="w-4 h-4" />
            </Link>

            {breadcrumbs.map((item) => (
                <div key={item.href} className="flex items-center space-x-2">
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                    <Link
                        href={item.href}
                        className={cn(
                            "hover:text-primary transition-colors",
                            item.active ? "text-primary font-bold cursor-default pointer-events-none" : ""
                        )}
                        aria-current={item.active ? "page" : undefined}
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    );
}
