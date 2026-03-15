import styles from "./ThreeWings.module.css";

const wings = [
  {
    id: "junior",
    name: "Junior Wing",
    classes: "Classes 6–8",
    description:
      "Foundation building with curiosity-driven enhancement modules. Math puzzles, science explorations, and language skills supercharged with AI storytelling.",
    features: [
      "Financial Literacy basics",
      "Science experiments (AI-guided)",
      "Creative writing with AI",
      "Coding fundamentals",
    ],
    color: "#e65100",
    icon: "🌱",
    gradient: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
  },
  {
    id: "senior",
    name: "Senior Wing",
    classes: "Classes 9–12",
    description:
      "Deep enhancement for board exam subjects—Physics, Chemistry, Math, Biology—layered with real-world applications and career-readiness skills.",
    features: [
      "AI Circuits (Physics+)",
      "BioTech & Genomics",
      "Financial Mathematics",
      "Engineering Pathways",
    ],
    color: "#1a237e",
    icon: "🚀",
    gradient: "linear-gradient(135deg, #e8eaf6, #c5cae9)",
  },
  {
    id: "university",
    name: "University Wing",
    classes: "UG / PG (Coming Soon)",
    description:
      "Bridge the gap between academics and industry. Research skills, entrepreneurship, and advanced AI integration for university-level learners.",
    features: [
      "Research Methodology+",
      "Entrepreneurship Layer",
      "Advanced AI Applications",
      "Industry Project Modules",
    ],
    color: "#4a148c",
    icon: "🎓",
    gradient: "linear-gradient(135deg, #f3e5f5, #e1bee7)",
    comingSoon: true,
  },
];

export default function ThreeWings() {
  return (
    <section id="wings" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Three Learning Wings</h2>
          <p className={styles.sectionSubtitle}>
            Structured enhancement pathways from foundational to advanced
            learning
          </p>
        </div>
        <div className={styles.wingGrid}>
          {wings.map((wing) => (
            <div
              key={wing.id}
              className={styles.wingCard}
              style={{ background: wing.gradient }}
            >
              {wing.comingSoon && (
                <span className={styles.comingSoon}>Coming Soon</span>
              )}
              <div className={styles.wingIcon}>{wing.icon}</div>
              <h3 className={styles.wingName} style={{ color: wing.color }}>
                {wing.name}
              </h3>
              <span className={styles.wingClasses}>{wing.classes}</span>
              <p className={styles.wingDesc}>{wing.description}</p>
              <ul className={styles.featureList}>
                {wing.features.map((f) => (
                  <li key={f} className={styles.featureItem}>
                    <span style={{ color: wing.color }}>✦</span> {f}
                  </li>
                ))}
              </ul>
              {!wing.comingSoon && (
                <a
                  href={`/wings/${wing.id}`}
                  className={styles.wingCta}
                  style={{ background: wing.color }}
                >
                  Enter {wing.name} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
