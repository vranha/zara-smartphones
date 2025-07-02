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
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productService.getProducts(searchTerm);
        const uniqueProducts = getUniqueProducts(data);
        const limitedProducts = uniqueProducts.slice(0, PRODUCTS_LIMIT);
        setProducts(limitedProducts);
      } catch (error) {
        console.error(error);
        setError(
          '¡Ups! Algo ha salido mal al cargar los productos. Por favor, inténtalo de nuevo más tarde.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  return {
    products,
    isLoading,
    error,
    resultsCount: products.length,
  };
};
