import { useRef } from 'react';
import useImageDimensions from './hooks/useImageDimensions';
import LoadingSpinner from './components/LoadingSpinner';
import ImageDisplay from './components/ImageDisplay';

function ImageFrame({ image, isDrawingMode }) {
  const frameRef = useRef(null);
  const { dimensions, naturalDimensions, isLoading } = useImageDimensions(frameRef, image?.imageUrl);

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
      className="relative w-full h-full min-h-[500px] min-w-[500px]"
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : dimensions && naturalDimensions ? (
        <ImageDisplay
          image={image}
          dimensions={dimensions}
          naturalDimensions={naturalDimensions}
          isDrawingMode={isDrawingMode}
        />
      ) : null}
    </div>
  );
}

export default ImageFrame;