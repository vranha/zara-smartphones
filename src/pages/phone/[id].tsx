// src/pages/phone/[id].tsx
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { productService } from '@/services/productService';
import { ProductDetail as ProductDetailType } from '@/types/Product';
import { ProductDetail } from '@/components/ProductDetail/ProductDetail'; // Este será nuestro componente principal

interface PageProps {
  product: ProductDetailType;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const ProductDetailPage: NextPage<PageProps> = ({ product }) => {
  return <ProductDetail product={product} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const abortController = new AbortController();

  try {
    const products = await productService.getProducts('', abortController.signal);

    const paths = products.slice(0, 10).map((product) => ({
      params: { id: product.id },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async (context) => {
  const { id } = context.params!;
  const abortController = new AbortController();

  try {
    const product = await productService.getProductById(id, abortController.signal);

    // Verificar que el producto sea válido
    if (!product || !product.id) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return {
      notFound: true,
    };
  }
};

export default ProductDetailPage;
