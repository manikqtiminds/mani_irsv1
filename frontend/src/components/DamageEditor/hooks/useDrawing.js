import { useState, useRef, useCallback } from 'react';
import { getScaledPoint } from '../utils/drawingUtils';

export function useDrawing({ onSave, scale, position, currentImage, isDrawingMode }) {
  const [startPoint, setStartPoint] = useState(null);
  const [currentRect, setCurrentRect] = useState(null);
  const [selectedDamageType, setSelectedDamageType] = useState(0);
  const drawingRef = useRef(false);
  const containerRef = useRef(null);

  const startDrawing = useCallback((e) => {
    if (!isDrawingMode) return;
    e.preventDefault();
    
    const point = getScaledPoint(
      e.type.includes('touch') ? e.touches[0].clientX : e.clientX,
      e.type.includes('touch') ? e.touches[0].clientY : e.clientY,
      containerRef.current,
      scale,
      position,
      currentImage
    );
    
    if (!point) return;
    
    drawingRef.current = true;
    setStartPoint(point);
    setCurrentRect({
      x: point.x,
      y: point.y,
      width: 0,
      height: 0,
      damageType: selectedDamageType
    });
  }, [isDrawingMode, selectedDamageType, scale, position, currentImage]);

  const updateDrawing = useCallback((e) => {
    if (!drawingRef.current || !startPoint) return;
    e.preventDefault();
    
    const point = getScaledPoint(
      e.type.includes('touch') ? e.touches[0].clientX : e.clientX,
      e.type.includes('touch') ? e.touches[0].clientY : e.clientY,
      containerRef.current,
      scale,
      position,
      currentImage
    );
    
    if (!point) return;

    setCurrentRect(prev => ({
      ...prev,
      width: point.x - startPoint.x,
      height: point.y - startPoint.y
    }));
  }, [startPoint, scale, position, currentImage]);

  const finishDrawing = useCallback(() => {
    if (!drawingRef.current || !currentRect) return;
    drawingRef.current = false;

    // Only save if the rectangle is large enough
    if (Math.abs(currentRect.width) > 10 && Math.abs(currentRect.height) > 10) {
      const normalizedRect = {
        x: currentRect.width < 0 ? currentRect.x + currentRect.width : currentRect.x,
        y: currentRect.height < 0 ? currentRect.y + currentRect.height : currentRect.y,
        width: Math.abs(currentRect.width),
        height: Math.abs(currentRect.height),
        damageType: currentRect.damageType
      };
      onSave(normalizedRect);
    }

    setCurrentRect(null);
    setStartPoint(null);
  }, [currentRect, onSave]);

  const cleanup = useCallback(() => {
    drawingRef.current = false;
    setCurrentRect(null);
    setStartPoint(null);
  }, []);

  return {
    containerRef,
    currentRect,
    selectedDamageType,
    setSelectedDamageType,
    startDrawing,
    updateDrawing,
    finishDrawing,
    cleanup
  };
}