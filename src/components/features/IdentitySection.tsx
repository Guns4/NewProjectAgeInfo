import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { calculateWeton, calculateZodiac, calculateShio } from '@/lib/identity-engine';
import { IdentityCard } from './IdentityCard';
import { Calendar, Star, PawPrint } from 'lucide-react';

interface IdentitySectionProps {
    date: Date;
    className?: string;
}

export function IdentitySection({ date, className }: IdentitySectionProps) {
    const t = useTranslations('Identity');

    // Memoize calculations
    const weton = useMemo(() => calculateWeton(date), [date]);
    const zodiac = useMemo(() => calculateZodiac(date), [date]);
    const shio = useMemo(() => calculateShio(date), [date]);

    return (
        <div className={className}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Weton Card */}
                <IdentityCard
                    title={t('weton.title')}
                    value={`${weton.day} ${weton.pasaran}`}
                    subValue={`Neptu ${weton.neptu}`}
                    description={t(`weton.pasaranDesc.${weton.pasaran}`)}
                    icon={Calendar}
                    colorTheme="amber"
                    delay={0.1}
                />

                {/* Zodiac Card */}
                <IdentityCard
                    title={t('zodiac.title')}
                    value={zodiac.sign}
                    subValue={zodiac.element}
                    description={t(`zodiac.traits.${zodiac.sign}`)}
                    icon={Star}
                    colorTheme="purple"
                    delay={0.2}
                />

                {/* Shio Card */}
                <IdentityCard
                    title={t('shio.title')}
                    value={shio.animal}
                    subValue={shio.fixedElement}
                    description={t(`shio.traits.${shio.animal}`)}
                    icon={PawPrint}
                    colorTheme="rose"
                    delay={0.3}
                />
            </div>
        </div>
    );
}
