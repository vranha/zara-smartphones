import { useState, useMemo } from 'react';
import { ProductDetail as ProductDetailType } from '@/types/Product';
import styles from './ProductPurchasePanel.module.scss';

// Podrías incluso crear componentes más pequeños para los selectores de color y almacenamiento.

interface Props {
  product: ProductDetailType;
  selectedColor: ProductDetailType['colorOptions'][number] | null;
  setSelectedColor: (color: ProductDetailType['colorOptions'][number] | null) => void;
}

export const ProductPurchasePanel = ({ product, selectedColor, setSelectedColor }: Props) => {
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0]);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

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
          <div className={styles.optionsContainerColor}>
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
  );
};
