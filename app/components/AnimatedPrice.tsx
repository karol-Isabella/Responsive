'use client';

import { useState, useEffect } from 'react';

interface AnimatedPriceProps {
  value: number;
}

// Componente de animación de número (contador)
export function AnimatedPrice({ value }: AnimatedPriceProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 600;
    const steps = 30;
    const stepDuration = duration / steps;
    const increment = value / steps;

    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [value]);

  return <span>{displayValue}</span>;
}
