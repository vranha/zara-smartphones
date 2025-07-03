import { renderHook, act } from '@testing-library/react';
import { useCartPage } from '@/hooks/useCartPage';
import { CartProvider } from '@/context/cart/CartProvider';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

const mockToast = toast as jest.Mocked<typeof toast>;

// Wrapper simple para el provider
const Wrapper = ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>;

describe('useCartPage', () => {
  beforeEach(() => {
    mockToast.success.mockClear();
  });

  test('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCartPage(), { wrapper: Wrapper });

    expect(result.current.totalPrice).toBe(0);
    expect(result.current.cart).toEqual([]);
  });

  test('should handle remove item call', () => {
    const { result } = renderHook(() => useCartPage(), { wrapper: Wrapper });

    act(() => {
      result.current.handleRemoveItem('non-existent-id');
    });

    expect(mockToast.success).toHaveBeenCalledWith('Producto eliminado del carrito');
  });

  test('should handle pay action', () => {
    const { result } = renderHook(() => useCartPage(), { wrapper: Wrapper });

    act(() => {
      result.current.handlePay();
    });

    expect(mockToast.success).toHaveBeenCalledWith('Procesando pago...');
  });

  test('should return correct function types', () => {
    const { result } = renderHook(() => useCartPage(), { wrapper: Wrapper });

    expect(typeof result.current.handleRemoveItem).toBe('function');
    expect(typeof result.current.handlePay).toBe('function');
    expect(typeof result.current.totalPrice).toBe('number');
    expect(Array.isArray(result.current.cart)).toBe(true);
  });
});
