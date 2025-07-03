import { render, screen } from '@testing-library/react';
import { CartHeader } from '@/components/CartHeader/CartHeader';

describe('CartHeader', () => {
  test('should render cart header with item count', () => {
    render(<CartHeader itemCount={5} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (5)');
  });

  test('should handle zero items', () => {
    render(<CartHeader itemCount={0} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (0)');
  });

  test('should handle single item', () => {
    render(<CartHeader itemCount={1} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (1)');
  });

  test('should handle large item count', () => {
    render(<CartHeader itemCount={99} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (99)');
  });

  test('should render h1 element', () => {
    render(<CartHeader itemCount={3} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  test('should contain CART text in heading', () => {
    render(<CartHeader itemCount={5} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('CART');
    expect(heading.textContent).toContain('5');
  });

  test('should update when itemCount prop changes', () => {
    const { rerender } = render(<CartHeader itemCount={2} />);

    let heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (2)');

    rerender(<CartHeader itemCount={5} />);

    heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (5)');
  });

  test('should handle different item counts', () => {
    const { rerender } = render(<CartHeader itemCount={0} />);

    let heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (0)');

    rerender(<CartHeader itemCount={10} />);
    heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (10)');

    rerender(<CartHeader itemCount={100} />);
    heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (100)');
  });

  test('should have correct heading structure', () => {
    render(<CartHeader itemCount={3} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (3)');
  });

  test('should handle negative numbers', () => {
    render(<CartHeader itemCount={-1} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (-1)');
  });

  test('should handle very large numbers', () => {
    render(<CartHeader itemCount={9999} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('CART (9999)');
  });
});
