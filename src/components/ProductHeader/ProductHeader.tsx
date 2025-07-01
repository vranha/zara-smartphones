import { useRouter } from 'next/router';
import { Container } from '@/components/Container/Container';
import { Icon } from '@/components/Icon/Icon';
import styles from './ProductHeader.module.scss';

const ProductHeader = () => {
  const router = useRouter();
  const handleGoBack = () => router.push('/');

  return (
    <Container className={styles.headerContainer}>
      <button
        className={styles.backButton}
        onClick={handleGoBack}
        aria-label="Volver a la página principal"
      >
        <Icon name="arrow-back.svg" alt="Flecha atrás" size={20} />
        <span>Back</span>
      </button>
    </Container>
  );
};

export default ProductHeader;
