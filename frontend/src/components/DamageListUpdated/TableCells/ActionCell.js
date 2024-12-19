// src/components/DamageListUpdated/TableCells/ActionCell.js
import { MoreVertical, Save, X } from 'lucide-react';

function ActionCell({ 
  isEditing, 
  menuOpen, 
  setMenuOpen, 
  onEdit, 
  onSave, 
  onDelete, 
  onCancel 
}) {
  return (
    <td className="px-4 py-2 text-center relative">
      {isEditing ? (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={onSave}
            className="p-1 rounded-full hover:bg-green-100 text-green-600"
            title="Save"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={onCancel}
            className="p-1 rounded-full hover:bg-red-100 text-red-600"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button
                onClick={onEdit}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </td>
  );
}

export default ActionCell;
