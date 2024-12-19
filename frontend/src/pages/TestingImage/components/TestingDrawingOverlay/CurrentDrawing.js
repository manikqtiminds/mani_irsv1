import { memo } from 'react';

function CurrentDrawing({ isDrawing, currentRect, dimensions, naturalDimensions }) {
  if (!isDrawing || !currentRect) return null;

  const scaleX = dimensions.width / naturalDimensions.width;
  const scaleY = dimensions.height / naturalDimensions.height;

  const style = {
    left: `${Math.min(currentRect.x, currentRect.x + currentRect.width) * scaleX}px`,
    top: `${Math.min(currentRect.y, currentRect.y + currentRect.height) * scaleY}px`,
    width: `${Math.abs(currentRect.width) * scaleX}px`,
    height: `${Math.abs(currentRect.height) * scaleY}px`,
  };

  return (
    <div
      className="absolute border-2 border-blue-500 bg-blue-500/20"
      style={style}
    />
  );
}

export default memo(CurrentDrawing);