/**
 * Adaptive Tone System - Fase 401-420
 * Age-appropriate messaging with dynamic tone adjustment
 */

export interface ToneProfile {
    ageGroup: string;
    tone: string;
    emoji: string[];
    greetings: {
        morning: string[];
        afternoon: string[];
        evening: string[];
    };
    transitions: string[];
    statDescriptions: {
        heartbeat: string;
        breath: string;
        sleep: string;
        dreams: string;
    };
    milestonePrefix: string[];
    cosmicIntro: string[];
}

/**
 * Get tone profile based on age
 */
export function getToneProfile(age: number): ToneProfile {
    // Children (0-12): Cheerful, playful
    if (age <= 12) {
        return {
            ageGroup: 'children',
            tone: 'cheerful',
            emoji: ['🎉', '✨', '🌟', '🎈', '🚀', '🎨'],
            greetings: {
                morning: ['Selamat pagi! 🌅', 'Pagi yang cerah! ☀️', 'Hai! Pagi ini seru! 🎈'],
                afternoon: ['Siang yang menyenangkan! 🌞', 'Halo! Siang ini asyik! ✨', 'Hai! Hari ini keren! 🎉'],
                evening: ['Selamat sore! 🌆', 'Sore yang indah! 🌇', 'Halo! Sore ini bagus! 🌟'],
            },
            transitions: ['Wah!', 'Keren!', 'Hebat!', 'Asyik!', 'Seru!'],
            statDescriptions: {
                heartbeat: 'Jantungmu sudah berdenyut dengan semangat',
                breath: 'Kamu sudah bernapas dengan penuh energi',
                sleep: 'Kamu sudah tidur nyenyak untuk tumbuh besar',
                dreams: 'Kamu sudah bermimpi indah',
            },
            milestonePrefix: ['Wah! Sebentar lagi', 'Keren! Dalam waktu dekat', 'Hebat! Nggak lama lagi'],
            cosmicIntro: ['Perjalanan kosmikmu sangat seru! 🚀', 'Petualangan luar angkasamu keren banget! ✨'],
        };
    }

    // Teens (13-17): Energetic, cool
    if (age <= 17) {
        return {
            ageGroup: 'teens',
            tone: 'energetic',
            emoji: ['🚀', '⚡', '🔥', '💫', '🎯', '✨'],
            greetings: {
                morning: ['Good morning! ☀️', 'Yo! Morning vibes! 🌅', 'Pagi yang mantap! 💪'],
                afternoon: ['Afternoon check! ⚡', 'Siang yang produktif! 🎯', 'Siang ini on fire! 🔥'],
                evening: ['Evening mood! 🌆', 'Sore yang chill! ✨', 'Malam datang! 🌙'],
            },
            transitions: ['Mantap!', 'Kece!', 'Solid!', 'Epic!', 'Awesome!'],
            statDescriptions: {
                heartbeat: 'Jantungmu udah berdenyut dengan penuh semangat',
                breath: 'Napasmu mengiringi setiap petualangan',
                sleep: 'Kamu recharge energi untuk esok hari',
                dreams: 'Mimpi-mimpimu penuh ambisi',
            },
            milestonePrefix: ['Coming up!', 'Sebentar lagi nih', 'Get ready!'],
            cosmicIntro: ['Journey kosmikmu luar biasa! 🚀', 'Perjalanan through the cosmos! ⚡'],
        };
    }

    // Young Adults (18-35): Inspirational, achiever
    if (age <= 35) {
        return {
            ageGroup: 'youngAdults',
            tone: 'inspirational',
            emoji: ['💪', '🎯', '🌟', '📈', '🚀'],
            greetings: {
                morning: ['Selamat pagi! 🌅', 'Pagi yang produktif! ☀️', 'Mulai hari dengan semangat! 💪'],
                afternoon: ['Selamat siang! 🌞', 'Terus berkarya! 🎯', 'Siang yang penuh potensi! 📈'],
                evening: ['Selamat sore! 🌆', 'Refleksikan pencapaian! 🌟', 'Sore untuk evaluasi! ✨'],
            },
            transitions: ['Luar biasa!', 'Mengesankan!', 'Inspiratif!', 'Powerful!'],
            statDescriptions: {
                heartbeat: 'Jantungmu berdenyut dengan tekad yang kuat',
                breath: 'Setiap napas adalah langkah menuju tujuan',
                sleep: 'Istirahat yang berkualitas untuk produktivitas maksimal',
                dreams: 'Mimpi-mimpimu menjadi visi masa depan',
            },
            milestonePrefix: ['Segera kamu akan mencapai', 'Dalam waktu dekat', 'Menuju tonggak penting'],
            cosmicIntro: ['Perjalanan kosmikmu mencerminkan ambisimu', 'Jejak kosmikmu menginspirasi'],
        };
    }

    // Adults (36-55): Balanced, wise
    if (age <= 55) {
        return {
            ageGroup: 'adults',
            tone: 'balanced',
            emoji: ['🌿', '⚖️', '🎯', '💡', '🌟'],
            greetings: {
                morning: ['Selamat pagi 🌅', 'Pagi yang bermakna ☀️', 'Memulai hari dengan bijak 🌿'],
                afternoon: ['Selamat siang 🌞', 'Siang yang seimbang ⚖️', 'Tetap fokus pada tujuan 🎯'],
                evening: ['Selamat sore 🌆', 'Waktu refleksi 🌟', 'Sore untuk introspeksi 💭'],
            },
            transitions: ['Dengan pengalaman', 'Melalui perjalanan', 'Dengan kebijaksanaan'],
            statDescriptions: {
                heartbeat: 'Jantungmu telah berdenyut dengan kearifan',
                breath: 'Napas kehidupan yang penuh makna',
                sleep: 'Istirahat yang mengisi ulang energi dan pikiran',
                dreams: 'Mimpi-mimpi yang matang dan bermakna',
            },
            milestonePrefix: ['Dengan fondasi yang kuat, kamu akan', 'Pengalaman membawa kamu ke', 'Tonggak berikutnya menanti'],
            cosmicIntro: ['Perjalanan kosmikmu adalah bukti ketahanan', 'Jejak kosmikmu penuh makna'],
        };
    }

    // Elderly (56-70): Reflective, appreciative
    if (age <= 70) {
        return {
            ageGroup: 'elderly',
            tone: 'reflective',
            emoji: ['🌺', '🍃', '🌅', '💫', '🙏'],
            greetings: {
                morning: ['Selamat pagi yang indah 🌅', 'Pagi yang penuh berkah ☀️', 'Pagi yang bermakna 🌺'],
                afternoon: ['Siang yang hangat 🌞', 'Siang penuh apresiasi 🙏', 'Siang yang damai 🍃'],
                evening: ['Sore yang tenang 🌆', 'Sore penuh syukur 🌅', 'Sore yang reflektif 💫'],
            },
            transitions: ['Dengan penuh syukur', 'Merefleksikan perjalanan', 'Menghargai setiap momen'],
            statDescriptions: {
                heartbeat: 'Setiap detak jantung adalah anugerah yang berharga',
                breath: 'Napas kehidupan yang penuh rasa syukur',
                sleep: 'Istirahat yang memberikan kedamaian',
                dreams: 'Mimpi-mimpi yang penuh kebijaksanaan hidup',
            },
            milestonePrefix: ['Perjalanan indah terus berlanjut', 'Warisan makna terus tumbuh', 'Setiap tonggak adalah berkah'],
            cosmicIntro: ['Perjalanan kosmikmu adalah warisan yang indah', 'Jejak kosmikmu penuh makna dan apresiasi'],
        };
    }

    // Seniors (70+): Deeply reflective, wisdom
    return {
        ageGroup: 'seniors',
        tone: 'wisdom',
        emoji: ['🌸', '🕊️', '🌟', '💎', '🙏'],
        greetings: {
            morning: ['Pagi yang penuh berkah 🌅', 'Selamat pagi yang bermakna ☀️', 'Pagi yang damai 🌸'],
            afternoon: ['Siang yang hangat dan tenang 🌞', 'Siang penuh kebijaksanaan 💎', 'Siang yang penuh hikmat 🙏'],
            evening: ['Sore yang penuh kedamaian 🌆', 'Sore yang reflektif 🌟', 'Sore penuh syukur 🕊️'],
        },
        transitions: ['Dengan kebijaksanaan', 'Melalui pengalaman panjang', 'Dengan hati yang penuh syukur'],
        statDescriptions: {
            heartbeat: 'Setiap detak adalah harta karun pengalaman yang tak ternilai',
            breath: 'Napas kehidupan yang membawa kebijaksanaan',
            sleep: 'Istirahat yang penuh kedamaian dan ketenangan',
            dreams: 'Mimpi-mimpi yang berisi kebijaksanaan seumur hidup',
        },
        milestonePrefix: ['Warisan indah terus tumbuh', 'Setiap tonggak adalah pengalaman berharga', 'Perjalanan bermakna berlanjut'],
        cosmicIntro: ['Jejak kosmikmu adalah warisan kebijaksanaan', 'Perjalanan kosmikmu penuh makna kehidupan'],
    };
}

/**
 * Get contextual greeting based on age and time of day
 */
export function getContextualGreeting(age: number, timeOfDay: 'morning' | 'afternoon' | 'evening' = 'morning'): string {
    const profile = getToneProfile(age);
    const greetings = profile.greetings[timeOfDay];
    return greetings[Math.floor(Math.random() * greetings.length)] || greetings[0];
}

/**
 * Get time of day based on current hour
 */
export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
}

/**
 * Adapt message with age-appropriate tone
 */
export function adaptMessage(template: string, age: number, variables?: Record<string, any>): string {
    const profile = getToneProfile(age);
    let message = template;

    // Replace variables if provided
    if (variables) {
        Object.keys(variables).forEach(key => {
            message = message.replace(new RegExp(`{${key}}`, 'g'), variables[key].toString());
        });
    }

    // Add random emoji for children and teens
    if (age <= 17 && profile.emoji.length > 0) {
        const randomEmoji = profile.emoji[Math.floor(Math.random() * profile.emoji.length)];
        if (!message.includes(randomEmoji)) {
            message += ` ${randomEmoji}`;
        }
    }

    return message;
}

/**
 * Get random transition phrase
 */
export function getTransition(age: number): string {
    const profile = getToneProfile(age);
    return profile.transitions[Math.floor(Math.random() * profile.transitions.length)] || "Loading...";
}

/**
 * Get stat description by type
 */
export function getStatDescription(age: number, statType: 'heartbeat' | 'breath' | 'sleep' | 'dreams'): string {
    const profile = getToneProfile(age);
    return profile.statDescriptions[statType];
}

/**
 * Get milestone prefix
 */
export function getMilestonePrefix(age: number): string {
    const profile = getToneProfile(age);
    return profile.milestonePrefix[Math.floor(Math.random() * profile.milestonePrefix.length)] || "";
}

/**
 * Get cosmic intro
 */
export function getCosmicIntro(age: number): string {
    const profile = getToneProfile(age);
    return profile.cosmicIntro[Math.floor(Math.random() * profile.cosmicIntro.length)] || "";
}
