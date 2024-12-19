import { memo } from 'react';
import { X } from 'lucide-react';
import useTestingStore from '../../../../store/testingStore';

function ExistingRectangles({ scaleRect, onDelete }) {
  const { currentImage } = useTestingStore();

  if (!currentImage?.damageRects?.length) return null;

  return (
    <>
      {currentImage.damageRects.map((rect) => {
        const scaled = scaleRect(rect);
        return (
          <div
            key={rect.id}
            className="absolute border-2 border-blue-500 bg-blue-500/20"
            style={{
              left: `${scaled.x}px`,
              top: `${scaled.y}px`,
              width: `${scaled.width}px`,
              height: `${scaled.height}px`,
            }}
          >
            <button
              onClick={(e) => onDelete(rect.id, e)}
              className="absolute -top-6 -right-2 bg-black/75 text-white p-1 rounded-full hover:bg-black/90 transition-colors"
              title="Delete rectangle"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </>
  );
}

export default memo(ExistingRectangles);