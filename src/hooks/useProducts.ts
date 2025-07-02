import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
import { ProductListItem } from '@/types/Product';

const PRODUCTS_LIMIT = 20;

const getUniqueProducts = (products: ProductListItem[]): ProductListItem[] => {
  return products.filter(
    (product, index, array) => array.findIndex((p) => p.name === product.name) === index,
  );
};

export const useProducts = (searchTerm: string) => {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productService.getProducts(searchTerm, abortController.signal);

        if (abortController.signal.aborted) {
          return;
        }

        if (!Array.isArray(data)) {
          throw new Error('Respuesta inválida del servidor');
        }

        const uniqueProducts = getUniqueProducts(data);
        const limitedProducts = uniqueProducts.slice(0, PRODUCTS_LIMIT);
        setProducts(limitedProducts);
      } catch (error) {
        if (abortController.signal.aborted || (error as Error)?.name === 'AbortError') {
          return;
        }

        console.error('Error fetching products:', error);
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo.');
        setProducts([]);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      abortController.abort();
    };
  }, [searchTerm]);

  return {
    products,
    isLoading,
    error,
    resultsCount: products.length,
  };
};
