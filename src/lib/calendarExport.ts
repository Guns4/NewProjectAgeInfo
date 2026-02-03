import { Milestone } from '@/hooks/useMilestones';

export const generateICS = (milestones: Milestone[]): string => {
    // Basic ICS header
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//AgeInfo.Online//Life Milestones//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

    // Process each milestone
    milestones.forEach(milestone => {
        if (!milestone.date) return;

        // Convert date to generic ISO compliant string for ICS (YYYYMMDD) or Date-time
        const date = milestone.date;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        // Use full date (all day event)
        const dateStr = `${year}${month}${day}`;

        // Unique ID
        const uid = `milestone-${milestone.type}-${milestone.target}@ageinfo.online`;

        icsContent += `BEGIN:VEVENT
DTSTART;VALUE=DATE:${dateStr}
SUMMARY:AgeInfo: ${milestone.label}
DESCRIPTION:${milestone.description}
UID:${uid}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
URL:https://ageinfo.online
END:VEVENT
`;
    });

    icsContent += 'END:VCALENDAR';
    return icsContent;
};

export const downloadICS = (icsContent: string, filename: string = 'life-milestones.ics') => {
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
