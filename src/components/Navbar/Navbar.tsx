import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import { Icon } from '@/components/Icon/Icon';
import { Container } from '@/components/Container/Container';
import { useCart } from '@/context/cart/CartContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { cart } = useCart();
  const cartItemCount = cart.length;
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const isCartPage = router.pathname === '/cart';

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isCartPage ? styles.withBorder : ''}`}>
      <Container className={styles.navContent}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo.svg" alt="Carrito" width={80} height={40} priority />
        </Link>

        {!isCartPage && (
          <Link className={styles.cartContainer} href="/cart" aria-label="Ver carrito de la compra">
            <Icon name="bag-empty.svg" alt="Carrito vacío" size={18} />
            {isClient && cartItemCount > 0 ? (
              <span className={styles.cartItemCount}>{cartItemCount}</span>
            ) : (
              <span className={styles.cartItemCount}>0</span>
            )}
          </Link>
        )}
      </Container>
    </nav>
  );
}
