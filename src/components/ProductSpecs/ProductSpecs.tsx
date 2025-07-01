import styles from './ProductSpecs.module.scss';
import { ProductDetail } from '@/types/Product';

const ProductSpecs = ({ product }: { product: ProductDetail }) => {
  return (
    <div className={styles.specsContainer}>
      <h2 className={styles.sectionTitle}>Specifications</h2>
      <div className={styles.specsGrid}>
        {Object.entries({
          brand: product.brand,
          name: product.name,
          description: product.description,
          ...product.specs,
        }).map(([key, value]) => (
          <div key={key} className={styles.specItem}>
            <span className={styles.specKey}>{key.replace(/([A-Z])/g, ' $1')}</span>
            <span className={styles.specValue}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecs;
