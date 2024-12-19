// src/components/DamageListUpdated/DamageListToolbar.js
import { Save, Plus, Trash2 } from "lucide-react";

function DamageListToolbar({
  hasUnsavedChanges,
  selectedRows,
  onSave,
  onAdd,
  onDelete,
  disabled,
}) {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 border-b">
      {/* Save Button - Highlighted if unsaved changes exist */}
      <button
        onClick={() => onSave()} // Ensure no event object is passed
        disabled={!hasUnsavedChanges || disabled}
        className={`
    p-2 rounded-md
    transition-colors duration-150
    ${
      hasUnsavedChanges && !disabled
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-100 text-gray-400 cursor-not-allowed"
    }
  `}
        title="Save Changes"
      >
        <Save className="w-4 h-4" />
      </button>

      {/* Add Button - Always visible, adds new row */}
      <button
        onClick={onAdd}
        disabled={disabled}
        className="p-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors duration-150"
        title="Add New"
      >
        <Plus className="w-4 h-4" />
      </button>

      {/* Delete Button - Only visible when rows are selected */}
      {selectedRows.length > 0 && (
        <button
          onClick={onDelete}
          disabled={disabled}
          className="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors duration-150"
          title={`Delete Selected (${selectedRows.length})`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default DamageListToolbar;
