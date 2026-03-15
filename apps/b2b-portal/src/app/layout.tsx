import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B School Portal – IIS Academy",
  description: "Custom school dashboards and institutional access for IIS Academy",
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
            backgroundColor: "#fff",
            borderBottom: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
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
            <a href="/" aria-label="IIS Academy — Home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/IISA_logo.png" alt="IIS Academy" style={{ height: "36px", width: "auto" }} />
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.875rem" }}>
              <span style={{ color: "#6b7280" }}>B2B School Portal</span>
              <a href="/api/auth/signout" style={{ color: "#6b7280", textDecoration: "none" }}>Sign Out</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
