import { ProductListItem } from '@/types/Product';
import PhoneCard from '@/components/PhoneCard/PhoneCard';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';
import styles from './ProductGrid.module.scss'; // Puedes mover los estilos de .phoneGrid aquí

interface ProductGridProps {
  isLoading: boolean;
  error: string | null;
  products: ProductListItem[];
  searchTerm: string;
}

export const ProductGrid = ({ isLoading, error, products, searchTerm }: ProductGridProps) => {
  if (error) {
    return <p className={styles.errorState}>{error}</p>;
  }

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return searchTerm ? (
      <p>No se han encontrado resultados para &quot;{searchTerm}&quot;.</p>
    ) : (
      <p>No hay productos disponibles en este momento.</p>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <PhoneCard key={product.id} product={product} />
      ))}
    </div>
  );
};
