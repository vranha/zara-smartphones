import { createContext, Dispatch } from 'react';
import { CartAction } from './cartReducer';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  color: string;
  storage: string;
}

export interface CartState {
  cart: CartItem[];
}

interface CartContextProps extends CartState {
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);
