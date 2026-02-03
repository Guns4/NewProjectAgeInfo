import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolConfig {
    name: string;
    description: string;
    href: string;
    icon: any;
    color: string;
}

const TOOLS_MAP: Record<string, ToolConfig> = {
    'weton-calculator': {
        name: 'Kalkulator Weton',
        description: 'Cari tahu karakter dan ramalan berdasarkan hari lahir Jowo.',
        href: '/id', // Assuming home page handles weton or has a specific tab
        icon: Sparkles,
        color: 'bg-indigo-500'
    },
    'age-engine': {
        name: 'Age Intelligence Engine',
        description: 'Analisis mendalam tentang umur, kesehatan, dan fase hidup.',
        href: '/en',
        icon: Calculator,
        color: 'bg-purple-500'
    }
};

export function RelatedTools({ toolId, className }: { toolId: string, className?: string }) {
    const tool = TOOLS_MAP[toolId];
    if (!tool) return null;

    return (
        <Card className={cn("p-6 md:p-8 overflow-hidden relative group hover:shadow-2xl transition-all border-none bg-zinc-50 dark:bg-zinc-900", className)}>
            <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl rounded-full -mr-10 -mt-10", tool.color)} />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className={cn("p-4 rounded-2xl text-white shadow-lg", tool.color)}>
                    <tool.icon className="w-8 h-8" />
                </div>

                <div className="flex-1 space-y-2">
                    <Badge variant="soft" className="mb-2">Recommended Tool</Badge>
                    <h3 className="text-2xl font-black tracking-tight">{tool.name}</h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                        {tool.description}
                    </p>
                </div>

                <Link
                    href={tool.href}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:scale-105 transition-transform"
                >
                    Try Now
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </Card>
    );
}
