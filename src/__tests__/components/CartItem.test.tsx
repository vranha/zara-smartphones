/* eslint-disable @next/next/no-img-element */
import { render, screen, fireEvent } from '@testing-library/react';
import { CartItem } from '@/components/CartItem/CartItem';
import { CartItem as CartItemType } from '@/context/cart/CartContext';

jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    return <img src={src as string} alt={alt as string} {...props} />;
  };
});

jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    className,
  }: React.PropsWithChildren<{ href: string; className?: string }>) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

describe('CartItem', () => {
  const mockItem: CartItemType = {
    id: 'iphone-14-black-128gb',
    name: 'iPhone 14',
    brand: 'Apple',
    price: 899,
    imageUrl: 'https://example.com/iphone14.jpg',
    color: 'Black',
    storage: '128GB',
    code: 'iphone-14-black-128gb',
  };

  const mockOnRemove = jest.fn();

  beforeEach(() => {
    mockOnRemove.mockClear();
  });

  test('should render item information correctly', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('APPLE IPHONE 14')).toBeInTheDocument();
    expect(screen.getByText('128GB GB | BLACK')).toBeInTheDocument();
    expect(screen.getByText('899.00 EUR')).toBeInTheDocument();
  });

  test('should render product image with correct attributes', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    const image = screen.getByAltText('Apple iPhone 14');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/iphone14.jpg');
    expect(image).toHaveAttribute('width', '280');
    expect(image).toHaveAttribute('height', '280');
  });

  test('should render links to product detail page', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', '/phone/iphone-14-black-128gb');

    expect(links[1]).toHaveAttribute('href', '/phone/iphone-14-black-128gb');
  });

  test('should call onRemove when remove button is clicked', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    const removeButton = screen.getByText('Eliminar');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith('iphone-14-black-128gb');
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  test('should have correct accessibility attributes on remove button', () => {
    render(<CartItem item={mockItem} onRemove={mockOnRemove} />);

    const removeButton = screen.getByLabelText('Eliminar Apple iPhone 14 del carrito');
    expect(removeButton).toBeInTheDocument();
  });

  test('should format price correctly', () => {
    const itemWithDecimalPrice: CartItemType = {
      ...mockItem,
      price: 999.99,
    };

    render(<CartItem item={itemWithDecimalPrice} onRemove={mockOnRemove} />);

    expect(screen.getByText('999.99 EUR')).toBeInTheDocument();
  });

  test('should render different storage and color options', () => {
    const itemWithDifferentSpecs: CartItemType = {
      ...mockItem,
      color: 'White',
      storage: '256GB',
    };

    render(<CartItem item={itemWithDifferentSpecs} onRemove={mockOnRemove} />);

    expect(screen.getByText('256GB GB | WHITE')).toBeInTheDocument();
  });

  test('should render different brands correctly', () => {
    const samsungItem: CartItemType = {
      ...mockItem,
      name: 'Galaxy S23',
      brand: 'Samsung',
      code: 'galaxy-s23-black-128gb',
    };

    render(<CartItem item={samsungItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('SAMSUNG GALAXY S23')).toBeInTheDocument();
    expect(screen.getByAltText('Samsung Galaxy S23')).toBeInTheDocument();
    expect(screen.getByLabelText('Eliminar Samsung Galaxy S23 del carrito')).toBeInTheDocument();
  });

  test('should handle long product names', () => {
    const itemWithLongName: CartItemType = {
      ...mockItem,
      name: 'iPhone 14 Pro Max with Advanced Camera System',
    };

    render(<CartItem item={itemWithLongName} onRemove={mockOnRemove} />);

    expect(
      screen.getByText('APPLE IPHONE 14 PRO MAX WITH ADVANCED CAMERA SYSTEM'),
    ).toBeInTheDocument();
  });
});
