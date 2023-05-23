import { useState, useEffect } from 'react';

export function useOnScreen(ref, margin = '0px', debounceTime = 900) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    let timeoutId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setIntersecting(true);
          }, debounceTime);
        } else {
          clearTimeout(timeoutId);
          setIntersecting(false);
        }
      },
      { margin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      clearTimeout(timeoutId);
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [ref, margin, debounceTime]);

  return isIntersecting;
}
