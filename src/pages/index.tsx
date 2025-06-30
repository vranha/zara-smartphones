// src/pages/index.tsx
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { productService } from '@/services/productService';
import { ProductListItem } from '@/types/Product';
import { useDebounce } from '@/hooks/useDebounce';
import styles from '@/styles/Home.module.scss';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';

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

  return (
    <div className={styles.homeContainer}>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resultsCount={products.length}
        isLoading={isLoading}
      ></SearchInput>

      <main>
        {' '}
        <ProductGrid
          isLoading={isLoading}
          error={error}
          products={products}
          searchTerm={debouncedSearchTerm}
        />
      </main>
    </div>
  );
};

export default HomePage;
