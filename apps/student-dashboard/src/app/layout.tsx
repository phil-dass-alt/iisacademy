import type { Metadata } from "next";

import { GlobalNavBar } from "@iisacademy/ui";

import { Navbar, LegalFooter } from "ui";


export const metadata: Metadata = {
  title: "Student Dashboard – IIS Academy",
  description: "Your personal learning hub for Intelligence Age education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f7fa" }}>

        <GlobalNavBar
          navLinks={[
            { label: "My Courses", href: "/courses" },
            { label: "Quizzes", href: "/quiz" },
            { label: "Progress", href: "/progress" },
            { label: "Voice Lessons", href: "/voice" },
          ]}
          actions={
            <a
              href="/api/auth/signout"
              style={{
                fontSize: "0.875rem",
                color: "#4b5563",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Sign Out
            </a>
          }
        />

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
              <a href="/lessons" style={{ color: "#4b5563", textDecoration: "none" }}>My Lessons</a>
              <a href="/api/auth/signout" style={{ color: "#6b7280", textDecoration: "none" }}>Sign Out</a>
            </div>
          </div>
        </nav>

        {children}

      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f7fa", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar activePage="student" />
        <main style={{ flex: 1 }}>{children}</main>
        <LegalFooter />

      </body>
    </html>
  );
}
