import { create } from 'zustand';
import { fetchImages } from '../services/imageService';

const useInspectionStore = create((set, get) => ({
  referenceNo: null,
  images: [],
  currentImageIndex: 0,
  currentImage: null,
  loading: false,
  error: null,

  setReferenceNo: (referenceNo) => {
    console.log('Setting reference number:', referenceNo);
    set({ referenceNo });
  },

  fetchImages: async () => {
    const { referenceNo } = get();
    if (!referenceNo) {
      console.error('Reference number is not set');
      return;
    }

    console.log('Fetching images for reference:', referenceNo);
    set({ loading: true, error: null });
    
    try {
      const imagesData = await fetchImages(referenceNo);
      console.log('Received images data:', imagesData);

      const formattedImages = imagesData.map((image) => ({
        ...image,
        referenceNo,
        imageName: image.imageName,
        imageUrl: image.imageUrl,
        dimensions: image.dimensions || { width: 1, height: 1 },
        damageInfo: image.damageInfo || [],
      }));

      console.log('Formatted images:', formattedImages);

      set({
        images: formattedImages,
        currentImage: formattedImages[0],
        currentImageIndex: 0,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching images:', error);
      set({ error: error.message, loading: false });
    }
  },

  setCurrentImageIndex: (index) => {
    const { images } = get();
    console.log('Setting current image index:', index, 'Total images:', images.length);
    
    if (index >= 0 && index < images.length) {
      set({
        currentImageIndex: index,
        currentImage: images[index],
      });
      console.log('Current image updated:', images[index]);
    }
  },

  updateDamageInfo: (newDamage) => {
    console.log('Adding new damage:', newDamage);
    const { currentImageIndex, images } = get();
    const updatedImages = [...images];
    const currentImage = { ...updatedImages[currentImageIndex] };
    
    currentImage.damageInfo = [...(currentImage.damageInfo || []), {
      damageType: newDamage.damageType,
      coordinates: {
        x: newDamage.x,
        y: newDamage.y,
        width: newDamage.width,
        height: newDamage.height,
      }
    }];
    
    updatedImages[currentImageIndex] = currentImage;
    
    console.log('Updated damage info:', currentImage.damageInfo);
    set({
      images: updatedImages,
      currentImage: currentImage,
    });
  },

  deleteDamageInfo: (index) => {
    console.log('Store: Deleting damage at index:', index);
    const { currentImageIndex, images } = get();
    
    // Log current state
    console.log('Store: Current state before deletion:', {
      currentImageIndex,
      currentDamageInfo: images[currentImageIndex]?.damageInfo
    });
    
    // Create deep copies to ensure state updates
    const updatedImages = [...images];
    const currentImage = { 
      ...updatedImages[currentImageIndex],
      damageInfo: [...(updatedImages[currentImageIndex].damageInfo || [])]
    };
    
    // Remove the damage marking at the specified index
    currentImage.damageInfo = currentImage.damageInfo.filter((_, i) => i !== index);
    updatedImages[currentImageIndex] = currentImage;
    
    console.log('Store: Updated state after deletion:', {
      damageInfo: currentImage.damageInfo,
      totalDamages: currentImage.damageInfo.length
    });
    
    // Update both images array and currentImage to ensure consistency
    set({
      images: updatedImages,
      currentImage: currentImage,
    });
  },
}));

export default useInspectionStore;