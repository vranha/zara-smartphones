import Layout from '@/components/Layout/Layout';
import { CartHeader } from '@/components/CartHeader/CartHeader';
import { Suspense } from 'react';
import { CartContent } from '@/components/CartContent/CartContent';

const CartPage = () => {
  return (
    <Layout>
      <Suspense fallback={<CartHeader itemCount={0} />}>
        <CartContent />
      </Suspense>
    </Layout>
  );
};

export default CartPage;
