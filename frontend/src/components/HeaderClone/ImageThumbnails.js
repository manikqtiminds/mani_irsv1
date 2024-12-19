import { useEffect } from 'react';
import useInspectionStore from '../../store/inspectionStore';

function ImageThumbnails() {
  const { 
    images, 
    currentImageIndex, 
    loading, 
    error,
    setCurrentImageIndex 
  } = useInspectionStore();

  useEffect(() => {
    // Scroll selected thumbnail into view
    const selectedThumb = document.querySelector(`[data-index="${currentImageIndex}"]`);
    if (selectedThumb) {
      selectedThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [currentImageIndex]);

  if (loading) {
    return (
      <div className="h-16 flex items-center justify-center">
        <p className="text-sm text-gray-300">Loading images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-16 flex items-center justify-center">
        <p className="text-sm text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
      {images.map((image, index) => (
        <button
          key={index}
          data-index={index}
          onClick={() => setCurrentImageIndex(index)}
          className={`
            relative
            flex-shrink-0
            w-16 h-16
            rounded-lg
            overflow-hidden
            transition
            hover:ring-2 hover:ring-blue-400
            focus:outline-none
            ${index === currentImageIndex ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          <img
            src={image.imageUrl}
            alt={`View ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-1 right-1 text-[10px] text-white bg-black/50 px-1 rounded">
            {index + 1}
          </div>
        </button>
      ))}
    </div>
  );
}

export default ImageThumbnails;