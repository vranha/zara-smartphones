import { Container } from '@/components/Container/Container';
import { CartHeader } from '@/components/CartHeader/CartHeader';
import { CartItem } from '@/components/CartItem/CartItem';
import { CartFooter } from '@/components/CartFooter/CartFooter';
import { EmptyCart } from '@/components/EmptyCart/EmptyCart';
import { useCartPage } from '@/hooks/useCartPage';
import styles from './CartContent.module.scss';

export const CartContent = () => {
  const { cart, totalPrice, handleRemoveItem, handlePay } = useCartPage();

  return (
    <>
      <CartHeader itemCount={cart.length} />
      <Container className={styles.cartContainer}>
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className={styles.cartItemList}>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
              ))}
            </div>
            <CartFooter totalPrice={totalPrice} onPay={handlePay} />
          </>
        )}
      </Container>
    </>
  );
};
