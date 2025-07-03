import { renderHook } from '@testing-library/react';
import { useCustomScroll } from '@/hooks/useCustomScroll';

// Mock de window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

describe('useCustomScroll', () => {
  const mockScrollTo = window.scrollTo as jest.MockedFunction<typeof window.scrollTo>;

  beforeEach(() => {
    mockScrollTo.mockClear();
  });

  test('should initialize hook without errors', () => {
    const { result } = renderHook(() => useCustomScroll());

    // Solo verificar que el hook se ejecuta sin errores
    expect(result.current).toBeDefined();
  });

  test('should have scrollTo function available in window', () => {
    renderHook(() => useCustomScroll());

    // Verificar que window.scrollTo existe
    expect(typeof window.scrollTo).toBe('function');
  });
});
