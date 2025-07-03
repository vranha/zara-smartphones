import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '@/components/SearchInput/SearchInput';

describe('SearchInput', () => {
  const mockSetSearchTerm = jest.fn();

  beforeEach(() => {
    mockSetSearchTerm.mockClear();
  });

  test('should render search input with placeholder', () => {
    render(
      <SearchInput
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        resultsCount={0}
        isLoading={false}
      />,
    );

    expect(screen.getByPlaceholderText('Search for a smartphone...')).toBeInTheDocument();
  });

  test('should display current search term', () => {
    render(
      <SearchInput
        searchTerm="iPhone"
        setSearchTerm={mockSetSearchTerm}
        resultsCount={5}
        isLoading={false}
      />,
    );

    expect(screen.getByDisplayValue('iPhone')).toBeInTheDocument();
  });

  test('should call setSearchTerm when typing', () => {
    render(
      <SearchInput
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        resultsCount={0}
        isLoading={false}
      />,
    );

    const input = screen.getByPlaceholderText('Search for a smartphone...');
    fireEvent.change(input, { target: { value: 'Samsung' } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith('Samsung');
  });

  test('should show clear button when search term exists', () => {
    render(
      <SearchInput
        searchTerm="iPhone"
        setSearchTerm={mockSetSearchTerm}
        resultsCount={5}
        isLoading={false}
      />,
    );

    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  test('should not show clear button when search term is empty', () => {
    render(
      <SearchInput
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        resultsCount={0}
        isLoading={false}
      />,
    );

    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });

  test('should clear search when clear button is clicked', () => {
    render(
      <SearchInput
        searchTerm="iPhone"
        setSearchTerm={mockSetSearchTerm}
        resultsCount={5}
        isLoading={false}
      />,
    );

    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);

    expect(mockSetSearchTerm).toHaveBeenCalledWith('');
  });

  test('should show results count when not loading', () => {
    render(
      <SearchInput
        searchTerm="iPhone"
        setSearchTerm={mockSetSearchTerm}
        resultsCount={5}
        isLoading={false}
      />,
    );

    expect(screen.getByText('5 results')).toBeInTheDocument();
  });

  test('should not show results count when loading', () => {
    render(
      <SearchInput
        searchTerm="iPhone"
        setSearchTerm={mockSetSearchTerm}
        resultsCount={5}
        isLoading={true}
      />,
    );

    expect(screen.queryByText('5 results')).not.toBeInTheDocument();
  });

  test('should handle zero results', () => {
    render(
      <SearchInput
        searchTerm="xyz"
        setSearchTerm={mockSetSearchTerm}
        resultsCount={0}
        isLoading={false}
      />,
    );

    expect(screen.getByText('0 results')).toBeInTheDocument();
  });
});
