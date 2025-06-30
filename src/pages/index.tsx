// src/pages/index.tsx
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { productService } from '@/services/productService';
import { ProductListItem } from '@/types/Product';
import { useDebounce } from '@/hooks/useDebounce';
import PhoneCard from '@/components/PhoneCard/PhoneCard';
import SkeletonCard from '@/components/SkeletonCard/SkeletonCard';
import styles from '@/styles/Home.module.scss';
import Image from 'next/image';

const HomePage: NextPage = () => {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    productService
      .getProducts(debouncedSearchTerm)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
        setError(
          '¡Ups! Algo ha salido mal al cargar los productos. Por favor, inténtalo de nuevo más tarde.',
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedSearchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  const renderContent = () => {
    if (error) {
      return <p className={styles.errorState}>{error}</p>;
    }

    if (isLoading) {
      return (
        <div className={styles.phoneGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }

    if (products.length === 0) {
      if (debouncedSearchTerm) {
        return <p>No se han encontrado resultados para &quot;{debouncedSearchTerm}&quot;.</p>;
      }
      return <p>No hay productos disponibles en este momento.</p>;
    }

    return (
      <div className={styles.phoneGrid}>
        {products.map((product) => (
          <PhoneCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Search for a smartphone..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={clearSearch}
              aria-label="Clear search"
            >
              <Image src="/icons/close.svg" alt="Clear" width={10} height={10} />
            </button>
          )}
        </div>
        {!isLoading && !error && (
          <span className={styles.resultsCount}>{products.length} results</span>
        )}
      </header>

      <main>{renderContent()}</main>
    </div>
  );
};

export default HomePage;
