import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              🎓 IIS <strong>Academy</strong>
            </div>
            <p className={styles.tagline}>
              Intelligence Age Enhancement Layer for Indian School Education
            </p>
            <div className={styles.links}>
              <a href="https://iiskills.cloud" className={styles.link}>
                iiskills.cloud
              </a>
              <span>·</span>
              <a href="https://iisacademy.com" className={styles.link}>
                iisacademy.com
              </a>
            </div>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Boards</h4>
            <a href="/boards/cbse" className={styles.colLink}>
              CBSE
            </a>
            <a href="/boards/icse" className={styles.colLink}>
              ICSE / ISC
            </a>
            <a href="/boards/state" className={styles.colLink}>
              State Boards
            </a>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Wings</h4>
            <a href="/wings/junior" className={styles.colLink}>
              Junior Wing (6–8)
            </a>
            <a href="/wings/senior" className={styles.colLink}>
              Senior Wing (9–12)
            </a>
            <a href="/wings/university" className={styles.colLink}>
              University (Soon)
            </a>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Platform</h4>
            <a href="/student-dashboard" className={styles.colLink}>
              Student Dashboard
            </a>
            <a href="/b2b" className={styles.colLink}>
              B2B Portal
            </a>
            <a href="/admin" className={styles.colLink}>
              Admin Panel
            </a>
            <a href="/login" className={styles.colLink}>
              Unified Login
            </a>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} IIS Academy. All rights reserved.</span>
          <span className={styles.taglineSmall}>
            Built for the Intelligence Age 🧠
          </span>
        </div>
      </div>
    </footer>
  );
}
