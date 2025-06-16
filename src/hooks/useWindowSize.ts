import { useState, useLayoutEffect } from 'react';

interface UseWindowSizeRes {
  width: number;
  height: number;
}

export const useWindowSize = (): UseWindowSizeRes => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useLayoutEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = (): void => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // it will only update after the user has finished resizing or paused for 150ms
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return windowSize;
};
