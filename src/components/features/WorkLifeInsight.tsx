'use client';

import * as React from 'react';
import { Palmtree } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { calculateHolidaysLived } from '@/lib/productivityLogic';

interface WorkLifeInsightProps {
    birthDate: Date;
}

export function WorkLifeInsight({ birthDate }: WorkLifeInsightProps) {
    const holidaysLived = React.useMemo(() => calculateHolidaysLived(birthDate), [birthDate]);

    return (
        <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-900/20 border-orange-100 dark:border-orange-800/30 overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-white dark:bg-card rounded-full shadow-sm shrink-0">
                    <Palmtree className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Work-Life Balance Insight
                    </h3>
                    <p className="text-lg font-bold text-foreground mt-1">
                        You have lived through approximately <span className="text-orange-600 dark:text-orange-400 text-xl">{holidaysLived.toLocaleString()}</span> national holidays since you were born.
                    </p>
                    <p className="text-xs text-muted-foreground/80 mt-1">
                        That's a lot of opportunities for rest and celebration! 🏖️
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
