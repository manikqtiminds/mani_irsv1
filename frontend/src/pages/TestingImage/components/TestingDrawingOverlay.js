import { useCallback, useRef, useState } from 'react';
import { X } from 'lucide-react';
import useTestingStore from '../../../store/testingStore';

function TestingDrawingOverlay({ dimensions, naturalDimensions, isDrawingMode }) {
  const overlayRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [currentRect, setCurrentRect] = useState(null);
  const { currentImage, deleteRect, updateRect } = useTestingStore();

  const getScaledPoint = useCallback((e) => {
    if (!overlayRef.current || !naturalDimensions) return null;

    const rect = overlayRef.current.getBoundingClientRect();
    const scaleX = naturalDimensions.width / dimensions.width;
    const scaleY = naturalDimensions.height / dimensions.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    console.log('Scaled point:', { x, y, scaleX, scaleY });
    return { x, y };
  }, [dimensions, naturalDimensions]);

  const handleMouseDown = (e) => {
    if (!isDrawingMode) return;
    
    const point = getScaledPoint(e);
    if (point) {
      console.log('Starting drawing at:', point);
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
  };

  const handleMouseMove = (e) => {
    if (!isDrawingMode || !isDrawing || !startPoint) return;

    const point = getScaledPoint(e);
    if (!point) return;

    console.log('Drawing in progress:', { start: startPoint, current: point });
    setCurrentRect(prev => ({
      ...prev,
      width: point.x - startPoint.x,
      height: point.y - startPoint.y
    }));
  };

  const handleMouseUp = () => {
    if (!isDrawingMode || !isDrawing || !currentRect) return;

    console.log('Finishing drawing:', currentRect);

    // Only save if rectangle is large enough
    if (Math.abs(currentRect.width) > 10 && Math.abs(currentRect.height) > 10) {
      const normalizedRect = {
        id: currentRect.id,
        x: currentRect.width < 0 ? currentRect.x + currentRect.width : currentRect.x,
        y: currentRect.height < 0 ? currentRect.y + currentRect.height : currentRect.y,
        width: Math.abs(currentRect.width),
        height: Math.abs(currentRect.height)
      };

      console.log('Saving rectangle:', normalizedRect);
      updateRect(normalizedRect.id, normalizedRect);
    }

    setIsDrawing(false);
    setStartPoint(null);
    setCurrentRect(null);
  };

  const handleDelete = (rectId, e) => {
    e.stopPropagation();
    console.log('Deleting rectangle:', rectId);
    deleteRect(rectId);
  };

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

  return (
    <div
      ref={overlayRef}
      className={`absolute inset-0 ${isDrawingMode ? 'cursor-crosshair' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Existing rectangles */}
      {currentImage?.damageRects?.map((rect) => {
        const scaled = scaleRect(rect);
        console.log('Rendering existing rectangle:', { original: rect, scaled });
        return (
          <div
            key={rect.id}
            className="absolute border-2 border-blue-500 bg-blue-500/20"
            style={{
              left: `${scaled.x}px`,
              top: `${scaled.y}px`,
              width: `${scaled.width}px`,
              height: `${scaled.height}px`,
            }}
          >
            <button
              onClick={(e) => handleDelete(rect.id, e)}
              className="absolute -top-6 -right-2 bg-black/75 text-white p-1 rounded-full hover:bg-black/90 transition-colors"
              title="Delete rectangle"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}

      {/* Currently drawing rectangle */}
      {isDrawing && currentRect && (
        <div
          className="absolute border-2 border-blue-500 bg-blue-500/20"
          style={{
            left: `${Math.min(currentRect.x, currentRect.x + currentRect.width) / (naturalDimensions.width / dimensions.width)}px`,
            top: `${Math.min(currentRect.y, currentRect.y + currentRect.height) / (naturalDimensions.height / dimensions.height)}px`,
            width: `${Math.abs(currentRect.width) / (naturalDimensions.width / dimensions.width)}px`,
            height: `${Math.abs(currentRect.height) / (naturalDimensions.height / dimensions.height)}px`,
          }}
        />
      )}
    </div>
  );
}

export default TestingDrawingOverlay;