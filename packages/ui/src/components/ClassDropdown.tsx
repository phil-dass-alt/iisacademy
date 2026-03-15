import React from 'react';
import { clsx } from 'clsx';

const CLASSES = [8, 9, 10, 11, 12] as const;
type ClassNumber = (typeof CLASSES)[number];

interface ClassDropdownProps {
  value: ClassNumber | '';
  onChange: (cls: ClassNumber) => void;
  className?: string;
}

export function ClassDropdown({ value, onChange, className }: ClassDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value) as ClassNumber)}
      className={clsx(
        'block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
        className
      )}
    >
      <option value="">Select Class</option>
      {CLASSES.map((cls) => (
        <option key={cls} value={cls}>
          Class {cls}
        </option>
      ))}
    </select>
  );
}
