function InfoBar({ currentIndex, totalImages, imageName, scale }) {
    return (
      <div className="p-2 bg-gray-50 border-t flex items-center justify-between text-sm">
        <div>
          <span className="text-gray-600">
            Image {currentIndex + 1} of {totalImages}
          </span>
          <span className="mx-2 text-gray-400">|</span>
          <span className="text-gray-500">{imageName}</span>
        </div>
        <div className="text-gray-500">
          Zoom: {Math.round(scale * 100)}%
        </div>
      </div>
    );
  }
  
  export default InfoBar;