// src/components/DamageListUpdated/TableCells/GSTCell.js
function GSTCell({ value, partType }) {
    const getGSTRate = () => {
      if (partType === 'Metal') return 18;
      if (partType === 'Plastic') return 28;
      return 5; // Default GST rate
    };
  
    const gstRate = value || getGSTRate();
  
    return (
      <td className="px-4 py-2 text-center">
        <span className="px-2 py-1 bg-gray-100 rounded text-sm">
          {gstRate}%
        </span>
      </td>
    );
  }
  
  export default GSTCell;
  