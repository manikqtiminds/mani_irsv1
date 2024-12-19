import { create } from 'zustand';
import { fetchTestingImages } from '../services/testingImageService';

const useTestingStore = create((set, get) => ({
  referenceNo: null,
  images: [],
  currentImageIndex: 0,
  currentImage: null,
  loading: false,
  error: null,
  isDrawingMode: false,

  setReferenceNo: (referenceNo) => {
    console.log('TestingStore: Setting reference number:', referenceNo);
    set({ referenceNo });
  },

  fetchImages: async () => {
    const { referenceNo } = get();
    if (!referenceNo) {
      console.error('TestingStore: Reference number is not set');
      return;
    }

    set({ loading: true, error: null });
    
    try {
      const imagesData = await fetchTestingImages(referenceNo);
      
      const formattedImages = imagesData.map((image) => ({
        ...image,
        referenceNo,
        imageName: image.imageName,
        imageUrl: image.imageUrl,
        dimensions: image.dimensions || { width: 800, height: 600 },
        damageRects: image.damageRects || [],
      }));

      set({
        images: formattedImages,
        currentImage: formattedImages[0],
        currentImageIndex: 0,
        loading: false,
      });
    } catch (error) {
      console.error('TestingStore: Error fetching images:', error);
      set({ error: error.message, loading: false });
    }
  },

  setCurrentImageIndex: (index) => {
    const { images } = get();
    if (index >= 0 && index < images.length) {
      set({
        currentImageIndex: index,
        currentImage: images[index],
      });
    }
  },

  setDrawingMode: (enabled) => {
    set({ isDrawingMode: enabled });
  },

  updateRect: (rectId, updatedRect) => {
    const { currentImageIndex, images } = get();
    
    const updatedImages = [...images];
    const currentImage = { ...updatedImages[currentImageIndex] };
    
    // If the rect doesn't exist, add it; otherwise, update it
    const existingRectIndex = currentImage.damageRects?.findIndex(r => r.id === rectId);
    if (existingRectIndex === -1) {
      currentImage.damageRects = [...(currentImage.damageRects || []), updatedRect];
    } else {
      currentImage.damageRects = currentImage.damageRects.map(rect => 
        rect.id === rectId ? { ...rect, ...updatedRect } : rect
      );
    }
    
    updatedImages[currentImageIndex] = currentImage;

    set({
      images: updatedImages,
      currentImage
    });
  },

  deleteRect: (rectId) => {
    const { currentImageIndex, images } = get();
    
    const updatedImages = [...images];
    const currentImage = { ...updatedImages[currentImageIndex] };
    currentImage.damageRects = currentImage.damageRects.filter(rect => rect.id !== rectId);
    updatedImages[currentImageIndex] = currentImage;

    set({
      images: updatedImages,
      currentImage
    });
  },

  clearStore: () => {
    set({
      referenceNo: null,
      images: [],
      currentImageIndex: 0,
      currentImage: null,
      loading: false,
      error: null,
      isDrawingMode: false
    });
  }
}));

export default useTestingStore;