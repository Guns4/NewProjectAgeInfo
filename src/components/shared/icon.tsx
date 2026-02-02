import { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IconProps extends Omit<LucideProps, 'color'> {
    icon: LucideIcon;
    variant?: 'primary' | 'secondary' | 'accent' | 'muted' | 'foreground' | 'white' | 'destructive';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
}

const sizeMap: Record<string, string> = {
    xs: 'h-3 w-3',    // 12px
    sm: 'h-4 w-4',    // 16px
    md: 'h-5 w-5',    // 20px
    lg: 'h-6 w-6',    // 24px
    xl: 'h-8 w-8',    // 32px
    '2xl': 'h-10 w-10' // 40px
};

const colorMap: Record<string, string> = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    muted: 'text-muted-foreground',
    foreground: 'text-foreground',
    white: 'text-white',
    destructive: 'text-destructive',
};

export function Icon({
    icon: IconComponent,
    variant = 'foreground',
    size = 'md',
    className,
    strokeWidth = 1.5,
    ...props
}: IconProps) {
    const sizeClass = typeof size === 'number' ? '' : sizeMap[size];
    const sizeStyle = typeof size === 'number' ? { width: size, height: size } : undefined;

    return (
        <IconComponent
            className={cn(
                colorMap[variant],
                sizeClass,
                className
            )}
            style={sizeStyle}
            strokeWidth={strokeWidth}
            {...props}
        />
    );
}
