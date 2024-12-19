import { useState, useCallback, useEffect } from 'react';

function useImageDimensions(frameRef, imageUrl) {
  const [dimensions, setDimensions] = useState(null);
  const [naturalDimensions, setNaturalDimensions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculateDimensions = useCallback((container, naturalSize) => {
    if (!container || !naturalSize) return null;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const imageAspect = naturalSize.width / naturalSize.height;

    let frameWidth, frameHeight;

    // Calculate dimensions to fit container while maintaining aspect ratio
    if (containerWidth / containerHeight > imageAspect) {
      frameHeight = Math.min(containerHeight, naturalSize.height);
      frameWidth = frameHeight * imageAspect;
    } else {
      frameWidth = Math.min(containerWidth, naturalSize.width);
      frameHeight = frameWidth / imageAspect;
    }

    return { width: frameWidth, height: frameHeight };
  }, []);

  useEffect(() => {
    if (!imageUrl || !frameRef.current) return;

    setIsLoading(true);
    const img = new Image();
    
    img.onload = () => {
      const naturalSize = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };
      
      const newDimensions = calculateDimensions(frameRef.current, naturalSize);
      if (newDimensions) {
        setDimensions(newDimensions);
        setNaturalDimensions(naturalSize);
      }
      setIsLoading(false);
    };

    img.onerror = () => {
      console.error('Failed to load image:', imageUrl);
      setIsLoading(false);
    };

    img.src = imageUrl;

    const handleResize = () => {
      if (naturalDimensions) {
        const newDimensions = calculateDimensions(frameRef.current, naturalDimensions);
        if (newDimensions) {
          setDimensions(newDimensions);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageUrl, calculateDimensions, naturalDimensions]);

  return {
    dimensions,
    naturalDimensions,
    isLoading
  };
}

export default useImageDimensions;