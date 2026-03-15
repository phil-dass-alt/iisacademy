import type { Metadata } from "next";
import { Navbar, LegalFooter } from "ui";

export const metadata: Metadata = {
  title: "Admin Panel – IIS Academy",
  description: "Platform administration for IIS Academy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f7fa" }}>
        {/* Universal navigation bar */}
        <nav
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backgroundColor: "#111827",
            borderBottom: "1px solid #374151",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "64px",
            }}
          >
            <a href="/" aria-label="IIS Academy — Home" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/IISA_logo.png"
                alt="IIS Academy"
                style={{ height: "36px", width: "auto", filter: "brightness(0) invert(1)" }}
              />
              <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>Admin Panel</span>
            </a>
            <a href="/api/auth/signout" style={{ color: "#9ca3af", fontSize: "0.875rem", textDecoration: "none" }}>
              Sign Out
            </a>
          </div>
        </nav>
        {children}

      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f7fa", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar activePage="admin" />
        <main style={{ flex: 1 }}>{children}</main>
        <LegalFooter />

      </body>
    </html>
  );
}
