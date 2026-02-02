import { DateDurationCalculator } from "@/components/features/calculator/DateDurationCalculator"
import { RetirementCountdown } from "@/components/features/calculator/RetirementCountdown"

export const metadata = {
    title: 'Date Duration Calculator - AgeInfo',
    description: 'Calculate the duration between two dates including working days.',
}

export default function DateDurationPage() {
    return (
        <div className="container mx-auto max-w-2xl space-y-8 px-4 py-12">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Date Duration Calculator
                </h1>
                <p className="text-muted-foreground">
                    Calculate the duration between two dates, including working days.
                </p>
            </div>

            <DateDurationCalculator />

            <div className="pt-8 border-t border-border/50">
                <RetirementCountdown />
            </div>
        </div>
    )
}
