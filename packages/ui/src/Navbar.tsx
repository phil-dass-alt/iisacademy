import React from "react";

export interface NavbarProps {
  /** Active page/app identifier for highlighting the current link */
  activePage?: "home" | "student" | "admin" | "b2b" | "terms";
}

const navbarStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 1.5rem",
  height: "64px",
  background: "#1a237e",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const logoLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  textDecoration: "none",
};

const logoImgStyle: React.CSSProperties = {
  height: "40px",
  width: "auto",
  objectFit: "contain",
};

const logoTextStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  fontWeight: 800,
  color: "#ffffff",
  letterSpacing: "0.02em",
  fontFamily: "inherit",
};

const navLinksStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

function navLinkStyle(active: boolean): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "0.4rem 0.85rem",
    fontSize: "0.9rem",
    fontWeight: active ? 700 : 500,
    color: active ? "#f57f17" : "rgba(255,255,255,0.85)",
    textDecoration: "none",
    borderRadius: "6px",
    background: active ? "rgba(245,127,23,0.12)" : "transparent",
    transition: "color 0.2s, background 0.2s",
    fontFamily: "inherit",
  };
}

export function Navbar({ activePage }: NavbarProps) {
  return (
    <nav style={navbarStyle} aria-label="Universal navigation">
      <a href="/" style={logoLinkStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/IISA_logo.png"
          alt="IIS Academy Logo"
          style={logoImgStyle}
        />
        <span style={logoTextStyle}>
          IIS <strong>Academy</strong>
        </span>
      </a>
      <ul style={navLinksStyle}>
        <li>
          <a href="/" style={navLinkStyle(activePage === "home")}>
            Home
          </a>
        </li>
        <li>
          <a
            href="/student-dashboard"
            style={navLinkStyle(activePage === "student")}
          >
            Student Dashboard
          </a>
        </li>
        <li>
          <a href="/b2b" style={navLinkStyle(activePage === "b2b")}>
            B2B Portal
          </a>
        </li>
        <li>
          <a href="/admin" style={navLinkStyle(activePage === "admin")}>
            Admin
          </a>
        </li>
        <li>
          <a href="/terms" style={navLinkStyle(activePage === "terms")}>
            Terms &amp; Conditions
          </a>
        </li>
      </ul>
    </nav>
  );
}
