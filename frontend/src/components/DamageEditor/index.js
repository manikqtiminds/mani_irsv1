import { useEffect } from 'react';
import useInspectionStore from '../../store/inspectionStore';
import { useDrawing } from './hooks/useDrawing';
import DrawingArea from './DrawingArea';
import DrawingControls from './DrawingControls';

function DamageEditor({ scale, position, isDrawingMode, setIsDrawingMode }) {
  const { currentImage, updateDamageInfo } = useInspectionStore();

  const {
    containerRef,
    currentRect,
    selectedDamageType,
    setSelectedDamageType,
    startDrawing,
    updateDrawing,
    finishDrawing,
    cleanup
  } = useDrawing({
    onSave: updateDamageInfo,
    scale,
    position,
    currentImage,
    isDrawingMode
  });

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return (
    <div className="absolute inset-0" ref={containerRef}>
      <DrawingControls
        isDrawingMode={isDrawingMode}
        setIsDrawingMode={setIsDrawingMode}
        selectedDamageType={selectedDamageType}
        setSelectedDamageType={setSelectedDamageType}
      />

      <DrawingArea
        isDrawingMode={isDrawingMode}
        scale={scale}
        currentRect={currentRect}
        onMouseDown={startDrawing}
        onMouseMove={updateDrawing}
        onMouseUp={finishDrawing}
        onMouseLeave={finishDrawing}
        onTouchStart={startDrawing}
        onTouchMove={updateDrawing}
        onTouchEnd={finishDrawing}
      />
    </div>
  );
}

export default DamageEditor;