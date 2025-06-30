// src/pages/index.tsx
import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { productService } from '@/services/productService';
import { ProductListItem } from '@/types/Product';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { Container } from '@/components/Container/Container';

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
    <Container>
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
    </Container>
  );
};

export default HomePage;
