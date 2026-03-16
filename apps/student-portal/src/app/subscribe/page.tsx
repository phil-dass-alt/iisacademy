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
          maxWidth: 560,
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
            marginBottom: '1rem',
          }}
        >
          <p style={{ color: '#92400e', fontSize: '0.875rem', margin: 0, fontWeight: 600 }}>
            🔒 Membership Required
          </p>
          <p style={{ color: '#92400e', fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
            You need an active IIS Academy membership to access this content.
          </p>
        </div>

        {/* Inaugural offer banner */}
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #6ee7b7',
            borderRadius: 8,
            padding: '0.6rem 1rem',
            marginBottom: '1.5rem',
          }}
        >
          <p style={{ color: '#065f46', fontSize: '0.8125rem', margin: 0, fontWeight: 500 }}>
            🎉 <strong>Inaugural Offer</strong> — Valid until April 30, 2026. Prices per student, per academic year.
          </p>
        </div>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a237e', marginBottom: '0.5rem' }}>
          Unlock IIS Academy
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
          Get full access to Classes 8–12 content, adaptive quizzes, voice-enabled learning, and
          competitive exam preparation.
        </p>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Single Class Plan */}
          <div
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: '1.25rem',
              background: '#fafafa',
              textAlign: 'left',
            }}
          >
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.25rem', fontWeight: 600, textTransform: 'uppercase' }}>
              Single Class
            </p>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a237e' }}>
              ₹499
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0 0' }}>
              + GST: ₹89.82
            </p>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', margin: '0.25rem 0 0.75rem' }}>
              Total: ₹588.82
            </p>
            <a
              href="https://aienter.in/payments/iisacademy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: '#4f46e5',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.875rem',
                padding: '0.6rem',
                borderRadius: 8,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Enrol →
            </a>
          </div>

          {/* All Five Classes Bundle */}
          <div
            style={{
              border: '2px solid #4f46e5',
              borderRadius: 12,
              padding: '1.25rem',
              background: '#fafafa',
              textAlign: 'left',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#4f46e5',
                color: '#fff',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: 999,
                whiteSpace: 'nowrap',
              }}
            >
              BEST VALUE
            </span>
            <p style={{ fontSize: '0.75rem', color: '#4f46e5', margin: '0 0 0.25rem', fontWeight: 600, textTransform: 'uppercase' }}>
              All 5 Classes
            </p>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a237e' }}>
              ₹1,999
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.25rem 0 0' }}>
              + GST: ₹359.82
            </p>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', margin: '0.25rem 0 0.75rem' }}>
              Total: ₹2,358.82
            </p>
            <a
              href="https://aienter.in/payments/iisacademy2"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: '#4f46e5',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.875rem',
                padding: '0.6rem',
                borderRadius: 8,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Enrol →
            </a>
          </div>
        </div>

        <ul
          style={{
            textAlign: 'left',
            listStyle: 'none',
            padding: 0,
            margin: '0 0 1.5rem',
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
