// src/components/ProductDetail/ProductDetail.tsx
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ColorOption, ProductDetail as ProductDetailType } from '@/types/Product';
import { Container } from '@/components/Container/Container'; // Asumiendo que creaste este componente
import PhoneCard from '@/components/PhoneCard/PhoneCard';
import styles from './ProductDetail.module.scss';
import { useRouter } from 'next/router';
import { Icon } from '../Icon/Icon';

interface ProductDetailProps {
  product: ProductDetailType;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0]);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollThumbWidth, setScrollThumbWidth] = useState(0);
  const [scrollThumbLeft, setScrollThumbLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isGridDragging, setIsGridDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

  const updateScrollbar = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollRatio = container.scrollLeft / (container.scrollWidth - container.clientWidth);
      const thumbWidth = (container.clientWidth / container.scrollWidth) * 100;
      const thumbLeft = scrollRatio * (100 - thumbWidth);

      setScrollThumbWidth(thumbWidth);
      setScrollThumbLeft(thumbLeft);
    }
  };

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    e.preventDefault();
  };

  const handleGridMouseDown = (e: React.MouseEvent) => {
    setIsGridDragging(true);
    setDragStartX(e.clientX);
    setDragStartScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!scrollContainerRef.current) return;

      const container = scrollContainerRef.current;

      if (isDragging) {
        // Lógica para arrastrar la barra de scroll
        const deltaX = e.clientX - dragStartX;
        const scrollbarWidth = container.clientWidth;
        const scrollRatio = deltaX / scrollbarWidth;
        const maxScroll = container.scrollWidth - container.clientWidth;

        container.scrollLeft = dragStartScrollLeft + scrollRatio * maxScroll;
      } else if (isGridDragging) {
        // Lógica para arrastrar el grid directamente
        const deltaX = e.clientX - dragStartX;
        container.scrollLeft = dragStartScrollLeft - deltaX;
      }
    },
    [isDragging, isGridDragging, dragStartX, dragStartScrollLeft],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsGridDragging(false);
  }, []);

  useEffect(() => {
    updateScrollbar();
    window.addEventListener('resize', updateScrollbar);
    return () => window.removeEventListener('resize', updateScrollbar);
  }, []);

  useEffect(() => {
    if (isDragging || isGridDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isGridDragging, handleMouseMove, handleMouseUp]);

  const finalPrice = useMemo(() => {
    return product.basePrice + selectedStorage.price;
  }, [product.basePrice, selectedStorage]);

  const router = useRouter();

  const handleAddToCart = () => {
    console.log('Añadiendo al carrito:', {
      id: product.id,
      color: selectedColor?.name,
      storage: selectedStorage.capacity,
      price: finalPrice,
    });
    alert('Producto añadido (ver consola)');
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <>
      <Container className={styles.headerContainer}>
        <button
          className={styles.backButton}
          onClick={handleGoBack}
          aria-label="Volver a la página principal"
        >
          <Icon name="arrow-back.svg" alt="Flecha atras" size={20} />
          <span>Back</span>
        </button>
      </Container>

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
          {Object.entries({
            brand: product.brand,
            name: product.name,
            description: product.description,
            ...product.specs,
          }).map(([key, value]) => (
            <div key={key} className={styles.specItem}>
              <span className={styles.specKey}>{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className={styles.specValue}>{value}</span>
            </div>
          ))}
        </div>
      </Container>
      <Container className={styles.similarContainer}>
        <h2 className={styles.sectionTitle}>Similar Items</h2>
        <div
          className={styles.similarGrid}
          ref={scrollContainerRef}
          onScroll={updateScrollbar}
          onMouseDown={handleGridMouseDown}
        >
          {product.similarProducts.map((similar) => (
            <PhoneCard key={similar.id} product={similar} />
          ))}
        </div>

        {/* Barra de scroll personalizada */}
        <div className={styles.scrollbarContainer}>
          <div
            className={styles.scrollbarThumb}
            style={{
              width: `${scrollThumbWidth}%`,
              left: `${scrollThumbLeft}%`,
            }}
            onMouseDown={handleThumbMouseDown}
          />
        </div>
      </Container>
    </>
  );
};
