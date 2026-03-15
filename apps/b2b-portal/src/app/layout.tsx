import type { Metadata } from "next";
import { Navbar, LegalFooter } from "ui";

export const metadata: Metadata = {
  title: "B2B School Portal – IIS Academy",
  description: "Custom school dashboards and institutional access for IIS Academy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f7fa", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar activePage="b2b" />
        <main style={{ flex: 1 }}>{children}</main>
        <LegalFooter />
      </body>
    </html>
  );
}
