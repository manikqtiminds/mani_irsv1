import { useEffect, useRef, useState } from "react";
import DamageOverlay from "../DamageOverlay";

function ImageFrame({ image }) {
  const frameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!image?.dimensions) {
      console.warn('Image or dimensions missing:', image);
      return;
    }

    const frame = frameRef.current;
    if (!frame) {
      console.warn('Frame ref not available');
      return;
    }

    const updateFrameDimensions = () => {
      const container = frame.parentElement;
      if (!container) {
        console.warn('Container element not found');
        return;
      }

      // Set minimum dimensions
      const minWidth = 500;
      const minHeight = 400;

      const containerWidth = Math.max(container.clientWidth, minWidth);
      const containerHeight = Math.max(container.clientHeight, minHeight);
      const imageAspect = image.dimensions.width / image.dimensions.height;
      const containerAspect = containerWidth / containerHeight;

      let frameWidth, frameHeight;

      if (containerAspect > imageAspect) {
        frameHeight = containerHeight;
        frameWidth = frameHeight * imageAspect;
      } else {
        frameWidth = containerWidth;
        frameHeight = frameWidth / imageAspect;
      }

      // Ensure minimum dimensions
      frameWidth = Math.max(frameWidth, minWidth);
      frameHeight = Math.max(frameHeight, minHeight);

      console.log('Updating frame dimensions:', {
        container: { width: containerWidth, height: containerHeight },
        frame: { width: frameWidth, height: frameHeight }
      });

      setDimensions({ width: frameWidth, height: frameHeight });
    };

    // Initial update
    updateFrameDimensions();

    // Handle window resize
    const resizeObserver = new ResizeObserver(updateFrameDimensions);
    resizeObserver.observe(frame.parentElement);

    return () => resizeObserver.disconnect();
  }, [image]);

  if (!image?.dimensions) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        <p>Loading image...</p>
      </div>
    );
  }

  return (
    <div
      ref={frameRef}
      className="relative flex items-center justify-center min-h-[400px] min-w-[500px]"
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <img
        src={image.imageUrl}
        alt="Vehicle damage"
        className="w-full h-full object-contain"
      />
      <DamageOverlay
        damageInfo={image.damageInfo}
        imageDimensions={image.dimensions}
        frameDimensions={dimensions}
      />
    </div>
  );
}

export default ImageFrame;