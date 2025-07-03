import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

// Mock timers para controlar setTimeout
jest.useFakeTimers();

describe('useDebounce', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));

    expect(result.current).toBe('initial');
  });

  test('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    // Cambiar el valor
    rerender({ value: 'updated', delay: 500 });

    // El valor no debe cambiar inmediatamente
    expect(result.current).toBe('initial');

    // Avanzar el tiempo pero no completamente
    act(() => {
      jest.advanceTimersByTime(400);
    });

    // Todavía debe ser el valor inicial
    expect(result.current).toBe('initial');

    // Completar el delay
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Ahora debe tener el nuevo valor
    expect(result.current).toBe('updated');
  });

  test('should reset timer on rapid value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    // Primer cambio
    rerender({ value: 'first', delay: 500 });

    // Avanzar parcialmente
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Segundo cambio antes de que termine el delay
    rerender({ value: 'second', delay: 500 });

    // Avanzar el tiempo original
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Todavía debe ser el valor inicial porque se reinició el timer
    expect(result.current).toBe('initial');

    // Completar el nuevo delay
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Ahora debe tener el último valor
    expect(result.current).toBe('second');
  });

  test('should work with different types', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 123, delay: 300 },
    });

    expect(result.current).toBe(123);

    rerender({ value: 456, delay: 300 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(456);
  });
});
