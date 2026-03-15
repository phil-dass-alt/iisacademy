import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';

export const metadata: Metadata = {
  title: 'IIS Academy – Student Portal',
  description: 'Your personalized learning dashboard for Classes 8–12.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen font-sans">
        {/* Universal navigation bar — IISA_logo.png top-left */}
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
            <Link href="/" aria-label="IIS Academy — Home" className="flex items-center">
              <Image
                src="/images/IISA_logo.png"
                alt="IIS Academy"
                width={120}
                height={36}
                style={{ height: '36px', width: 'auto' }}
                priority
              />
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-gray-600 hover:text-indigo-700 transition-colors">Dashboard</Link>
              <Link href="/pricing" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">₹5999 + GST</Link>
              <Link href="/api/auth/signout" className="text-gray-500 hover:text-red-600 transition-colors">Sign Out</Link>
            </div>
          </div>
        </nav>
        {children}
        {/* Footer legal disclaimer */}
        <footer className="mt-16 border-t border-gray-200 bg-white py-6 px-4 text-center text-xs text-gray-400">
          © IIS Academy {new Date().getFullYear()} ·{' '}
          <Link href="/legal/terms" className="underline hover:text-gray-600">Terms &amp; Conditions</Link>
          {' '}·{' '}
          <span>© Textbook content belongs to respective board authorities. IIS Academy provides supplementary enhancement content only.</span>
        </footer>
      </body>
    </html>
  );
}
