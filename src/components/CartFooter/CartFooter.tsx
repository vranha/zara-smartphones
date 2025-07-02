import Link from 'next/link';
import styles from './CartFooter.module.scss';

interface CartFooterProps {
  totalPrice: number;
  onPay?: () => void;
}

export const CartFooter = ({ totalPrice, onPay }: CartFooterProps) => {
  return (
    <footer className={styles.cartFooter}>
      <div className={styles.totalSection}>
        <span>TOTAL</span>
        <span className={styles.totalPrice}>{totalPrice.toFixed(2)} EUR</span>
      </div>

      <div className={styles.buttonsRow}>
        <Link href="/" className={styles.continueButton}>
          CONTINUE SHOPPING
        </Link>
        <button className={styles.payButton} onClick={onPay}>
          PAY
        </button>
      </div>
    </footer>
  );
};
