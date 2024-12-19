import useInspectionStore from '../../../store/inspectionStore';
import useImageZoom from '../../../hooks/useImageZoom';
import ImageFrame from '../../../components/ImageFrame';
import ImageControls from './ImageDisplay/ImageControls';
import NavigationButtons from './ImageDisplay/NavigationButtons';
import InfoBar from './ImageDisplay/InfoBar';
import ImageViewer from './ImageDisplay/ImageViewer';
import LoadingState from './ImageDisplay/LoadingState';
import ErrorState from './ImageDisplay/ErrorState';

function ImageDisplayColumn() {
  const { 
    images, 
    currentImageIndex, 
    currentImage,
    loading, 
    error,
    setCurrentImageIndex 
  } = useInspectionStore();

  const {
    scale,
    position,
    isDragging,
    zoomIn,
    zoomOut,
    resetZoom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useImageZoom();

  const handlePrevious = () => {
    setCurrentImageIndex(currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1);
    resetZoom();
  };

  const handleNext = () => {
    setCurrentImageIndex(currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0);
    resetZoom();
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!images.length || !currentImage) return <ErrorState message="No images available" />;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <ImageControls 
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetZoom}
      />

      <div className="relative flex-1 bg-gray-100">
        <NavigationButtons 
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        <ImageViewer
          isDragging={isDragging}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: '0 0',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          >
            <ImageFrame image={currentImage} />
          </div>
        </ImageViewer>
      </div>

      <InfoBar 
        currentIndex={currentImageIndex}
        totalImages={images.length}
        imageName={currentImage.imageName}
        scale={scale}
      />
    </div>
  );
}

export default ImageDisplayColumn;