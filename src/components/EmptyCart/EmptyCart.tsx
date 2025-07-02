import Link from 'next/link';
import styles from '../CartFooter/CartFooter.module.scss';

export const EmptyCart = () => {
  return (
    <div className={styles.cartFooter}>
      <Link href="/" className={styles.continueButton}>
        CONTINUE SHOPPING
      </Link>
    </div>
  );
};
