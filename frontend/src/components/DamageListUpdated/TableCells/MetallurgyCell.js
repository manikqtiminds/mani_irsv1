function MetallurgyCell({ value, onChange, isEditable }) {
    if (!isEditable) {
      return <td className="px-4 py-2">{value || 'Metal'}</td>;
    }
  
    return (
      <td className="px-4 py-2">
        <select
          value={value || 'Metal'}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value="Metal">Metal</option>
          <option value="Plastic">Plastic</option>
        </select>
      </td>
    );
  }
  
  export default MetallurgyCell;
  