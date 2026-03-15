import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IIS</span>
                </div>
                <div>
                  <div className="font-bold text-sm">IIS Academy</div>
                  <div className="text-xs text-gray-400">Admin Panel</div>
                </div>
              </div>
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
