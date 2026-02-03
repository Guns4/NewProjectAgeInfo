import { HaulCalculator } from "@/components/features/calculator/HaulCalculator";

export const metadata = {
    title: 'Haul & Weton Calculator - AgeInfo',
    description: 'Calculate traditional Javanese/Islamic death memorial dates (3, 7, 40, 1000 days) with Weton integration.',
};

export default function HaulPage() {
    return (
        <div className="container max-w-2xl py-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Tradition & Memorials</h1>
                <p className="text-muted-foreground">
                    Honoring the past with precision. Calculate traditional memorial dates (Haul) synced with the Javanese Weton calendar.
                </p>
            </div>

            <HaulCalculator />
        </div>
    )
}
