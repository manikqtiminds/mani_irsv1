// src/components/DamageListUpdated/DamageListTable/TableRow.js
import {
    PartNameCell,
    DecisionCell,
    MetallurgyCell,
    PartNumberCell,
    QuantityCell,
    FloatInputCell,
    GSTCell,
    TotalCell
  } from '../TableCells';
  
  import { 
    calculatePartTotal, 
    calculateLabourTotal, 
    calculatePaintTotal 
  } from '../utils/calculations';
  
  function TableRow({
    data,
    index,
    isSelected,
    onSelect,
    onChange
  }) {
    const isEditable = isSelected;
  
    const handleChange = (field, value) => {
      onChange(index, { [field]: value });
    };
  
    // Calculate totals
    const partTotal = calculatePartTotal(data.price, data.qty, data.gst);
    const labourTotal = calculateLabourTotal(data.rate, data.dentHrs, data.rrHrs);
    const paintTotal = calculatePaintTotal(data.labour, data.materials);
    const grandTotal = partTotal + labourTotal + paintTotal;
  
    return (
      <tr className={`divide-x border-b hover:bg-gray-50 ${
        isSelected ? 'bg-blue-50' : ''
      }`}>
        {/* Selection */}
        <td className="px-4 py-2 text-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(index, e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
        </td>
  
        {/* Details */}
        <PartNameCell
          value={data.partName}
          onChange={(value) => handleChange('partName', value)}
          isEditable={isEditable}
        />
        <DecisionCell
          value={data.decision}
          onChange={(value) => handleChange('decision', value)}
          isEditable={isEditable}
        />
        <MetallurgyCell
          value={data.metallurgy}
          onChange={(value) => handleChange('metallurgy', value)}
          isEditable={isEditable}
        />
  
        {/* Part */}
        <PartNumberCell value={data.partNumber} />
        <QuantityCell
          value={data.qty}
          onChange={(value) => handleChange('qty', value)}
          isEditable={isEditable}
        />
        <FloatInputCell
          value={data.price}
          onChange={(value) => handleChange('price', value)}
          isEditable={isEditable}
        />
        <GSTCell value={data.gst} partType={data.metallurgy} />
        <TotalCell value={partTotal} />
  
        {/* Labour */}
        <FloatInputCell
          value={data.rate}
          onChange={(value) => handleChange('rate', value)}
          isEditable={isEditable}
        />
        <FloatInputCell
          value={data.dentHrs}
          onChange={(value) => handleChange('dentHrs', value)}
          isEditable={isEditable}
        />
        <FloatInputCell
          value={data.rrHrs}
          onChange={(value) => handleChange('rrHrs', value)}
          isEditable={isEditable}
        />
        <TotalCell value={labourTotal} />
  
        {/* Paint */}
        <FloatInputCell
          value={data.labour}
          onChange={(value) => handleChange('labour', value)}
          isEditable={isEditable}
        />
        <FloatInputCell
          value={data.materials}
          onChange={(value) => handleChange('materials', value)}
          isEditable={isEditable}
        />
        <TotalCell value={paintTotal} />
  
        {/* Grand Total */}
        <TotalCell value={grandTotal} />
      </tr>
    );
  }
  
  export default TableRow;
  