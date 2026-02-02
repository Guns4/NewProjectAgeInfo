"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CardHeader, CardTitle, CardContent } from "@/components/ui";
import { PremiumCard } from "@/components/ui/card-premium";
import { FloatingInput } from "@/components/ui/input-floating";
import { calculateRetirement, type RetirementResult } from "@/lib/productivityLogic";
import { Briefcase, Palmtree, CalendarDays } from "lucide-react";
import { format } from "date-fns";


export function RetirementCountdown() {
    const [birthDate, setBirthDate] = React.useState("");
    const [retirementAge, setRetirementAge] = React.useState("55"); // standard in Indo/Global vary, using 55-65. 
    const [result, setResult] = React.useState<RetirementResult | null>(null);

    React.useEffect(() => {
        if (!birthDate || !retirementAge) return;

        const date = new Date(birthDate);
        const age = parseInt(retirementAge);

        if (!isNaN(date.getTime()) && !isNaN(age)) {
            const res = calculateRetirement(date, age);
            setResult(res);
        }
    }, [birthDate, retirementAge]);

    return (
        <div className="space-y-6">
            <PremiumCard className="p-6">
                <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Palmtree className="w-5 h-5 text-emerald-500" />
                        Retirement Planner
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingInput
                            label="Birth Date"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                        <FloatingInput
                            label="Target Retirement Age"
                            type="number"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(e.target.value)}
                        />
                    </div>

                    {result && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Visual Progress Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span>Career Progress</span>
                                    <span>{result.completedPercentage.toFixed(1)}%</span>
                                </div>
                                <div className="h-4 w-full bg-secondary/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.completedPercentage}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground text-right">
                                    Target: {format(result.retirementDate, "dd MMMM yyyy")}
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
                                        <Briefcase className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase">Working Days Left</span>
                                    </div>
                                    <div className="text-2xl font-bold tabular-nums">
                                        {result.remainingWorkingDays.toLocaleString()}
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                                    <div className="flex items-center gap-2 mb-2 text-orange-600 dark:text-orange-400">
                                        <Palmtree className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase">Weekends Left</span>
                                    </div>
                                    <div className="text-2xl font-bold tabular-nums">
                                        {(result.remainingTotalDays - result.remainingWorkingDays).toLocaleString()} {/* Approx */}
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 col-span-2 md:col-span-1">
                                    <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
                                        <CalendarDays className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase">Total Days</span>
                                    </div>
                                    <div className="text-2xl font-bold tabular-nums">
                                        {result.remainingTotalDays.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </PremiumCard>
        </div>
    );
}
