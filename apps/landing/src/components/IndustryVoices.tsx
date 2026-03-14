import styles from "./IndustryVoices.module.css";

const voices = [
  {
    name: "Ananya Krishnan",
    role: "AI Product Lead, Bengaluru",
    quote:
      "The Physics add-ons at IIS Academy gave me a head start in understanding hardware AI before college. The bridge between textbook circuits and real IoT projects is remarkable.",
    board: "CBSE Class 12",
    icon: "⚡",
  },
  {
    name: "Rahul Menon",
    role: "Founder, EduFintech Startup",
    quote:
      "Financial Literacy as a Math add-on? I wish I had that. My daughter now understands SIP, compound interest, and budgeting—practically—while still acing her boards.",
    board: "ICSE Class 10",
    icon: "💰",
  },
  {
    name: "Dr. Priya Nair",
    role: "Biotechnology Researcher",
    quote:
      "The BioTech enhancement layer connects NCERT genetics to real CRISPR applications. Students arrive at university understanding genomics in context—a huge advantage.",
    board: "State Board Class 12",
    icon: "🧬",
  },
];

export default function IndustryVoices() {
  return (
    <section id="voices" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Industry Voices</h2>
          <p className={styles.sectionSubtitle}>
            What learners and educators say about Intelligence Age enhancement
          </p>
        </div>
        <div className={styles.voiceGrid}>
          {voices.map((v) => (
            <div key={v.name} className={styles.voiceCard}>
              <div className={styles.voiceIcon}>{v.icon}</div>
              <blockquote className={styles.quote}>"{v.quote}"</blockquote>
              <div className={styles.voiceMeta}>
                <span className={styles.voiceName}>{v.name}</span>
                <span className={styles.voiceRole}>{v.role}</span>
                <span className={styles.voiceBoard}>{v.board}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
