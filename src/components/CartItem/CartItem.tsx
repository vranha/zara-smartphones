import Image from 'next/image';
import { CartItem as CartItemType } from '@/context/cart/CartContext';
import styles from './CartItem.module.scss';
import Link from 'next/link';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, onRemove }: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <Link href={`/phone/${item.code}`} className={styles.imageLink}>
        <Image
          src={item.imageUrl}
          alt={`${item.brand} ${item.name}`}
          width={280}
          height={280}
          style={{ objectFit: 'contain' }}
          priority
        />
      </Link>
      <div className={styles.itemDetails}>
        <div className={styles.itemDetailsTop}>
          <Link href={`/phone/${item.code}`} className={styles.nameLink}>
            <h2>
              {item.brand.toUpperCase()} {item.name.toUpperCase()}
            </h2>
          </Link>
          <p>
            {item.storage} GB | {item.color.toUpperCase()}
          </p>
          <span>{item.price.toFixed(2)} EUR</span>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className={styles.removeLink}
          aria-label={`Eliminar ${item.brand} ${item.name} del carrito`}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
