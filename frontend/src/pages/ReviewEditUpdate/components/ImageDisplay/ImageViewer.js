function ImageViewer({ 
    children, 
    isDragging, 
    onMouseDown, 
    onMouseMove, 
    onMouseUp 
  }) {
    return (
      <div className="absolute inset-0 overflow-auto">
        <div 
          className="min-h-full min-w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {children}
        </div>
      </div>
    );
  }
  
  export default ImageViewer;