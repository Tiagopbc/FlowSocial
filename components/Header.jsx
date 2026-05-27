/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoArea}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logoIcon}>🌊</span>
            <span className={styles.logoText}>Flow</span>
          </Link>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            <span>Feed</span>
          </Link>
          <Link href="/perfil" className={styles.navLink}>
            <span>Perfil</span>
          </Link>
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
