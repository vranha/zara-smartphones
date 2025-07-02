import Layout from '@/components/Layout/Layout';
import { CartHeader } from '@/components/CartHeader/CartHeader';
import { CartContent } from '@/components/CartContent/CartContent';
import { useCart } from '@/hooks/useCart';

const CartPage = () => {
  const { cart } = useCart();

  return (
    <Layout>
      <CartHeader itemCount={cart.length} />
      <CartContent />
    </Layout>
  );
};

export default CartPage;
