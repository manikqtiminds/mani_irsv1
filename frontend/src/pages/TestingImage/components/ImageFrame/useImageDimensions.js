import { useState, useCallback } from 'react';

function useImageDimensions(frameRef) {
  const [dimensions, setDimensions] = useState(null);
  const [naturalDimensions, setNaturalDimensions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateDimensions = useCallback((naturalSize) => {
    if (!frameRef.current) return;

    const container = frameRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const imageAspect = naturalSize.width / naturalSize.height;

    let frameWidth, frameHeight;

    // Calculate dimensions to fit container while maintaining aspect ratio
    if (containerWidth / containerHeight > imageAspect) {
      // Container is wider than image aspect ratio
      frameHeight = containerHeight;
      frameWidth = frameHeight * imageAspect;
    } else {
      // Container is taller than image aspect ratio
      frameWidth = containerWidth;
      frameHeight = frameWidth / imageAspect;
    }

    console.log('Calculated dimensions:', {
      container: { width: containerWidth, height: containerHeight },
      frame: { width: frameWidth, height: frameHeight },
      natural: naturalSize
    });

    setDimensions({ width: frameWidth, height: frameHeight });
    setNaturalDimensions(naturalSize);
    setIsLoading(false);
  }, []);

  return {
    dimensions,
    naturalDimensions,
    isLoading,
    updateDimensions
  };
}

export default useImageDimensions;