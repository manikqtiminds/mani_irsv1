import { Trash2 } from 'lucide-react';
import useInspectionStore from '../../store/inspectionStore';

function DamageList() {
  const { currentImage, deleteDamageInfo } = useInspectionStore();
  const damageInfo = currentImage?.damageInfo || [];

  const damageTypes = [
    { id: 0, label: 'Scratch', color: '#22c55e' },
    { id: 1, label: 'Dent', color: '#eab308' },
    { id: 2, label: 'Broken', color: '#ef4444' }
  ];

  const handleDelete = (index) => {
    deleteDamageInfo(index);
  };

  if (!damageInfo.length) return null;

  return (
    <div className="space-y-2">
      {damageInfo.map((damage, index) => (
        <div key={index} className="flex items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: damageTypes[damage.damageType]?.color || '#9ca3af' }}
            />
            <span>{damageTypes[damage.damageType]?.label || 'Unknown'}</span>
          </div>
          <button
            onClick={() => handleDelete(index)}
            className="p-1 hover:bg-red-100 rounded-full text-red-500"
            title="Delete marking"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DamageList;
