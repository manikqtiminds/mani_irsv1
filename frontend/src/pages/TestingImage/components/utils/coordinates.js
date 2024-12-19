export function getScaledPoint(e, overlayElement, dimensions, naturalDimensions) {
    if (!overlayElement || !naturalDimensions) return null;
  
    const rect = overlayElement.getBoundingClientRect();
    const scaleX = naturalDimensions.width / dimensions.width;
    const scaleY = naturalDimensions.height / dimensions.height;
  
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
  
    return { x, y };
  }