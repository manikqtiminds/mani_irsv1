import { memo } from 'react';
import TestingDrawingOverlay from '../TestingDrawingOverlay';

function ImageContainer({ image, dimensions, naturalDimensions, isDrawingMode }) {
  if (!dimensions?.width || !naturalDimensions) return null;

  return (
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
  );
}

export default memo(ImageContainer);