import React from 'react';

interface GlobalNavBarProps {
  /** URL of the logo image. Defaults to /images/IISA_logo.png */
  logoSrc?: string;
  /** Additional nav links to show */
  navLinks?: Array<{ label: string; href: string }>;
  /** Actions (buttons) shown on the right side */
  actions?: React.ReactNode;
}

export function GlobalNavBar({
  logoSrc = '/images/IISA_logo.png',
  navLinks,
  actions,
}: GlobalNavBarProps) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 1rem',
          display: 'flex',
          alignItems: 'center',
          height: 64,
          gap: '1.5rem',
        }}
      >
        {/* Logo – top left */}
        <a href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <img
            src={logoSrc}
            alt="IIS Academy"
            style={{ height: 44, width: 'auto', objectFit: 'contain' }}
          />
        </a>

        {/* Nav links */}
        {navLinks && navLinks.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              flex: 1,
              flexWrap: 'wrap',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: 6,
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = '#f3f4f6';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#111827';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#4b5563';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Right-side actions */}
        {actions && (
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {actions}
          </div>
        )}
      </div>
    </nav>
  );
}
