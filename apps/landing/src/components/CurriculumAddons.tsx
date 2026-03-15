import styles from "./CurriculumAddons.module.css";

const addons = [
  {
    subject: "Mathematics",
    addon: "Financial Literacy",
    icon: "💰",
    example:
      "Class 10 Simple Interest → SIP Calculator, Stock Market Basics, Budget Planning",
    tag: "Senior Wing",
  },
  {
    subject: "Physics",
    addon: "AI Circuits & Electronics",
    icon: "⚡",
    example:
      "Class 12 Current Electricity → Arduino Projects, Neural Network Hardware, IoT Basics",
    tag: "Senior Wing",
  },
  {
    subject: "Biology",
    addon: "BioTech & Genomics",
    icon: "🧬",
    example:
      "Class 12 Genetics → CRISPR Basics, DNA Computing, Bioinformatics Intro",
    tag: "Senior Wing",
  },
  {
    subject: "Chemistry",
    addon: "Green Chemistry & Materials",
    icon: "🔬",
    example:
      "Class 11 Carbon Compounds → Nanomaterials, Biodegradable Plastics, Energy Storage",
    tag: "Senior Wing",
  },
  {
    subject: "Computer Science",
    addon: "AI & Machine Learning",
    icon: "🤖",
    example:
      "Class 11 Algorithms → ML Pipelines, Prompt Engineering, Neural Nets 101",
    tag: "Senior Wing",
  },
  {
    subject: "History",
    addon: "Future Studies & Futurism",
    icon: "🌍",
    example:
      "Class 9 Industrial Revolution → Digital Revolution, AI Age Timeline, Future Skills",
    tag: "Junior Wing",
  },
  {
    subject: "Geography",
    addon: "Climate Tech & Sustainability",
    icon: "🌱",
    example:
      "Class 8 Natural Resources → Solar Energy, Water AI, Smart Cities",
    tag: "Junior Wing",
  },
  {
    subject: "English",
    addon: "Communication & AI Writing",
    icon: "✍️",
    example:
      "Class 7 Creative Writing → Prompt Craft, Story AI, Public Speaking with AI",
    tag: "Junior Wing",
  },
];

export default function CurriculumAddons() {
  return (
    <section id="addons" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Curriculum Add-ons</h2>
          <p className={styles.sectionSubtitle}>
            Every standard subject, enhanced with real-world Intelligence Age
            applications
          </p>
        </div>
        <div className={styles.addonGrid}>
          {addons.map((addon) => (
            <div key={addon.addon} className={styles.addonCard}>
              <div className={styles.addonTop}>
                <span className={styles.addonIcon}>{addon.icon}</span>
                <span
                  className={`${styles.addonTag} ${
                    addon.tag === "Junior Wing"
                      ? styles.tagJunior
                      : styles.tagSenior
                  }`}
                >
                  {addon.tag}
                </span>
              </div>
              <div className={styles.addonSubject}>{addon.subject}</div>
              <div className={styles.addonArrow}>→</div>
              <div className={styles.addonName}>{addon.addon}</div>
              <p className={styles.addonExample}>{addon.example}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
