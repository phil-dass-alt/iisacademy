import React from "react";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className, style }: CardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        padding: "1.5rem",
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
