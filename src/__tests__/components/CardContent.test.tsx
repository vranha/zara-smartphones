import { render, screen } from '@testing-library/react';
import { CartContent } from '@/components/CartContent/CartContent';
import { useCartPage } from '@/hooks/useCartPage';

jest.mock('@/hooks/useCartPage', () => ({
  useCartPage: jest.fn(),
}));

jest.mock('@/components/CartHeader/CartHeader', () => {
  return {
    CartHeader: ({ itemCount }: { itemCount: number }) => (
      <div data-testid="cart-header">Cart Header - {itemCount} items</div>
    ),
  };
});

jest.mock('@/components/CartItem/CartItem', () => {
  return {
    CartItem: ({
      item,
      onRemove,
    }: {
      item: {
        id: string;
        name: string;
        brand: string;
        price: number;
        imageUrl: string;
        color: string;
        storage: string;
        code: string;
      };
      onRemove: (id: string) => void;
    }) => (
      <div data-testid="cart-item">
        <span>
          {item.brand} {item.name}
        </span>
        <button onClick={() => onRemove(item.id)}>Remove</button>
      </div>
    ),
  };
});

jest.mock('@/components/CartFooter/CartFooter', () => {
  return {
    CartFooter: ({ totalPrice, onPay }: { totalPrice: number; onPay: () => void }) => (
      <div data-testid="cart-footer">
        <span>Total: {totalPrice} EUR</span>
        <button onClick={onPay}>Pay</button>
      </div>
    ),
  };
});

jest.mock('@/components/EmptyCart/EmptyCart', () => {
  return {
    EmptyCart: () => <div data-testid="empty-cart">Your cart is empty</div>,
  };
});

jest.mock('@/components/Container/Container', () => {
  return {
    Container: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  };
});

const mockUseCartPage = useCartPage as jest.MockedFunction<typeof useCartPage>;

describe('CartContent', () => {
  beforeEach(() => {
    mockUseCartPage.mockClear();
  });

  test('should show EmptyCart when cart is empty', () => {
    mockUseCartPage.mockReturnValue({
      cart: [],
      totalPrice: 0,
      handleRemoveItem: jest.fn(),
      handlePay: jest.fn(),
    });

    render(<CartContent />);

    expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
    expect(screen.getByTestId('cart-header')).toBeInTheDocument();
    expect(screen.getByText('Cart Header - 0 items')).toBeInTheDocument();
  });

  test('should render cart items when cart has products', () => {
    const mockCart = [
      {
        id: 'item-1',
        name: 'iPhone 14',
        brand: 'Apple',
        price: 899,
        imageUrl: 'test-image.jpg',
        color: 'Black',
        storage: '128GB',
        code: 'iphone-14-black-128gb',
      },
      {
        id: 'item-2',
        name: 'Galaxy S23',
        brand: 'Samsung',
        price: 799,
        imageUrl: 'test-image2.jpg',
        color: 'White',
        storage: '256GB',
        code: 'galaxy-s23-white-256gb',
      },
    ];

    mockUseCartPage.mockReturnValue({
      cart: mockCart,
      totalPrice: 1698,
      handleRemoveItem: jest.fn(),
      handlePay: jest.fn(),
    });

    render(<CartContent />);

    expect(screen.getByText('Cart Header - 2 items')).toBeInTheDocument();
    expect(screen.getByText('Apple iPhone 14')).toBeInTheDocument();
    expect(screen.getByText('Samsung Galaxy S23')).toBeInTheDocument();
    expect(screen.getByText('Total: 1698 EUR')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-cart')).not.toBeInTheDocument();
  });

  test('should render CartFooter when cart has items', () => {
    const mockCart = [
      {
        id: 'item-1',
        name: 'iPhone 14',
        brand: 'Apple',
        price: 899,
        imageUrl: 'test-image.jpg',
        color: 'Black',
        storage: '128GB',
        code: 'iphone-14-black-128gb',
      },
    ];

    mockUseCartPage.mockReturnValue({
      cart: mockCart,
      totalPrice: 899,
      handleRemoveItem: jest.fn(),
      handlePay: jest.fn(),
    });

    render(<CartContent />);

    expect(screen.getByTestId('cart-footer')).toBeInTheDocument();
    expect(screen.getByText('Total: 899 EUR')).toBeInTheDocument();
  });

  test('should render correct number of cart items', () => {
    const mockCart = Array.from({ length: 3 }, (_, i) => ({
      id: `item-${i + 1}`,
      name: `Phone ${i + 1}`,
      brand: 'Brand',
      price: 100,
      imageUrl: 'test-image.jpg',
      color: 'Black',
      storage: '128GB',
      code: `phone-${i + 1}-black-128gb`,
    }));

    mockUseCartPage.mockReturnValue({
      cart: mockCart,
      totalPrice: 300,
      handleRemoveItem: jest.fn(),
      handlePay: jest.fn(),
    });

    render(<CartContent />);

    expect(screen.getAllByTestId('cart-item')).toHaveLength(3);
    expect(screen.getByText('Cart Header - 3 items')).toBeInTheDocument();
  });
});
