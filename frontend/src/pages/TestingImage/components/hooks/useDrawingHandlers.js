import { useCallback, useRef, useState } from 'react';
import useTestingStore from '../../../../../store/testingStore';
import { getScaledPoint } from '../utils/coordinates';

function useDrawingHandlers({ dimensions, naturalDimensions, isDrawingMode }) {
  const overlayRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentRect, setCurrentRect] = useState(null);
  const { deleteRect, updateRect } = useTestingStore();

  const handleMouseDown = useCallback((e) => {
    if (!isDrawingMode) return;
    
    const point = getScaledPoint(e, overlayRef.current, dimensions, naturalDimensions);
    if (point) {
      setIsDrawing(true);
      setStartPoint(point);
      setCurrentRect({
        id: Date.now(),
        x: point.x,
        y: point.y,
        width: 0,
        height: 0
      });
    }
  }, [isDrawingMode, dimensions, naturalDimensions]);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawingMode || !isDrawing || !startPoint) return;

    const point = getScaledPoint(e, overlayRef.current, dimensions, naturalDimensions);
    if (!point) return;

    setCurrentRect(prev => ({
      ...prev,
      width: point.x - startPoint.x,
      height: point.y - startPoint.y
    }));
  }, [isDrawingMode, isDrawing, startPoint, dimensions, naturalDimensions]);

  const handleMouseUp = useCallback(() => {
    if (!isDrawingMode || !isDrawing || !currentRect) return;

    if (Math.abs(currentRect.width) > 10 && Math.abs(currentRect.height) > 10) {
      const normalizedRect = {
        id: currentRect.id,
        x: currentRect.width < 0 ? currentRect.x + currentRect.width : currentRect.x,
        y: currentRect.height < 0 ? currentRect.y + currentRect.height : currentRect.y,
        width: Math.abs(currentRect.width),
        height: Math.abs(currentRect.height)
      };

      updateRect(normalizedRect.id, normalizedRect);
    }

    setIsDrawing(false);
    setStartPoint(null);
    setCurrentRect(null);
  }, [isDrawingMode, isDrawing, currentRect, updateRect]);

  const handleDelete = useCallback((rectId, e) => {
    e.stopPropagation();
    deleteRect(rectId);
  }, [deleteRect]);

  const scaleRect = useCallback((rect) => {
    const scaleX = dimensions.width / naturalDimensions.width;
    const scaleY = dimensions.height / naturalDimensions.height;
    
    return {
      ...rect,
      x: rect.x * scaleX,
      y: rect.y * scaleY,
      width: rect.width * scaleX,
      height: rect.height * scaleY,
    };
  }, [dimensions, naturalDimensions]);

  return {
    overlayRef,
    isDrawing,
    currentRect,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDelete,
    scaleRect
  };
}

export default useDrawingHandlers;