import Layout from '@/components/Layout/Layout';
import { CartHeader } from '@/components/CartHeader/CartHeader';
import { CartContent } from '@/components/CartContent/CartContent';
import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const { cart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pasamos el contador de forma segura
  const itemCount = isClient ? cart.length : 0;
  return (
    <Layout>
      <CartHeader itemCount={itemCount} />
      <CartContent />
    </Layout>
  );
};

export default CartPage;
