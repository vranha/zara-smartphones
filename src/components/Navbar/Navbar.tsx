import Link from 'next/link';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import { Icon } from '@/components/Icon/Icon';
import { Container } from '@/components/Container/Container';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="Carrito" width={80} height={40} />
        </Link>
        <Link className={styles.cartContainer} href="/cart" aria-label="Ver carrito de la compra">
          <Icon name="bag-empty.svg" alt="Carrito vacío" size={18} />
          <span>0</span>
        </Link>
      </Container>
    </nav>
  );
}
