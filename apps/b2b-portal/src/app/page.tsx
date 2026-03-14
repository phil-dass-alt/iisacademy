export default function B2BPortalPage() {
  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ color: "#1a237e", fontSize: "2.5rem", fontWeight: 900 }}>
          🏫 B2B School Portal
        </h1>
        <p style={{ color: "#546e7a", fontSize: "1.1rem", maxWidth: 540, margin: "1rem auto" }}>
          Custom dashboards, analytics, and Intelligence Age enhancement modules
          for schools and educational institutions.
        </p>
        <a
          href="/contact"
          style={{
            background: "#f57f17",
            color: "#fff",
            padding: "0.8rem 2rem",
            borderRadius: 8,
            fontWeight: 700,
            display: "inline-block",
            marginTop: "1rem",
          }}
        >
          Request School Access
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "1.2rem" }}>
        {[
          { icon: "📊", title: "School Analytics", desc: "Track student progress across classes and subjects" },
          { icon: "📚", title: "Custom Curriculum", desc: "Whitelist modules specific to your school's needs" },
          { icon: "👩‍🏫", title: "Teacher Tools", desc: "Assign modules, quizzes, and track performance" },
          { icon: "🔐", title: "SSO Integration", desc: "Single sign-on with your school's identity provider" },
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
