"use client";
import React, { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavBarProps {
  /** Navigation links to display */
  items?: NavItem[];
  /** Additional action buttons/links rendered on the right */
  actions?: React.ReactNode;
  /** Override the default logo href (default: '/') */
  logoHref?: string;
  /** Override the default logo alt text */
  logoAlt?: string;
}

/**
 * Universal navigation bar used across all IIS Academy apps.
 * Renders IISA_logo.png on the left, navigation links in the centre, and action buttons on the right.
 * Responsive: collapses to a hamburger menu on mobile.
 */
export function NavBar({ items = [], actions, logoHref = '/', logoAlt = 'IIS Academy' }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo — always top left */}
        <a
          href={logoHref}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            textDecoration: 'none',
          }}
          aria-label="IIS Academy — Home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/IISA_logo.png"
            alt={logoAlt}
            style={{ height: '36px', width: 'auto', display: 'block' }}
          />
        </a>

        {/* Desktop navigation links */}
        {items.length > 0 && (
          <div
            className="iisa-nav-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              flex: 1,
              marginLeft: '2rem',
            }}
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'background 0.15s, color 0.15s',
                  backgroundColor: item.active ? '#eef2ff' : 'transparent',
                  color: item.active ? '#4338ca' : '#4b5563',
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}

        {/* Desktop actions */}
        {actions && (
          <div
            className="iisa-nav-actions"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '1rem' }}
          >
            {actions}
          </div>
        )}

        {/* Mobile hamburger */}
        {items.length > 0 && (
          <button
            className="iisa-nav-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#374151',
              marginLeft: '1rem',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && items.length > 0 && (
        <div
          style={{
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#fff',
            padding: '0.75rem 1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                backgroundColor: item.active ? '#eef2ff' : 'transparent',
                color: item.active ? '#4338ca' : '#374151',
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {actions && (
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Responsive styles injected inline for zero external dependency */}
      <style>{`
        @media (max-width: 768px) {
          .iisa-nav-desktop { display: none !important; }
          .iisa-nav-actions { display: none !important; }
          .iisa-nav-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
