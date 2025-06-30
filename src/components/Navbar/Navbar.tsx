import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="Carrito" width={80} height={40} />
        </Link>
        <Link className={styles.cartContainer} href="/cart" aria-label="Ver carrito de la compra">
          <Image src="/icons/bag-empty.svg" alt="Carrito" width={18} height={18} />
          <span>0</span>
        </Link>
      </div>
    </nav>
  );
}
