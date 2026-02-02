/**
 * Adaptive Text Component - Fase 401-420
 * Wrapper component for age-adaptive messaging
 */

'use client';

import { adaptMessage } from '@/lib/adaptiveTone';

interface AdaptiveTextProps {
    age: number;
    message: string;
    variables?: Record<string, any>;
    className?: string;
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
}

export function AdaptiveText({
    age,
    message,
    variables,
    className = '',
    as: Component = 'p'
}: AdaptiveTextProps) {
    const adaptedMessage = adaptMessage(message, age, variables);

    return <Component className={className}>{adaptedMessage}</Component>;
}
