export default function StudentDashboardPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ color: "#1a237e", fontSize: "2rem", fontWeight: 800 }}>
        📚 Student Dashboard
      </h1>
      <p style={{ color: "#546e7a", marginBottom: "2rem" }}>
        Welcome back! Continue your Intelligence Age learning journey.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "1.2rem" }}>
        {[
          { icon: "📘", title: "My Courses", desc: "Continue where you left off", href: "/courses" },
          { icon: "🧠", title: "Adaptive Quiz", desc: "Take today's skill quiz", href: "/quiz" },
          { icon: "🎙️", title: "Voice Lessons", desc: "AI-powered audio lessons", href: "/voice" },
          { icon: "📊", title: "My Progress", desc: "Skill tracking & badges", href: "/progress" },
        ].map((card) => (
          <a
            key={card.title}
            href={card.href}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "1.5rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.2s",
            }}
          >
            <span style={{ fontSize: "2rem" }}>{card.icon}</span>
            <strong style={{ color: "#1a237e" }}>{card.title}</strong>
            <span style={{ fontSize: "0.85rem", color: "#546e7a" }}>{card.desc}</span>
          </a>
        ))}
      </div>

      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={{ color: "#1a237e", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          🏫 Junior Wing — Classes 8–10
        </h2>
        <p style={{ color: "#546e7a", marginBottom: "1.2rem", fontSize: "0.95rem" }}>
          Full content live for Classes 8–10 across CBSE and Karnataka State Board (KSEAB).
          AI Enhancement lessons, adaptive quizzes, and practical add-ons for Science, Math,
          Social Science, and English.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: "1rem" }}>
          {[
            {
              icon: "🇮🇳",
              board: "CBSE – Classes 8, 9 & 10",
              badge: "Full Content Live",
              desc: "Science · Math · Social Science · English — AI Enhancement lessons + adaptive quizzes for all 3 classes.",
              href: "/junior/cbse",
              color: "#e8f5e9",
              badgeColor: "#2e7d32",
            },
            {
              icon: "🌺",
              board: "Karnataka (KSEAB) – Classes 8, 9 & 10",
              badge: "Full Content Live",
              desc: "Science · Math · Social Science · English — Intelligence Age enhancements for all 3 classes.",
              href: "/junior/kseab",
              color: "#fff3e0",
              badgeColor: "#e65100",
            },
            {
              icon: "📖",
              board: "ICSE",
              badge: "Coming Soon",
              desc: "High-vocabulary and detailed theory add-ons. Launching next batch.",
              href: "#",
              color: "#f3f4f6",
              badgeColor: "#78909c",
            },
            {
              icon: "🌴",
              board: "Tamil Nadu (TNSCERT)",
              badge: "Coming Soon",
              desc: "Strong Information Age foundation from TNSCERT syllabus.",
              href: "#",
              color: "#f3f4f6",
              badgeColor: "#78909c",
            },
            {
              icon: "🌿",
              board: "Kerala (SCERT)",
              badge: "Coming Soon",
              desc: "Eco-friendly and Sustainable AI applications.",
              href: "#",
              color: "#f3f4f6",
              badgeColor: "#78909c",
            },
          ].map((item) => (
            <a
              key={item.board}
              href={item.href}
              style={{
                background: item.color,
                borderRadius: 8,
                padding: "1.2rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
                textDecoration: "none",
                color: "inherit",
                opacity: item.href === "#" ? 0.7 : 1,
                cursor: item.href === "#" ? "default" : "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                <strong style={{ color: "#1a237e", fontSize: "0.95rem" }}>{item.board}</strong>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: item.badgeColor,
                    background: "#fff",
                    borderRadius: 4,
                    padding: "2px 7px",
                    border: `1px solid ${item.badgeColor}`,
                  }}
                >
                  {item.badge}
                </span>
              </div>
              <span style={{ fontSize: "0.82rem", color: "#546e7a" }}>{item.desc}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Copyright disclaimer */}
      <section
        style={{
          marginTop: "2rem",
          background: "#fff8e1",
          borderRadius: 8,
          padding: "1rem 1.2rem",
          borderLeft: "4px solid #f59e0b",
        }}
      >
        <p style={{ fontSize: "0.78rem", color: "#78350f", margin: 0, lineHeight: 1.6 }}>
          © Textbook content belongs exclusively to its respective authors and authorities.
          Lessons here are provided solely as enhancement. It is assumed that students have
          purchased the official textbooks and have a legitimate right to study from them. IIS
          Academy only delivers supplementary content and does not reproduce copyrighted material
          without license.
        </p>
      </section>

      <section
        style={{
          marginTop: "2.5rem",
          background: "#e8eaf6",
          borderRadius: 8,
          padding: "1.2rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <strong style={{ color: "#1a237e", display: "block", marginBottom: "0.3rem" }}>
            🔒 Unlock Full Access
          </strong>
          <span style={{ color: "#546e7a", fontSize: "0.88rem" }}>
            The High-5 Membership — ₹499 + GST / 5 years. Full access to all boards, classes,
            subjects, Voice-AI Tutor, and Monthly Future-Skill Masterclasses.
          </span>
        </div>
        <a
          href="https://aienter.in/payments/iisacademy"
          style={{
            background: "#1a237e",
            color: "#fff",
            borderRadius: 6,
            padding: "0.65rem 1.4rem",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            whiteSpace: "nowrap",
          }}
        >
          Join the Intelligence Age →
        </a>
      </section>
    </main>
  );
}
