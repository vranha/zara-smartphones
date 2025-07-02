import { useState } from 'react';
import { ProductDetail as ProductDetailType } from '@/types/Product';
import styles from './ProductPurchasePanel.module.scss';
import { useCart } from '@/context/cart/CartContext';
import { CartItem } from '@/context/cart/CartContext';
import toast from 'react-hot-toast';

interface Props {
  product: ProductDetailType;
  selectedColor: ProductDetailType['colorOptions'][number] | null;
  setSelectedColor: (color: ProductDetailType['colorOptions'][number] | null) => void;
}

export const ProductPurchasePanel = ({ product, selectedColor, setSelectedColor }: Props) => {
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0]);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const { cart, dispatch } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedColor || !selectedStorage) {
      return;
    }

    const itemId = `${product.id}-${selectedColor.hexCode}-${selectedStorage.capacity}`;

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.find((item) => item.id === itemId);

    if (existingItem) {
      toast.error(`Este teléfono ya está en el carrito`);
      return;
    }

    const itemToAdd: CartItem = {
      id: `${product.id}-${selectedColor.hexCode}-${selectedStorage.capacity}`,
      name: product.name,
      brand: product.brand,
      price: product.basePrice ? product.basePrice : 0,
      imageUrl: selectedColor.imageUrl,
      color: selectedColor.name,
      storage: selectedStorage.capacity,
    };

    dispatch({ type: 'ADD_TO_CART', payload: itemToAdd });

    toast.success(`${product.brand} ${product.name} añadido al carrito`);
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
        onClick={handleSubmit}
        disabled={!selectedColor || !selectedStorage}
      >
        AÑADIR
      </button>
    </div>
  );
};
