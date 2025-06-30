import Link from 'next/link';
import Image from 'next/image';
import { ProductListItem } from '@/types/Product';
import styles from './PhoneCard.module.scss';

type PhoneCardProps = {
  product: ProductListItem;
};

const PhoneCard = ({ product }: PhoneCardProps) => {
  return (
    <Link href={`/phone/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.nameContent}>
          <h3 className={styles.brand}>{product.brand}</h3>
          <h4 className={styles.model}>{product.name}</h4>
        </div>
        <p className={styles.price}>{product.basePrice ? `${product.basePrice} EUR` : 'N/A'}</p>
      </div>
    </Link>
  );
};

export default PhoneCard;
