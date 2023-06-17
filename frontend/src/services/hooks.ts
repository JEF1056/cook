import { useState } from "react";

import { useEventListener, useIsomorphicLayoutEffect } from "usehooks-ts";

interface WindowSize {
  width: number;
  height: number;
  ratio: number;
}

export function useWindowSize(): WindowSize {
  const isLandscape = window.innerHeight <= window.innerWidth;

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    ratio: isLandscape
      ? window.innerWidth / window.innerHeight
      : window.innerHeight / window.innerWidth,
  });

  const handleSize = () => {
    const isLandscape = window.innerHeight <= window.innerWidth;

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: isLandscape
        ? window.innerWidth / window.innerHeight
        : window.innerHeight / window.innerWidth,
    });
  };

  useEventListener("resize", handleSize);

  // Set size at the first client-side load
  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
}
