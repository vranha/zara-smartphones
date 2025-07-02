import { SearchInput } from '@/components/SearchInput/SearchInput';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

interface ProductsSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  debouncedSearchTerm: string;
}

export const ProductsSection = ({
  searchTerm,
  setSearchTerm,
  debouncedSearchTerm,
}: ProductsSectionProps) => {
  const { products, isLoading, error, resultsCount } = useProducts(debouncedSearchTerm);

  return (
    <>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resultsCount={resultsCount}
        isLoading={isLoading}
      />

      <main>
        <ProductGrid
          isLoading={isLoading}
          error={error}
          products={products}
          searchTerm={debouncedSearchTerm}
        />
      </main>
    </>
  );
};
