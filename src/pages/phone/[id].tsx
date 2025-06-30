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
  const products = await productService.getProducts();

  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: false }; // Si la ID no existe, dará un 404
};

export const getStaticProps: GetStaticProps<PageProps, Params> = async (context) => {
  const { id } = context.params!;

  try {
    const product = await productService.getProductById(id);
    return {
      props: {
        product,
      },
      revalidate: 3600, // Revalida la página cada hora para actualizar datos
    };
  } catch {
    return {
      notFound: true, // Si el producto no se encuentra, devuelve una página 404
    };
  }
};

export default ProductDetailPage;
