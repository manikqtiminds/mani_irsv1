function TableCell({
  field,
  value,
  isEditing,
  onChange,
  type = 'text',
  options = [],
  readOnly = false
}) {
  // If cell is read-only or not in editing mode, render as text
  if (readOnly || !isEditing) {
    return (
      <td className="px-4 py-2">
        {value}
      </td>
    );
  }

  switch (type) {
    case 'select':
      return (
        <td className="px-4 py-2">
          <select
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select...</option>
            {options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </td>
      );

    case 'number':
      return (
        <td className="px-4 py-2">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(field, parseFloat(e.target.value) || 0)}
            className="w-full border rounded px-2 py-1"
          />
        </td>
      );

    default:
      return (
        <td className="px-4 py-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(field, e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </td>
      );
  }
}

export default TableCell;