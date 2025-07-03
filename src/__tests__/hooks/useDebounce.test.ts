import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

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

    rerender({ value: 'updated', delay: 500 });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('updated');
  });

  test('should reset timer on rapid value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    rerender({ value: 'first', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: 'second', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(200);
    });

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
