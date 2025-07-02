import { useMemo } from 'react';
import { useCart } from '@/context/cart/CartContext';
import toast from 'react-hot-toast';

export const useCartPage = () => {
  const { cart, dispatch } = useCart();

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price, 0);
  }, [cart]);

  const handleRemoveItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: itemId } });
    toast.success('Producto eliminado del carrito');
  };

  const handlePay = () => {
    toast.success('Procesando pago...');
  };

  return {
    cart,
    totalPrice,
    handleRemoveItem,
    handlePay,
  };
};
