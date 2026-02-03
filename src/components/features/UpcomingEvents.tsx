'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUpcomingHolidays, UpcomingEvent } from '@/lib/eventUtils';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function UpcomingEvents() {
    const [events, setEvents] = React.useState<UpcomingEvent[]>([]);

    React.useEffect(() => {
        setEvents(getUpcomingHolidays(3));
    }, []);

    const handleRemindMe = async (event: UpcomingEvent) => {
        if (!("Notification" in window)) {
            toast.error("Browser does not support desktop notification");
            return;
        }

        if (Notification.permission === "granted") {
            new Notification(`Reminder set for ${event.name}! 📅`);
            toast.success(`Reminder set for ${event.name}`);
        } else if (Notification.permission !== "denied") {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                new Notification(`Reminder set for ${event.name}! 📅`);
                toast.success(`Reminder set for ${event.name}`);
            }
        }
    };

    if (events.length === 0) return null;

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Upcoming Events
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {events.map((event, index) => (
                    <motion.div
                        key={event.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className={cn(
                            "overflow-hidden border-l-4 hover:shadow-md transition-all",
                            event.daysUntil === 0 ? "border-l-red-500 bg-red-50/10" : "border-l-primary"
                        )}>
                            <CardContent className="p-4 flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                                        {event.date}
                                    </span>
                                    {event.isNational && (
                                        <span className="text-[10px] bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full">
                                            National
                                        </span>
                                    )}
                                </div>

                                <h4 className="font-bold text-sm md:text-base line-clamp-1" title={event.name}>
                                    {event.name}
                                </h4>

                                <div className="flex items-center justify-between mt-1">
                                    <span className={cn(
                                        "text-xs font-bold",
                                        event.daysUntil === 0 ? "text-red-500" : "text-primary"
                                    )}>
                                        {event.daysUntil === 0 ? "Today!" : `${event.daysUntil} days left`}
                                    </span>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6 rounded-full hover:bg-primary/10 hover:text-primary"
                                        onClick={() => handleRemindMe(event)}
                                        title="Set Reminder"
                                    >
                                        <Bell className="w-3 h-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
