"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { FloatingInput, Card, CardHeader, CardTitle, CardContent } from "@/components/ui"
import { CardPremium } from "@/components/ui/card-premium"
import { DurationTimeline } from "@/components/features/calculator/DurationTimeline"
import { useDateDuration } from "@/hooks/calculator/useDateDuration"

export function DateDurationCalculator() {
    const [startDate, setStartDate] = React.useState("")
    const [endDate, setEndDate] = React.useState("")

    const result = useDateDuration(startDate, endDate)

    // Calculate percentage of working days vs total days for the timeline
    const workRatio = result.totalDays > 0 ? (result.workingDays / result.totalDays) * 100 : 0

    return (
        <CardPremium className="p-1">
            <Card className="border-none shadow-none">
                <CardHeader>
                    <CardTitle className="text-xl">Calculate Period</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <FloatingInput
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <FloatingInput
                            label="End Date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    {result.isValid && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8 pt-6 duration-500">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="rounded-xl bg-primary/5 p-4">
                                    <div className="text-2xl font-bold text-primary">{result.years}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Years</div>
                                </div>
                                <div className="rounded-xl bg-primary/5 p-4">
                                    <div className="text-2xl font-bold text-primary">{result.months}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Months</div>
                                </div>
                                <div className="rounded-xl bg-primary/5 p-4">
                                    <div className="text-2xl font-bold text-primary">{result.days}</div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Days</div>
                                </div>
                            </div>

                            <div className="space-y-4 rounded-xl border border-dashed p-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Total Days</span>
                                    <span className="text-lg font-bold">{result.totalDays}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Working Days (Mon-Fri)</span>
                                    <span className="text-lg font-bold text-emerald-500">{result.workingDays}</span>
                                </div>

                                <div className="pt-2">
                                    <DurationTimeline
                                        percentage={workRatio}
                                        label={`${Math.round(workRatio)}% Work Days`}
                                        color="bg-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {!result.isValid && startDate && endDate && (
                        <div className="text-center text-sm text-muted-foreground animate-in fade-in pt-4">
                            Please ensure the end date is after the start date.
                        </div>
                    )}
                </CardContent>
            </Card>
        </CardPremium>
    )
}
