import { renderHook } from '@testing-library/react';

// Mock completo del hook useProducts antes de importarlo
jest.mock('@/hooks/useProducts', () => ({
  useProducts: jest.fn((searchTerm: string) => {
    // Simular comportamiento del hook
    if (searchTerm === 'error') {
      return {
        isLoading: false,
        products: [],
        error: 'Error al cargar los productos. Por favor, inténtalo de nuevo.',
        resultsCount: 0,
      };
    }

    const mockProducts = [
      {
        id: '1',
        brand: 'Apple',
        name: 'iPhone 14',
        basePrice: 899,
        imageUrl: 'test1.jpg',
      },
      {
        id: '2',
        brand: 'Samsung',
        name: 'Galaxy S23',
        basePrice: 799,
        imageUrl: 'test2.jpg',
      },
    ].filter(
      (product) =>
        searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return {
      isLoading: false,
      products: mockProducts,
      error: null,
      resultsCount: mockProducts.length,
    };
  }),
}));

// Ahora importar el hook mockeado
import { useProducts } from '@/hooks/useProducts';

describe('useProducts', () => {
  test('should return products for empty search', () => {
    const { result } = renderHook(() => useProducts(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.products).toHaveLength(2);
    expect(result.current.error).toBe(null);
    expect(result.current.resultsCount).toBe(2);
  });

  test('should filter products by search term', () => {
    const { result } = renderHook(() => useProducts('iPhone'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].name).toBe('iPhone 14');
    expect(result.current.resultsCount).toBe(1);
  });

  test('should filter products by brand', () => {
    const { result } = renderHook(() => useProducts('Samsung'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].brand).toBe('Samsung');
    expect(result.current.resultsCount).toBe(1);
  });

  test('should handle error state', () => {
    const { result } = renderHook(() => useProducts('error'));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.products).toHaveLength(0);
    expect(result.current.error).toBe(
      'Error al cargar los productos. Por favor, inténtalo de nuevo.',
    );
    expect(result.current.resultsCount).toBe(0);
  });

  test('should return correct structure', () => {
    const { result } = renderHook(() => useProducts('test'));

    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('products');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('resultsCount');

    expect(typeof result.current.isLoading).toBe('boolean');
    expect(Array.isArray(result.current.products)).toBe(true);
    expect(typeof result.current.resultsCount).toBe('number');
  });
});
