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
    </main>
  );
}
