import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

function ImageControls({ onZoomIn, onZoomOut, onReset }) {
  return (
    <div className="flex items-center justify-end gap-2 p-2 bg-gray-50 border-b">
      <button
        onClick={onZoomOut}
        className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="w-5 h-5" />
      </button>
      <button
        onClick={onZoomIn}
        className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      <button
        onClick={onReset}
        className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
        title="Reset Zoom"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
}

export default ImageControls;