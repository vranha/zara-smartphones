import { useEffect, useReducer } from 'react';
import { CartContext, CartState } from './CartContext';
import { cartReducer } from './cartReducer';

interface Props {
  children: React.ReactNode;
}

const INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider = ({ children }: Props) => {
  // Siempre inicializar con estado vacío
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  // Cargar desde localStorage solo en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedCart = window.localStorage.getItem('cart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          // Necesitas agregar una acción para cargar el cart
          dispatch({ type: 'LOAD_CART', payload: parsedCart });
        }
      } catch (error) {
        console.error('Error reading from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('cart', JSON.stringify(state.cart));
      } catch (error) {
        console.error('Error saving to localStorage', error);
      }
    }
  }, [state.cart]);

  return <CartContext.Provider value={{ ...state, dispatch }}>{children}</CartContext.Provider>;
};
