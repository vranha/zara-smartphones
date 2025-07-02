import { useMemo } from 'react';
import { useCart } from '@/hooks/useCart';
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
    // Lógica de pago aquí
    toast.success('Procesando pago...');
  };

  return {
    cart,
    totalPrice,
    handleRemoveItem,
    handlePay,
  };
};
