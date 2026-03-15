import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.badge}>Intelligence Age Enhancement Layer</div>
        <h1 className={styles.title}>
          Your School Syllabus,
          <br />
          <span className={styles.highlight}>Supercharged</span> for the Future
        </h1>
        <p className={styles.subtitle}>
          IIS Academy bridges CBSE, ICSE, and State Board education with
          AI-powered enhancement layers—adaptive quizzes, voice-enabled lessons,
          and real-world skill add-ons designed for the Intelligence Age.
        </p>
        <div className={styles.actions}>
          <a href="#boards" className={styles.primaryBtn}>
            Explore Your Board
          </a>
          <a href="#wings" className={styles.secondaryBtn}>
            See the Three Wings →
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Major Boards</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>12+</span>
            <span className={styles.statLabel}>Curriculum Add-ons</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Learning Wings</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>AI</span>
            <span className={styles.statLabel}>Voice Lessons</span>
          </div>
        </div>
      </div>
    </section>
  );
}
