import { render, screen, fireEvent } from '@testing-library/react';
import { ProductPurchasePanel } from '@/components/ProductPurchasePanel/ProductPurchasePanel';
import { CartProvider } from '@/context/cart/CartProvider';
import { ProductDetail } from '@/types/Product';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockToast = toast as jest.Mocked<typeof toast>;

const mockProduct: ProductDetail = {
  id: 'iphone-14',
  name: 'iPhone 14',
  brand: 'Apple',
  basePrice: 899,
  imageUrl:
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-model-unselect-202209?wid=512&hei=512&fmt=jpeg&qlt=95&.v=1661027788805',
  colorOptions: [
    {
      name: 'Black',
      hexCode: '#1D1D1F',
      imageUrl:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-black-select-202209?wid=512&hei=512&fmt=jpeg&qlt=95&.v=1661027788805',
    },
    {
      name: 'White',
      hexCode: '#F5F5F7',
      imageUrl:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-starlight-select-202209?wid=512&hei=512&fmt=jpeg&qlt=95&.v=1661027788805',
    },
  ],
  storageOptions: [
    {
      capacity: '128GB',
      price: 899,
    },
    {
      capacity: '256GB',
      price: 999,
    },
  ],
  description:
    'El iPhone 14 tiene una pantalla Super Retina XDR de 6,1 pulgadas, cámara dual avanzada y chip A15 Bionic para un rendimiento excepcional.',
  rating: 4.7,
  specs: {
    screen: '6.1 pulgadas OLED',
    resolution: '2532 x 1170 píxeles',
    processor: 'Apple A15 Bionic',
    mainCamera: '12 MP dual',
    selfieCamera: '12 MP',
    battery: 'Hasta 20 horas de reproducción de vídeo',
    os: 'iOS 16',
    screenRefreshRate: '60 Hz',
  },
  similarProducts: [
    {
      id: 'iphone-14',
      name: 'iPhone 14',
      brand: 'Apple',
      basePrice: 899,
      imageUrl:
        'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-model-unselect-202209?wid=512&hei=512&fmt=jpeg&qlt=95&.v=1661027788805',
    },
  ],
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(<CartProvider>{component}</CartProvider>);
};

describe('ProductPurchasePanel', () => {
  const mockSetSelectedColor = jest.fn();

  beforeEach(() => {
    mockToast.success.mockClear();
    mockToast.error.mockClear();
    mockSetSelectedColor.mockClear();
  });

  test('should render product name and base price', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    expect(screen.getByText('iPhone 14')).toBeInTheDocument();
    expect(screen.getByText('899.00 EUR')).toBeInTheDocument();
  });

  test('should disable add button when no color selected', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    const addButton = screen.getByText('AÑADIR');
    expect(addButton).toBeDisabled();
    expect(addButton).toHaveClass('disabled');
  });

  test('should enable add button when color is selected', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={mockProduct.colorOptions[0]}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    const addButton = screen.getByText('AÑADIR');
    expect(addButton).not.toBeDisabled();
    expect(addButton).not.toHaveClass('disabled');
  });

  test('should select default storage option', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    const storageButton = screen.getByText('128GB');
    expect(storageButton).toHaveClass('selected');
  });

  test('should change storage selection and update price', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    const storage256Button = screen.getByText('256GB');
    fireEvent.click(storage256Button);

    expect(storage256Button).toHaveClass('selected');
    expect(screen.getByText('999.00 EUR')).toBeInTheDocument();
  });

  test('should call setSelectedColor when color is clicked', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    const colorButtons = screen.getAllByRole('button');
    const blackColorButton = colorButtons.find(
      (button) => button.getAttribute('aria-label') === 'Seleccionar color Black',
    );

    fireEvent.click(blackColorButton!);

    expect(mockSetSelectedColor).toHaveBeenCalledWith(mockProduct.colorOptions[0]);
  });

  test('should show selected color name', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={mockProduct.colorOptions[0]}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    expect(screen.getByText('Black')).toBeInTheDocument();
  });

  test('should show hovered color name on hover', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={mockProduct.colorOptions[0]}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    const colorButtons = screen.getAllByRole('button');
    const whiteColorButton = colorButtons.find(
      (button) => button.getAttribute('aria-label') === 'Seleccionar color White',
    );

    fireEvent.mouseEnter(whiteColorButton!);
    expect(screen.getByText('White')).toBeInTheDocument();

    fireEvent.mouseLeave(whiteColorButton!);
    expect(screen.getByText('Black')).toBeInTheDocument();
  });

  test('should add item to cart successfully', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={mockProduct.colorOptions[0]}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    const addButton = screen.getByText('AÑADIR');
    fireEvent.click(addButton);

    expect(mockToast.success).toHaveBeenCalled();
  });

  test('should not submit when no color selected', () => {
    renderWithProvider(
      <ProductPurchasePanel
        product={mockProduct}
        selectedColor={null}
        setSelectedColor={mockSetSelectedColor}
      />,
    );

    const addButton = screen.getByText('AÑADIR');
    fireEvent.click(addButton);

    expect(mockToast.success).not.toHaveBeenCalled();
    expect(mockToast.error).not.toHaveBeenCalled();
  });
});
