import Link from 'next/link';
import Image from 'next/image';
import { ProductListItem } from '@/types/Product';
import styles from './PhoneCard.module.scss';

interface PhoneCardProps {
  product: ProductListItem;
}

const PhoneCard = ({ product }: PhoneCardProps) => {
  return (
    <Link href={`/phone/${product.id}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          fill // NUEVO: Le dice a la imagen que llene el contenedor padre
          style={{ objectFit: 'contain' }} // NUEVO: Asegura que la imagen no se recorte
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Opcional pero recomendado para responsive
        />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.nameContent}>
          <h3 className={styles.brand}>{product.brand}</h3>
          <p className={styles.model}>{product.name}</p>
        </div>
        <p className={styles.price}>{product.basePrice ? `${product.basePrice} EUR` : 'N/A'}</p>
      </div>
    </Link>
  );
};

export default PhoneCard;
