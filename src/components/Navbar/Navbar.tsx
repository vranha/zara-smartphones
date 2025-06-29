import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" aria-label="Ir a la página de inicio">
        🏠
      </Link>
      <Link href="/cart" aria-label="Ver carrito de la compra">
        🛒 <span>0</span>
      </Link>
    </nav>
  );
}
