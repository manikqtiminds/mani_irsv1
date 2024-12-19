function FloatInputCell({ value, onChange, isEditable, readOnly = false }) {
    if (!isEditable || readOnly) {
      return (
        <td className="px-4 py-2 text-right">
          ₹{parseFloat(value || 0).toFixed(2)}
        </td>
      );
    }
  
    return (
      <td className="px-4 py-2">
        <input
          type="number"
          step="0.01"
          min="0"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-20 border rounded px-2 py-1 text-sm text-right"
        />
      </td>
    );
  }
  
  export default FloatInputCell;
  