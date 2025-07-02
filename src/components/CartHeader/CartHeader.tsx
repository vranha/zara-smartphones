import styles from './CartHeader.module.scss';

interface CartHeaderProps {
  itemCount: number;
}

export const CartHeader = ({ itemCount }: CartHeaderProps) => {
  return (
    <div className={styles.cartHeader}>
      <h1>CART ({itemCount})</h1>
    </div>
  );
};
