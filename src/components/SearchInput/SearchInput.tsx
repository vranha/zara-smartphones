import { Icon } from '@/components/Icon/Icon';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  resultsCount: number;
  isLoading: boolean;
}

export const SearchInput = ({
  searchTerm,
  setSearchTerm,
  resultsCount,
  isLoading,
}: SearchInputProps) => {
  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className={styles.searchHeader}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Search for a smartphone..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <Icon name="close.svg" alt="Borrar búsqueda" size={10} />
          </button>
        )}
      </div>
      {!isLoading && <span className={styles.resultsCount}>{resultsCount} results</span>}
    </div>
  );
};
