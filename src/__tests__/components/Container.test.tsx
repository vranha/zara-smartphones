import { render, screen } from '@testing-library/react';
import { Container } from '@/components/Container/Container';

describe('Container', () => {
  test('should render children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>,
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('should apply default container class', () => {
    const { container } = render(
      <Container>
        <div>Test content</div>
      </Container>,
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('container');
  });

  test('should combine custom className with container class', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <Container className={customClass}>
        <div>Test content</div>
      </Container>,
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement.className).toContain('container');
    expect(containerElement.className).toContain(customClass);
  });

  test('should handle empty className prop', () => {
    const { container } = render(
      <Container className="">
        <div>Test content</div>
      </Container>,
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('container');
  });

  test('should render multiple children', () => {
    render(
      <Container>
        <div>First child</div>
        <span>Second child</span>
        <p>Third child</p>
      </Container>,
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  test('should handle no className prop', () => {
    const { container } = render(
      <Container>
        <div>Test content</div>
      </Container>,
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('container');
  });

  test('should render complex children structure', () => {
    render(
      <Container className="wrapper">
        <header>Header</header>
        <main>
          <section>Section content</section>
        </main>
        <footer>Footer</footer>
      </Container>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('should handle undefined className', () => {
    const { container } = render(
      <Container className={undefined}>
        <div>Test content</div>
      </Container>,
    );

    const containerElement = container.firstChild as HTMLElement;
    expect(containerElement).toHaveClass('container');
  });
});
