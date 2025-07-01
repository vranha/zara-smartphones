import Image from 'next/image';
import styles from './ProductImageGallery.module.scss';
import { ColorOption, ProductDetail } from '@/types/Product';

interface Props {
  product: ProductDetail;
  selectedColor: ColorOption | null;
}

const ProductImageGallery = ({ product, selectedColor }: Props) => {
  const imageUrl = selectedColor?.imageUrl || product.colorOptions[0]?.imageUrl || '';
  const altText = `${product.brand} ${product.name} en color ${selectedColor?.name || product.colorOptions[0]?.name || ''}`;

  return (
    <div className={styles.imageGallery}>
      <div className={styles.mainImage}>
        <Image src={imageUrl} alt={altText} fill style={{ objectFit: 'contain' }} priority />
      </div>
    </div>
  );
};

export default ProductImageGallery;
