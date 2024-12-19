function DecisionCell({ value, onChange, isEditable }) {
    if (!isEditable) {
      return <td className="px-4 py-2">{value || 'NA'}</td>;
    }
  
    return (
      <td className="px-4 py-2">
        <select
          value={value || 'NA'}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value="NA">NA</option>
          <option value="Repair">Repair</option>
          <option value="Replace">Replace</option>
        </select>
      </td>
    );
  }
  
  export default DecisionCell;
  