import Layout from '@/components/Layout/Layout';
import { CartProvider } from '@/context/cart/CartProvider';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Layout>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
