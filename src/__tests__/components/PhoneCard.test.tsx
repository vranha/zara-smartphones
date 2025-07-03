import { render, screen } from '@testing-library/react';
import PhoneCard from '@/components/PhoneCard/PhoneCard';
import { ProductListItem } from '@/types/Product';

jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    fill,
    style,
    sizes,
    priority,
  }: React.ComponentProps<'img'> & {
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
  }) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        data-fill={fill}
        data-style={JSON.stringify(style)}
        data-sizes={sizes}
        data-priority={priority}
      />
    );
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

describe('PhoneCard', () => {
  const mockProduct: ProductListItem = {
    id: 'iphone-14',
    brand: 'Apple',
    name: 'iPhone 14',
    basePrice: 899,
    imageUrl: 'https://example.com/iphone14.jpg',
  };

  test('should render product information correctly', () => {
    render(<PhoneCard product={mockProduct} />);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 14')).toBeInTheDocument();
    expect(screen.getByText('899 EUR')).toBeInTheDocument();
  });

  test('should render product image with correct attributes', () => {
    render(<PhoneCard product={mockProduct} />);

    const image = screen.getByAltText('Apple iPhone 14');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/iphone14.jpg');
    expect(image).toHaveAttribute('data-fill', 'true');
    expect(image).toHaveAttribute('data-priority', 'true');
  });

  test('should link to correct product detail page', () => {
    render(<PhoneCard product={mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/phone/iphone-14');
  });

  test('should handle product without price', () => {
    const productWithoutPrice: ProductListItem = {
      ...mockProduct,
      basePrice: 0,
    };

    render(<PhoneCard product={productWithoutPrice} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  test('should handle undefined price', () => {
    const productWithUndefinedPrice: ProductListItem = {
      ...mockProduct,
      basePrice: undefined as unknown as number,
    };

    render(<PhoneCard product={productWithUndefinedPrice} />);

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  test('should render different brands correctly', () => {
    const samsungProduct: ProductListItem = {
      id: 'galaxy-s23',
      brand: 'Samsung',
      name: 'Galaxy S23',
      basePrice: 799,
      imageUrl: 'https://example.com/galaxy-s23.jpg',
    };

    render(<PhoneCard product={samsungProduct} />);

    expect(screen.getByText('Samsung')).toBeInTheDocument();
    expect(screen.getByText('Galaxy S23')).toBeInTheDocument();
    expect(screen.getByText('799 EUR')).toBeInTheDocument();
    expect(screen.getByAltText('Samsung Galaxy S23')).toBeInTheDocument();
  });

  test('should handle long product names', () => {
    const productWithLongName: ProductListItem = {
      ...mockProduct,
      name: 'iPhone 14 Pro Max with Advanced Camera System',
    };

    render(<PhoneCard product={productWithLongName} />);

    expect(screen.getByText('iPhone 14 Pro Max with Advanced Camera System')).toBeInTheDocument();
  });

  test('should handle special characters in product data', () => {
    const productWithSpecialChars: ProductListItem = {
      id: 'phone-special',
      brand: 'Brand & Co.',
      name: 'Phone "Special" Model',
      basePrice: 999,
      imageUrl: 'https://example.com/special.jpg',
    };

    render(<PhoneCard product={productWithSpecialChars} />);

    expect(screen.getByText('Brand & Co.')).toBeInTheDocument();
    expect(screen.getByText('Phone "Special" Model')).toBeInTheDocument();
  });
});
