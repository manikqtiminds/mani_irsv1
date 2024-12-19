import React from 'react';

function QuantityCell({ value, onChange, isEditable, readOnly = false }) {
  if (!isEditable || readOnly) {
    return (
      <td className="px-4 py-2 text-right">
        {value || 1}
      </td>
    );
  }

  return (
    <td className="px-4 py-2">
      <input
        type="number"
        min="1"
        value={value || 1}
        onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
        className="w-20 border rounded px-2 py-1 text-sm text-right"
      />
    </td>
  );
}

export default QuantityCell;
