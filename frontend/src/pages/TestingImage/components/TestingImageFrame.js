import { useEffect, useRef, useState, memo } from 'react';
import TestingDrawingOverlay from './TestingDrawingOverlay';

function ImageFrame({ image, isDrawingMode }) {
  const frameRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);
  const [naturalDimensions, setNaturalDimensions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!image?.imageUrl || !frameRef.current) return;

    const updateDimensions = (naturalSize) => {
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
    };

    // Load image to get natural dimensions
    const img = new Image();
    img.onload = () => {
      const naturalSize = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };
      updateDimensions(naturalSize);
    };
    img.src = image.imageUrl;

    // Handle window resize
    const handleResize = () => {
      if (naturalDimensions) {
        updateDimensions(naturalDimensions);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [image?.imageUrl, naturalDimensions]);

  if (!image?.imageUrl) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        <p>No image available</p>
      </div>
    );
  }

  return (
    <div
      ref={frameRef}
      className="relative flex items-center justify-center h-full w-full"
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div
          className="relative"
          style={{
            width: dimensions.width,
            height: dimensions.height,
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        >
          <img
            src={image.imageUrl}
            alt={image.imageName || "Vehicle inspection"}
            className="absolute top-0 left-0 w-full h-full object-contain"
            onError={(e) => {
              console.error('Image failed to load:', e);
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
            }}
          />

          <TestingDrawingOverlay
            dimensions={dimensions}
            naturalDimensions={naturalDimensions}
            isDrawingMode={isDrawingMode}
          />
        </div>
      )}
    </div>
  );
}

export default memo(ImageFrame);