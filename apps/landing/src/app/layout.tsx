import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IIS Academy – Intelligence Age Enhancement Layer",
  description:
    "Bridging CBSE, ICSE, and State Board education with AI-powered enhancement layers for the Intelligence Age.",
  keywords: [
    "IIS Academy",
    "CBSE",
    "ICSE",
    "education",
    "AI learning",
    "intelligence age",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
