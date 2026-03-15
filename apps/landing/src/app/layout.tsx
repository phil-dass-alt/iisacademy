
import type { Metadata } from "next";
import { Navbar } from "ui";
import "./globals.css";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: 'IIS Academy – Intelligence Age Enhancement Layer for CBSE, ICSE & State Boards',
  description:
    'IIS Academy provides AI-enhanced learning for students of Classes 8-12 across CBSE, ICSE, Karnataka, Tamil Nadu, Kerala, and Andhra Pradesh boards. Join the High-5 membership at ₹499/year.',
  keywords: 'IIS Academy, CBSE, ICSE, Karnataka State Board, Tamil Nadu Board, online learning, Class 8 to 12, AI tutoring',
  openGraph: {
    title: 'IIS Academy – Intelligence Age Enhancement Layer',
    description: 'AI-powered learning for Classes 8-12 across all major boards. ₹499/year.',
    siteName: 'IIS Academy',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar activePage="home" />
        {children}
      </body>

      <body className={inter.className}>{children}</body>

    </html>
  );
}
