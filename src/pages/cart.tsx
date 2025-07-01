import { useCart } from '@/hooks/useCart';
import Layout from '@/components/Layout/Layout';
import { Container } from '@/components/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import styles from './cart.module.scss';

const CartPage = () => {
  const { cart, dispatch } = useCart();

  const handleRemove = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: itemId } });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Layout>
      <Container className={styles.cartContainer}>
        <div className={styles.cartHeader}>
          <h1>CART ({cart.length})</h1>
        </div>

        {cart.length === 0 ? (
          <div className={styles.cartFooter}>
            <Link href="/" className={styles.continueButton}>
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartItemList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={300}
                      height={300}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemDetailsTop}>
                      <h2>
                        {item.brand.toUpperCase()} {item.name.toUpperCase()}
                      </h2>
                      <p>
                        {item.storage} GB | {item.color.toUpperCase()}
                      </p>
                      <span>{item.price.toFixed(2)} EUR</span>
                    </div>
                    <button onClick={() => handleRemove(item.id)} className={styles.removeLink}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <footer className={styles.cartFooter}>
              <Link href="/" className={styles.continueButton}>
                CONTINUE SHOPPING
              </Link>
              <div className={styles.rightFooterSection}>
                <div className={styles.totalSection}>
                  <span>TOTAL</span>
                  <span className={styles.totalPrice}>{totalPrice.toFixed(2)} EUR</span>
                </div>
                <button className={styles.payButton}>PAY</button>
              </div>
            </footer>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default CartPage;
