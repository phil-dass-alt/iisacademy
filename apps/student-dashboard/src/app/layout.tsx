import type { Metadata } from "next";
import { GlobalNavBar } from "@iisacademy/ui";

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
        {children}
      </body>
    </html>
  );
}
