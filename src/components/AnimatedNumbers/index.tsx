'use client';

import { formatPrice } from '@/utils/formatNumber';
import React, { useState, useEffect } from 'react';

interface AnimatedNumberProps {
    value:number | string | any;
}

export function AnimatedNumber({ value }:AnimatedNumberProps) {
    const [displayValue, setDisplayValue] = useState<number | any>(0);

    useEffect(() => {
        let start = 0;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime:number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            setDisplayValue(start + (value - start) * progress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [value]);

    return <span>{formatPrice(displayValue.toFixed(2))}</span>;
}