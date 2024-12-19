import { memo } from 'react';
import DamageOverlay from '../../DamageOverlay';

function ImageContainer({ image, dimensions, naturalDimensions, isDrawingMode }) {
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
        className="w-full h-full object-contain"
        onError={(e) => {
          console.error('Image failed to load:', e);
          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
        }}
      />

      <DamageOverlay
        damageInfo={image.damageInfo}
        imageDimensions={naturalDimensions}
        frameDimensions={dimensions}
      />
    </div>
  );
}

export default memo(ImageContainer);