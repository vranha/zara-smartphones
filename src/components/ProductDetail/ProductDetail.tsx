// src/components/ProductDetail/ProductDetail.tsx
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ColorOption, ProductDetail as ProductDetailType } from '@/types/Product';
import { Container } from '@/components/Container/Container'; // Asumiendo que creaste este componente
import PhoneCard from '@/components/PhoneCard/PhoneCard';
import styles from './ProductDetail.module.scss';

interface ProductDetailProps {
  product: ProductDetailType;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0]);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  // Usamos useMemo para evitar recalcular el precio en cada render a menos que cambie la dependencia
  const finalPrice = useMemo(() => {
    return product.basePrice + selectedStorage.price;
  }, [product.basePrice, selectedStorage]);

  const handleAddToCart = () => {
    console.log('Añadiendo al carrito:', {
      id: product.id,
      color: selectedColor?.name,
      storage: selectedStorage.capacity,
      price: finalPrice,
    });
    alert('Producto añadido (ver consola)');
  };

  return (
    <>
      <Container className={styles.detailContainer}>
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <Image
              src={selectedColor?.imageUrl || product.colorOptions[0]?.imageUrl || ''}
              alt={`${product.brand} ${product.name} en color ${selectedColor?.name || product.colorOptions[0]?.name || ''}`}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>

        <div className={styles.productInfo}>
          <div>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>From {product.basePrice} EUR</p>
          </div>

          <div className={styles.options}>
            <div className={styles.selectorSection}>
              <h3 className={styles.selectorTitle}> Storage ¿How much space do you need?</h3>
              <div className={styles.optionsContainer}>
                {product.storageOptions.map((storage) => (
                  <button
                    key={storage.capacity}
                    className={`${styles.optionButton} ${selectedStorage.capacity === storage.capacity ? styles.selected : ''}`}
                    onClick={() => setSelectedStorage(storage)}
                  >
                    {storage.capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.selectorSection}>
              <h3 className={styles.selectorTitle}>Color. Pick your favourite.</h3>
              <div className={styles.optionsContainer}>
                {product.colorOptions.map((color) => (
                  <button
                    key={color.name}
                    className={`${styles.colorSwatch} ${selectedColor?.name === color.name ? styles.selected : ''}`}
                    style={{ backgroundColor: color.hexCode }}
                    onClick={() => setSelectedColor(color)}
                    onMouseEnter={() => setHoveredColor(color.name)}
                    onMouseLeave={() => setHoveredColor(null)}
                    aria-label={`Seleccionar color ${color.name}`}
                  />
                ))}
              </div>
              <p className={styles.colorName}>{hoveredColor || selectedColor?.name}</p>
            </div>
          </div>

          <button
            className={`${styles.addToCartButton} ${!selectedColor ? styles.disabled : ''}`}
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedStorage}
          >
            AÑADIR
          </button>
        </div>
      </Container>

      <Container className={styles.specsContainer}>
        <h2 className={styles.sectionTitle}>Specifications</h2>
        <div className={styles.specsGrid}>
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className={styles.specItem}>
              <span className={styles.specKey}>{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className={styles.specValue}>{value}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* Sección de Productos Similares */}
      <Container className={styles.similarContainer}>
        <h2 className={styles.sectionTitle}>Similar Items</h2>
        <div className={styles.similarGrid}>
          {product.similarProducts.map((similar) => (
            <PhoneCard key={similar.id} product={similar} />
          ))}
        </div>
      </Container>
    </>
  );
};
