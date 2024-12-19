export const getScaledPoint = (clientX, clientY, container, scale, position, currentImage) => {
    if (!container) return null;
    
    const rect = container.getBoundingClientRect();
    const scrollContainer = container.parentElement;
    
    // Calculate the actual point in the image space
    const x = (clientX - rect.left + scrollContainer.scrollLeft - position.x) / scale;
    const y = (clientY - rect.top + scrollContainer.scrollTop - position.y) / scale;
    
    // Ensure the point is within the image bounds
    if (currentImage?.dimensions) {
      return {
        x: Math.max(0, Math.min(x, currentImage.dimensions.width)),
        y: Math.max(0, Math.min(y, currentImage.dimensions.height))
      };
    }
    
    return { x, y };
  };