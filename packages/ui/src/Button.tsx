import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

const styles: Record<string, React.CSSProperties> = {
  base: {
    display: "inline-block",
    fontFamily: "inherit",
    fontWeight: 700,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "opacity 0.2s",
  },
  primary: { background: "#1a237e", color: "#fff" },
  secondary: { background: "#f57f17", color: "#fff" },
  ghost: { background: "transparent", color: "#1a237e", border: "1.5px solid #1a237e" },
  sm: { padding: "0.3rem 0.75rem", fontSize: "0.8rem" },
  md: { padding: "0.6rem 1.4rem", fontSize: "0.95rem" },
  lg: { padding: "0.85rem 2rem", fontSize: "1rem" },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  disabled,
  className,
}: ButtonProps) {
  const style = { ...styles.base, ...styles[variant], ...styles[size] };

  if (href) {
    return (
      <a href={href} style={style} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button
      style={style}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}
