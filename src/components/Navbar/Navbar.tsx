import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <strong>MB</strong>
          <span>ST</span>
        </Link>
        <Link href="/cart" aria-label="Ver carrito de la compra">
          🛒 <span>0</span>
        </Link>
      </div>
    </nav>
  );
}
