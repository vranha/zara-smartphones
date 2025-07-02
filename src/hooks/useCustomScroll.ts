import { useState, useRef, useCallback, useEffect } from 'react';

export const useCustomScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollThumbWidth, setScrollThumbWidth] = useState(0);
  const [scrollThumbLeft, setScrollThumbLeft] = useState(0);
  const isDragging = useRef(false);
  const isGridDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const updateScrollbar = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (maxScroll <= 0) {
      setScrollThumbWidth(100);
      setScrollThumbLeft(0);
      return;
    }

    const scrollRatio = container.scrollLeft / maxScroll;
    const thumbWidth = (container.clientWidth / container.scrollWidth) * 100;
    const thumbLeft = scrollRatio * (100 - thumbWidth);

    setScrollThumbWidth(thumbWidth);
    setScrollThumbLeft(thumbLeft);
  }, []);

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      scrollLeft: scrollContainerRef.current?.scrollLeft || 0,
    };
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleGridMouseDown = useCallback((e: React.MouseEvent) => {
    isGridDragging.current = true;
    dragStart.current = {
      x: e.clientX,
      scrollLeft: scrollContainerRef.current?.scrollLeft || 0,
    };
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;

    if (isDragging.current) {
      const deltaX = e.clientX - dragStart.current.x;
      const scrollbarWidth = container.clientWidth;
      const scrollRatio = deltaX / scrollbarWidth;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = dragStart.current.scrollLeft + scrollRatio * maxScroll;
    } else if (isGridDragging.current) {
      const deltaX = e.clientX - dragStart.current.x;
      const newScrollLeft = dragStart.current.scrollLeft - deltaX * 1.5;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    isGridDragging.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    updateScrollbar();
    window.addEventListener('resize', updateScrollbar);
    return () => window.removeEventListener('resize', updateScrollbar);
  }, [updateScrollbar]);

  return {
    scrollContainerRef,
    scrollThumbWidth,
    scrollThumbLeft,
    updateScrollbar,
    handleThumbMouseDown,
    handleGridMouseDown,
  };
};
