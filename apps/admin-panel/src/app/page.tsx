export default function AdminPanelPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <h1 style={{ color: "#1a237e", fontSize: "2rem", fontWeight: 800 }}>
        ⚙️ Admin Panel
      </h1>
      <p style={{ color: "#546e7a", marginBottom: "2rem" }}>
        Platform administration — curriculum, users, analytics, and settings.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: "1.2rem" }}>
        {[
          { icon: "📚", title: "Curriculum", desc: "Manage syllabi and modules" },
          { icon: "👥", title: "Users", desc: "Students, teachers, schools" },
          { icon: "📊", title: "Analytics", desc: "Platform usage & skill tracking" },
          { icon: "🏫", title: "Schools", desc: "B2B school management" },
          { icon: "🧩", title: "Quizzes", desc: "Quiz bank & adaptive settings" },
          { icon: "🔐", title: "Auth", desc: "Access control & SSO config" },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "1.5rem",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            <span style={{ fontSize: "2rem" }}>{card.icon}</span>
            <strong style={{ color: "#1a237e" }}>{card.title}</strong>
            <span style={{ fontSize: "0.85rem", color: "#546e7a" }}>{card.desc}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
