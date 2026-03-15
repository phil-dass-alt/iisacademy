import type { Metadata } from "next";
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
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f7fa", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar activePage="student" />
        <main style={{ flex: 1 }}>{children}</main>
        <LegalFooter />
      </body>
    </html>
  );
}
