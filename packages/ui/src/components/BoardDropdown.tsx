import React from 'react';
import { clsx } from 'clsx';

export type Board = 'CBSE' | 'ICSE' | 'Karnataka' | 'Tamil Nadu' | 'Kerala' | 'Andhra Pradesh';

const BOARDS: Board[] = ['CBSE', 'ICSE', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh'];

interface BoardDropdownProps {
  value: Board | '';
  onChange: (board: Board) => void;
  className?: string;
}

export function BoardDropdown({ value, onChange, className }: BoardDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Board)}
      className={clsx(
        'block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
        className
      )}
    >
      <option value="">Select Board</option>
      {BOARDS.map((board) => (
        <option key={board} value={board}>
          {board}
        </option>
      ))}
    </select>
  );
}
