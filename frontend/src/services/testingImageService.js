import axios from 'axios';
import apiUrl from '../config/apiConfig';

export const fetchTestingImages = async (referenceNo) => {
  console.log('TestingImageService: Fetching images for reference:', referenceNo);
  
  try {
    const response = await axios.get(`${apiUrl}/api/images/${referenceNo}`);
    console.log('TestingImageService: API response:', response.data);

    // Process images with additional logging
    const processedImages = response.data.map((image, index) => {
      console.log(`TestingImageService: Processing image ${index + 1}:`, image);
      
      return {
        ...image,
        imageUrl: image.imageUrl,
        imageName: image.imageName || `Image ${index + 1}`,
        dimensions: image.dimensions || {
          width: 800,
          height: 600
        }
      };
    });

    console.log('TestingImageService: Processed all images:', {
      count: processedImages.length,
      firstImage: processedImages[0]
    });

    return processedImages;
  } catch (error) {
    console.error('TestingImageService: Error fetching images:', {
      error: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error('Failed to fetch images for testing');
  }
};