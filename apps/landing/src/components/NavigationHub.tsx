import styles from "./NavigationHub.module.css";

const boards = [
  {
    id: "cbse",
    name: "CBSE",
    description: "Central Board of Secondary Education",
    classes: ["Class 6–8", "Class 9–10", "Class 11–12"],
    color: "#1a237e",
    icon: "📘",
  },
  {
    id: "icse",
    name: "ICSE / ISC",
    description: "Council for Indian School Certificate Examinations",
    classes: ["Class 6–8", "Class 9–10", "Class 11–12"],
    color: "#006064",
    icon: "📗",
  },
  {
    id: "state",
    name: "State Boards",
    description: "Karnataka · Tamil Nadu · Kerala · AP · Others",
    classes: ["Class 6–8", "Class 9–10", "Class 11–12"],
    color: "#4a148c",
    icon: "📙",
  },
];

export default function NavigationHub() {
  return (
    <section id="boards" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Board Navigation Hub</h2>
          <p className={styles.sectionSubtitle}>
            Select your board to explore AI-enhanced chapters and lessons
            aligned with your curriculum
          </p>
        </div>
        <div className={styles.boardGrid}>
          {boards.map((board) => (
            <div
              key={board.id}
              className={styles.boardCard}
              style={{ borderTopColor: board.color }}
            >
              <div className={styles.boardIcon}>{board.icon}</div>
              <h3 className={styles.boardName}>{board.name}</h3>
              <p className={styles.boardDesc}>{board.description}</p>
              <div className={styles.classLinks}>
                {board.classes.map((cls) => (
                  <a
                    key={cls}
                    href={`/boards/${board.id}/${cls
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                    className={styles.classLink}
                    style={{
                      background: board.color + "18",
                      color: board.color,
                    }}
                  >
                    {cls}
                  </a>
                ))}
              </div>
              <a
                href={`/boards/${board.id}`}
                className={styles.boardCta}
                style={{ background: board.color }}
              >
                Explore {board.name} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
