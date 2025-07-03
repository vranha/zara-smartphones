import { renderHook } from '@testing-library/react';
import { useCustomScroll } from '@/hooks/useCustomScroll';

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

    expect(result.current).toBeDefined();
  });

  test('should have scrollTo function available in window', () => {
    renderHook(() => useCustomScroll());

    expect(typeof window.scrollTo).toBe('function');
  });
});
