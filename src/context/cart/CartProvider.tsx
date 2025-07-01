import { useEffect, useReducer } from 'react';
import { CartContext, CartState } from './CartContext';
import { cartReducer } from './cartReducer';

interface Props {
  children: React.ReactNode;
}

const INITIAL_STATE: CartState = {
  cart: [],
};

const getInitialState = (): CartState => {
  try {
    const storedCart = window.localStorage.getItem('cart');
    if (storedCart) {
      return { cart: JSON.parse(storedCart) };
    }
  } catch (error) {
    console.error('Error reading from localStorage', error);
  }
  return INITIAL_STATE;
};

export const CartProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }, [state.cart]);

  return <CartContext.Provider value={{ ...state, dispatch }}>{children}</CartContext.Provider>;
};
