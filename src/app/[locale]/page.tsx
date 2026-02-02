import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AgeDashboard } from "@/components/features/age-dashboard";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
            <main className="flex min-h-screen w-full flex-col items-center justify-center">
                <div className="w-full max-w-4xl space-y-8 text-center">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            Age Info
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Discover the precise details of your journey through time.
                        </p>
                    </div>

                    <AgeDashboard />
                </div>
            </main>
        </div>
    );
}
