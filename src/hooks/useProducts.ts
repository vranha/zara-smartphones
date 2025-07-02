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

        // Verificar si la operación fue cancelada
        if (abortController.signal.aborted) {
          return;
        }

        // Verificar que data sea un array válido
        if (!Array.isArray(data)) {
          throw new Error('Respuesta inválida del servidor');
        }

        const uniqueProducts = getUniqueProducts(data);
        const limitedProducts = uniqueProducts.slice(0, PRODUCTS_LIMIT);
        setProducts(limitedProducts);
      } catch (error) {
        // Ignorar errores si la operación fue cancelada
        if (abortController.signal.aborted || (error as Error)?.name === 'AbortError') {
          return;
        }

        console.error('Error fetching products:', error);
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo.');
        setProducts([]); // Asegurar que products sea siempre un array
      } finally {
        // Solo actualizar el estado si no fue cancelado
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    // Cleanup: cancelar la petición cuando el efecto se desmonte
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
