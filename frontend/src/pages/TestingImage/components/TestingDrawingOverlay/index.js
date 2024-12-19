import { useCallback } from 'react';
import useDrawingHandlers from './hooks/useDrawingHandlers';
import ExistingRectangles from './ExistingRectangles';
import CurrentDrawing from './CurrentDrawing';

function TestingDrawingOverlay({ dimensions, naturalDimensions, isDrawingMode }) {
  const {
    overlayRef,
    isDrawing,
    currentRect,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    scaleRect
  } = useDrawingHandlers({ dimensions, naturalDimensions, isDrawingMode });

  const getClassName = useCallback(() => {
    return `absolute inset-0 ${isDrawingMode ? 'cursor-crosshair' : ''}`;
  }, [isDrawingMode]);

  return (
    <div
      ref={overlayRef}
      className={getClassName()}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <ExistingRectangles 
        scaleRect={scaleRect}
        onDelete={handleDelete}
      />
      
      <CurrentDrawing 
        isDrawing={isDrawing}
        currentRect={currentRect}
        dimensions={dimensions}
        naturalDimensions={naturalDimensions}
      />
    </div>
  );
}

export default TestingDrawingOverlay;