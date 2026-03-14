import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
}

export function Card({
  children,
  className,
  padding = 'md',
  shadow = 'md',
  border = true,
  hover = false,
}: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl',
        {
          'p-0': padding === 'none',
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
          'shadow-none': shadow === 'none',
          'shadow-sm': shadow === 'sm',
          'shadow-md': shadow === 'md',
          'shadow-lg': shadow === 'lg',
          'border border-gray-200': border,
          'hover:shadow-lg transition-shadow duration-200 cursor-pointer': hover,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
