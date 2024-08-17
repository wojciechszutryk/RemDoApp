import { useEffect, useRef, useState } from "react";

/**
 * Observes passed element resize
 * returns it's size after resize
 * Useful when we change some element's dimenscions dunamicly and we always need it's current size e.g. for animations
 */
export function useResizeObserver(element: HTMLDivElement | null) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const observer = useRef<ResizeObserver | null>(null);

  const cleanOb = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    if (!element) return;
    cleanOb();

    const ob = (observer.current = new ResizeObserver(([entry]) => {
      setRect(entry.target.getBoundingClientRect());
    }));
    ob.observe(element);

    return () => {
      cleanOb();
    };
  }, [element]);

  return rect;
}
