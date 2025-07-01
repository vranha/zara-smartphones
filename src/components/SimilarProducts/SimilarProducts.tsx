import { ProductListItem } from '@/types/Product';
import PhoneCard from '@/components/PhoneCard/PhoneCard';
import { Container } from '@/components/Container/Container';
import { useCustomScroll } from '@/hooks/useCustomScroll';
import styles from './SimilarProducts.module.scss';

interface SimilarProductsProps {
  products: ProductListItem[];
  title?: string;
}

export const SimilarProducts = ({ products, title = 'Similar Items' }: SimilarProductsProps) => {
  const {
    scrollContainerRef,
    scrollThumbWidth,
    scrollThumbLeft,
    updateScrollbar,
    handleThumbMouseDown,
    handleGridMouseDown,
  } = useCustomScroll();

  return (
    <Container className={styles.similarContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div
        className={styles.similarGrid}
        ref={scrollContainerRef}
        onScroll={updateScrollbar}
        onMouseDown={handleGridMouseDown}
      >
        {products.map((product) => (
          <PhoneCard key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.scrollbarContainer}>
        <div
          className={styles.scrollbarThumb}
          style={{
            width: `${scrollThumbWidth}%`,
            left: `${scrollThumbLeft}%`,
          }}
          onMouseDown={handleThumbMouseDown}
        />
      </div>
    </Container>
  );
};

export default SimilarProducts;
