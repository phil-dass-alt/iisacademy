import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GlobalNavBar } from '@iisacademy/ui';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IIS Academy – Admin Panel',
  description: 'IIS Academy administration dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        {/* Universal navigation bar */}
        <GlobalNavBar
          navLinks={[
            { label: '📊 Dashboard', href: '/' },
            { label: '👥 Users', href: '/users' },
            { label: '📚 Content', href: '/content' },
            { label: '📈 Analytics', href: '/analytics' },
          ]}
          actions={
            <a href="/api/auth/signout" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              Sign Out
            </a>
          }
        />
        <div className="flex" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <a href="/" className="flex items-center gap-2 no-underline">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/IISA_logo.png" alt="IIS Academy" className="h-8 w-auto brightness-0 invert" />
                <div>
                  <div className="font-bold text-sm text-white">IIS Academy</div>
                  <div className="text-xs text-gray-400">Admin Panel</div>
                </div>
              </a>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {[
                { href: '/', label: '📊 Dashboard' },
                { href: '/users', label: '👥 Users' },
                { href: '/content', label: '📚 Content' },
                { href: '/subscriptions', label: '💳 Subscriptions' },
                { href: '/analytics', label: '📈 Analytics' },
                { href: '/schools', label: '🏫 Schools (B2B)' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
              <a href="/api/auth/signout" className="text-xs text-gray-400 hover:text-white">Sign Out</a>
            </div>
          </aside>
          {/* Main */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
