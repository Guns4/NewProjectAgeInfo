/**
 * ICS Generator Utility
 * Generates standards-compliant .ics files for calendar export.
 * Features: Smart Data, Branding, Proper Escaping.
 */

import { Milestone } from '@/hooks/useMilestones';

export interface IcsEvent {
    start: Date;
    end?: Date; // Defaults to same day all-day event if simpler
    title: string;
    description: string;
    location?: string;
    url?: string;
    uid?: string;
}

const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

const escapeText = (text: string): string => {
    return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
};

export const generateICSEvent = (event: IcsEvent): string => {
    const now = formatDate(new Date());
    // If no end date, assume 1 hour duration or all day?
    // For milestones, usually all day value=DATE is better, but let's stick to standard DTSTART/DTEND for broad compatibility
    // Or just DTSTART;VALUE=DATE for all-day.

    const isAllDay = !event.end;

    // Format dates
    const startStr = isAllDay
        ? `${event.start.getFullYear()}${String(event.start.getMonth() + 1).padStart(2, '0')}${String(event.start.getDate()).padStart(2, '0')}`
        : formatDate(event.start);

    // For all day, end date is usually exclusive (next day)
    let endStr = '';
    if (isAllDay) {
        const nextDay = new Date(event.start);
        nextDay.setDate(nextDay.getDate() + 1);
        endStr = `${nextDay.getFullYear()}${String(nextDay.getMonth() + 1).padStart(2, '0')}${String(nextDay.getDate()).padStart(2, '0')}`;
    } else if (event.end) {
        endStr = formatDate(event.end);
    }

    const uid = event.uid || `event-${Math.random().toString(36).substr(2, 9)}@ageinfo.online`;

    let eventBlock = `BEGIN:VEVENT
DTSTART${isAllDay ? ';VALUE=DATE' : ''}:${startStr}
DTEND${isAllDay ? ';VALUE=DATE' : ''}:${endStr}
DTSTAMP:${now}
UID:${uid}
SUMMARY:${escapeText(event.title)}
DESCRIPTION:${escapeText(event.description + '\n\nPowered by AgeInfo.online')}
URL:${event.url || 'https://ageinfo.online'}
`;

    if (event.location) {
        eventBlock += `LOCATION:${escapeText(event.location)}\n`;
    }

    eventBlock += `END:VEVENT`;
    return eventBlock;
};

export const generateICS = (events: IcsEvent[]): string => {
    let content = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AgeInfo.Online//Life Milestones//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

    events.forEach(event => {
        content += generateICSEvent(event);
        content += '\n';
    });

    content += 'END:VCALENDAR';
    return content;
};

// Helper mapper for Milestones
export const mapMilestoneToEvent = (milestone: Milestone): IcsEvent | null => {
    if (!milestone.date) return null;
    return {
        start: milestone.date,
        title: `AgeInfo: ${milestone.label}`,
        description: milestone.description,
        uid: `milestone-${milestone.type}-${milestone.target}@ageinfo.online`,
        url: 'https://ageinfo.online'
    };
};

export const downloadICSFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
