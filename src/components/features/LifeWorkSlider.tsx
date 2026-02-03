'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase, Heart } from 'lucide-react';
// import { cn } from '@/lib/utils';

interface LifeWorkSliderProps {
    currentAge: number;
}

export function LifeWorkSlider({ currentAge }: LifeWorkSliderProps) {
    const [retirementAge, setRetirementAge] = React.useState<number>(60);

    // Constants
    const WEEKS_PER_YEAR = 52;
    const WORK_HOURS_PER_WEEK = 40;
    const TOTAL_LIFE_EXPECTANCY = 80;

    // Derived values
    const totalLifeHours = TOTAL_LIFE_EXPECTANCY * 365 * 24;

    // Assuming work starts at 20
    const careerYears = Math.max(0, retirementAge - 20);
    const totalWorkHours = careerYears * WEEKS_PER_YEAR * WORK_HOURS_PER_WEEK;

    // Calculate relative sizes for visualization (area based)
    // Area = pi * r^2  => r = sqrt(Area/pi)
    // We want Area to be proportional to hours.

    // Base scale factor
    const maxRadius = 140; // px
    const scaleFactor = (maxRadius * maxRadius * Math.PI) / totalLifeHours;

    const lifeRadius = Math.sqrt(totalLifeHours * scaleFactor / Math.PI);
    const workRadius = Math.sqrt(totalWorkHours * scaleFactor / Math.PI);

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="flex justify-between items-center text-lg">
                    <span>Work vs. Life Balance</span>
                    <span className="text-sm font-normal text-muted-foreground">Est. Retirement: {retirementAge}y</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
                {/* Visualizer */}
                <div className="h-64 flex items-center justify-center relative bg-muted/20 rounded-xl overflow-hidden">
                    {/* Life Circle */}
                    <motion.div
                        className="absolute bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center z-10"
                        animate={{
                            width: lifeRadius * 2,
                            height: lifeRadius * 2,
                        }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <div className="text-center text-emerald-700 dark:text-emerald-300">
                            <Heart className="w-6 h-6 mx-auto mb-1 opacity-50" />
                            <span className="text-xs font-bold">Life</span>
                            <div className="text-[10px opacity-70">{(totalLifeHours / 1000).toFixed(0)}k hrs</div>
                        </div>
                    </motion.div>

                    {/* Work Circle */}
                    <motion.div
                        className="absolute bg-orange-500/80 border-2 border-orange-600 rounded-full flex items-center justify-center z-20 backdrop-blur-sm"
                        animate={{
                            width: workRadius * 2,
                            height: workRadius * 2,
                        }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <div className="text-center text-white">
                            <Briefcase className="w-4 h-4 mx-auto mb-1" />
                            <span className="text-xs font-bold">Work</span>
                            <div className="text-[10px]">{(totalWorkHours / 1000).toFixed(0)}k hrs</div>
                        </div>
                    </motion.div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span>Retirement Age</span>
                        <span className="font-bold">{retirementAge}</span>
                    </div>
                    <Slider
                        value={[retirementAge]}
                        min={Math.max(currentAge, 40)}
                        max={80}
                        step={1}
                        onValueChange={(val) => {
                            if (val && val.length > 0 && typeof val[0] === 'number') {
                                setRetirementAge(val[0]);
                            }
                        }}
                        className="w-full"
                    />
                    <p className="text-xs text-muted-foreground text-center">
                        Adjusting retirement age changes your total estimated work hours vs total life hours.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
