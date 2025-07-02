import { useState } from 'react';
import { NextPage } from 'next';
import { useDebounce } from '@/hooks/useDebounce';
import { Container } from '@/components/Container/Container';
import { ProductsSection } from '@/components/ProductsSection/ProductsSection';

const HomePage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <Container>
      <ProductsSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        debouncedSearchTerm={debouncedSearchTerm}
      />
    </Container>
  );
};

export default HomePage;
