// src/components/ProductDetail/ProductDetail.tsx
import { useState } from 'react';
import { ColorOption, ProductDetail as ProductDetailType } from '@/types/Product';
import { Container } from '@/components/Container/Container'; // Asumiendo que creaste este componente

import styles from './ProductDetail.module.scss';
import ProductHeader from '../ProductHeader/ProductHeader';
import ProductImageGallery from '../ProductImageGallery/ProductImageGallery';
import { ProductPurchasePanel } from '../ProductPurchasePanel/ProductPurchasePanel';
import ProductSpecs from '../ProductSpecs/ProductSpecs';
import SimilarProducts from '../SimilarProducts/SimilarProducts';

interface ProductDetailProps {
  product: ProductDetailType;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);

  return (
    <>
      <ProductHeader />

      <Container className={styles.detailContainer}>
        <ProductImageGallery product={product} selectedColor={selectedColor} />
        <ProductPurchasePanel
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        <div className={styles.productInfo}></div>
      </Container>

      <Container>
        <ProductSpecs product={product} />

        <SimilarProducts products={product.similarProducts} />
      </Container>
    </>
  );
};
