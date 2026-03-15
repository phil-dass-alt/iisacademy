"use client";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/images/IISA_logo.png" alt="IIS Academy" className={styles.logoImg} />
        </div>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <a href="#boards" className={styles.navLink}>
            Boards
          </a>
          <a href="#wings" className={styles.navLink}>
            Wings
          </a>
          <a href="#addons" className={styles.navLink}>
            Curriculum+
          </a>
          <a href="#voices" className={styles.navLink}>
            Industry Voices
          </a>
          <a href="/student-dashboard" className={styles.navLink}>
            Student Login
          </a>
          <a href="/b2b" className={styles.ctaBtn}>
            B2B Portal
          </a>
        </nav>
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
