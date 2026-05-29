/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("flow_theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("flow_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoArea}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoIcon}>🌊</span>
            <span className={styles.logoText}>Flow Social</span>
          </Link>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            <span>Feed</span>
          </Link>
          <Link href="/perfil" className={styles.navLink}>
            <span>Perfil</span>
          </Link>
          <button onClick={toggleTheme} className={styles.themeToggle} title="Alternar Tema">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </nav>
        
        <div className={styles.userSection}>
          <Link href="/perfil" className={styles.profileBadge}>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80" 
              alt="Avatar do Usuário" 
              className={styles.avatar}
            />
            <span className={styles.userName}>Ana Costa</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
