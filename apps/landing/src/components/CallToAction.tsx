import styles from "./CallToAction.module.css";

export default function CallToAction() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Ready to Enter the Intelligence Age?
        </h2>
        <p className={styles.subtitle}>
          Join thousands of students already enhancing their board education
          with AI-powered lessons, adaptive quizzes, and real-world skill
          modules.
        </p>
        <div className={styles.actions}>
          <a href="/register" className={styles.primaryBtn}>
            Start Learning – It's Free
          </a>
          <a href="/b2b" className={styles.secondaryBtn}>
            For Schools & Institutions
          </a>
        </div>
        <p className={styles.note}>
          Unified login across iiskills.cloud and iisacademy · SSO via Google /
          Microsoft
        </p>
      </div>
    </section>
  );
}
