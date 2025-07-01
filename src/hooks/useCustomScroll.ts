import { useState, useRef, useCallback, useEffect } from 'react';

export const useCustomScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollThumbWidth, setScrollThumbWidth] = useState(0);
  const [scrollThumbLeft, setScrollThumbLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isGridDragging, setIsGridDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);

  const updateScrollbar = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollRatio = container.scrollLeft / (container.scrollWidth - container.clientWidth);
      const thumbWidth = (container.clientWidth / container.scrollWidth) * 100;
      const thumbLeft = scrollRatio * (100 - thumbWidth);

      setScrollThumbWidth(thumbWidth);
      setScrollThumbLeft(thumbLeft);
    }
  }, []);

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    e.preventDefault();
  }, []);

  const handleGridMouseDown = useCallback((e: React.MouseEvent) => {
    setIsGridDragging(true);
    setDragStartX(e.clientX);
    setDragStartScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
    e.preventDefault();
  }, []);

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
  }, [updateScrollbar]);

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

  return {
    scrollContainerRef,
    scrollThumbWidth,
    scrollThumbLeft,
    updateScrollbar,
    handleThumbMouseDown,
    handleGridMouseDown,
  };
};
