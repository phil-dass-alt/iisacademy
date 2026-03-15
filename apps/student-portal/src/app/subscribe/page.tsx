import Link from 'next/link';

export default function SubscribePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f7fa',
        fontFamily: 'sans-serif',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: '2.5rem',
          width: '100%',
          maxWidth: 520,
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          textAlign: 'center',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/IISA_logo.png"
          alt="IIS Academy"
          style={{ height: 48, width: 'auto', marginBottom: '1.5rem' }}
        />

        <div
          style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <p style={{ color: '#92400e', fontSize: '0.875rem', margin: 0, fontWeight: 600 }}>
            🔒 Membership Required
          </p>
          <p style={{ color: '#92400e', fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
            You need an active IIS Academy membership to access this content.
          </p>
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a237e', marginBottom: '0.5rem' }}>
          Unlock IIS Academy
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
          Get full access to Classes 8–12 content, adaptive quizzes, voice-enabled learning, and
          competitive exam preparation.
        </p>

        {/* High-5 Plan */}
        <div
          style={{
            border: '2px solid #4f46e5',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '1.5rem',
            background: '#fafafa',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: '#4f46e5',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.75rem',
              borderRadius: 999,
              marginBottom: '0.75rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            High-5 Plan
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1a237e' }}>
            ₹499{' '}
            <span style={{ fontSize: '1rem', fontWeight: 400, color: '#6b7280' }}>
              + 18% GST / 5 years
            </span>
          </div>
          <ul
            style={{
              textAlign: 'left',
              listStyle: 'none',
              padding: 0,
              margin: '1rem 0',
              color: '#374151',
              fontSize: '0.875rem',
            }}
          >
            {[
              '✅ All boards – CBSE, ICSE, Karnataka, Tamil Nadu, Kerala, AP',
              '✅ Classes 8–12 complete curriculum',
              '✅ Adaptive quizzes & AI-powered lessons',
              '✅ Voice-enabled learning',
              '✅ Competitive exam plugins (JEE / NEET)',
            ].map((item) => (
              <li key={item} style={{ padding: '0.25rem 0' }}>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://aienter.in/payments/iisacademy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              background: '#4f46e5',
              color: '#fff',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.75rem',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Subscribe Now →
          </a>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
          Already subscribed?{' '}
          <Link href="/" style={{ color: '#4f46e5' }}>
            Go to Dashboard
          </Link>
          {' · '}
          <Link href="/api/auth/signout" style={{ color: '#6b7280' }}>
            Sign Out
          </Link>
        </p>
      </div>
    </div>
  );
}
