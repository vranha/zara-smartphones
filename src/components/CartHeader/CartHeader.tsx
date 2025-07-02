import { useEffect, useState } from 'react';
import styles from './CartHeader.module.scss';

interface CartHeaderProps {
  itemCount: number;
}

export const CartHeader = ({ itemCount }: CartHeaderProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.cartHeader}>
      <h1>CART ({isClient ? itemCount : 0})</h1>
    </div>
  );
};
