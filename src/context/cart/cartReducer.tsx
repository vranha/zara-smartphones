import { CartItem, CartState } from './CartContext';

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } };

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const isAlreadyInCart = state.cart.some((item) => item.id === action.payload.id);
      if (isAlreadyInCart) {
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
};
