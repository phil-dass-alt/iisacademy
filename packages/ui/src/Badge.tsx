import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  className?: string;
}

export function Badge({ children, color = "#1a237e", bg = "#e8eaf6", className }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        background: bg,
        color,
        borderRadius: 100,
        padding: "0.15rem 0.6rem",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
      }}
      className={className}
    >
      {children}
    </span>
  );
}
