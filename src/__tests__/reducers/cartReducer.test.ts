import { cartReducer, CartAction } from '@/context/cart/cartReducer';
import { CartItem } from '@/context/cart/CartContext';

describe('cartReducer', () => {
  const mockItem: CartItem = {
    id: 'test-1',
    name: 'iPhone 14',
    brand: 'Apple',
    price: 899,
    imageUrl: 'test-image.jpg',
    color: 'Black',
    storage: '128GB',
    code: 'iphone-14-black-128gb',
  };

  test('should add item to empty cart', () => {
    const initialState = { cart: [] };
    const action: CartAction = {
      type: 'ADD_TO_CART',
      payload: mockItem,
    };

    const result = cartReducer(initialState, action);

    expect(result.cart).toHaveLength(1);
    expect(result.cart[0]).toEqual(mockItem);
  });

  test('should NOT add duplicate item (same id)', () => {
    const initialState = { cart: [mockItem] };
    const action: CartAction = {
      type: 'ADD_TO_CART',
      payload: mockItem, // Mismo item
    };

    const result = cartReducer(initialState, action);

    // Debe mantener solo 1 item (no duplicar)
    expect(result.cart).toHaveLength(1);
    expect(result).toEqual(initialState);
  });

  test('should add different items', () => {
    const mockItem2: CartItem = {
      id: 'test-2',
      name: 'Samsung Galaxy',
      brand: 'Samsung',
      price: 799,
      imageUrl: 'test-image2.jpg',
      color: 'White',
      storage: '256GB',
      code: 'samsung-galaxy-white-256gb',
    };

    const initialState = { cart: [mockItem] };
    const action: CartAction = {
      type: 'ADD_TO_CART',
      payload: mockItem2,
    };

    const result = cartReducer(initialState, action);

    expect(result.cart).toHaveLength(2);
    expect(result.cart[1]).toEqual(mockItem2);
  });

  test('should remove item from cart', () => {
    const initialState = { cart: [mockItem] };
    const action: CartAction = {
      type: 'REMOVE_FROM_CART',
      payload: { id: 'test-1' },
    };

    const result = cartReducer(initialState, action);

    expect(result.cart).toHaveLength(0);
  });

  test('should load cart with new items', () => {
    const newItems: CartItem[] = [
      mockItem,
      {
        id: 'test-2',
        name: 'Samsung Galaxy',
        brand: 'Samsung',
        price: 799,
        imageUrl: 'test-image2.jpg',
        color: 'White',
        storage: '256GB',
        code: 'samsung-galaxy-white-256gb',
      },
    ];

    const initialState = { cart: [] };
    const action: CartAction = {
      type: 'LOAD_CART',
      payload: newItems,
    };

    const result = cartReducer(initialState, action);

    expect(result.cart).toHaveLength(2);
    expect(result.cart).toEqual(newItems);
  });

  test('should handle unknown action', () => {
    const initialState = { cart: [mockItem] };
    const action = {
      type: 'UNKNOWN_ACTION',
    } as unknown as CartAction;

    const result = cartReducer(initialState, action);

    // Debe retornar el estado sin cambios
    expect(result).toEqual(initialState);
  });
});
