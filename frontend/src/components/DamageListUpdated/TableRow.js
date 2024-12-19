import { memo } from 'react';
import { Trash2 } from 'lucide-react';
import { 
  PartNameCell, 
  DecisionCell, 
  MetallurgyCell,
  QuantityCell,
  FloatInputCell,
  GSTCell,
  TotalCell 
} from './TableCells';

const TableRow = memo(({
  data,
  index,
  isSelected,
  onSelect,
  onChange,
  onDelete // Added onDelete as a prop
}) => {
  // Row is editable if selected
  const isEditable = isSelected;

  // Handler for delete
  const onDeleteRow = () => {
    if (onDelete) onDelete(index); // Pass index to delete handler
  };

  return (
    <tr className={`
      divide-x border-b 
      ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
      transition-colors duration-150
    `}>
      {/* Selection Checkbox + Delete Icon */}
      <td className="px-4 py-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(index, e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          {isSelected && (
            <Trash2 
              className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-700"
              onClick={onDeleteRow} // Trigger delete
              title="Delete Row"
            />
          )}
        </div>
      </td>

      {/* Editable/Non-editable Cells */}
      <PartNameCell
        value={data.partName}
        onChange={(value) => onChange(index, { partName: value })}
        isEditable={isEditable}
      />

      <DecisionCell
        value={data.decision}
        onChange={(value) => onChange(index, { decision: value })}
        isEditable={isEditable}
      />

      <MetallurgyCell
        value={data.metallurgy}
        onChange={(value) => onChange(index, { metallurgy: value })}
        isEditable={isEditable}
      />

      {/* Non-editable Part Number */}
      <td className="px-4 py-2">{data.partNumber}</td>

      {/* Editable Cells */}
      <QuantityCell
        value={data.qty}
        onChange={(value) => onChange(index, { qty: value })}
        isEditable={isEditable}
      />

      <FloatInputCell
        value={data.price}
        onChange={(value) => onChange(index, { price: value })}
        isEditable={isEditable}
      />

      {/* Read-only GST and Total */}
      <GSTCell value={data.gst} partType={data.metallurgy} />
      <TotalCell
        values={{ price: data.price, qty: data.qty, gst: data.gst }}
        type="part"
      />

      {/* More Editable Cells */}
      <FloatInputCell
        value={data.rate}
        onChange={(value) => onChange(index, { rate: value })}
        isEditable={isEditable}
      />

      <FloatInputCell
        value={data.dentHrs}
        onChange={(value) => onChange(index, { dentHrs: value })}
        isEditable={isEditable}
      />

      <FloatInputCell
        value={data.rrHrs}
        onChange={(value) => onChange(index, { rrHrs: value })}
        isEditable={isEditable}
      />

      {/* Calculated Labour Total */}
      <TotalCell
        values={{ rate: data.rate, dentHrs: data.dentHrs, rrHrs: data.rrHrs }}
        type="labour"
      />

      {/* Additional Editable Cells */}
      <FloatInputCell
        value={data.labour}
        onChange={(value) => onChange(index, { labour: value })}
        isEditable={isEditable}
      />

      <FloatInputCell
        value={data.materials}
        onChange={(value) => onChange(index, { materials: value })}
        isEditable={isEditable}
      />

      {/* Calculated Paint and Grand Totals */}
      <TotalCell
        values={{ labour: data.labour, materials: data.materials }}
        type="paint"
      />

      <TotalCell
        values={{
          partTotal: data.partTotal,
          labourTotal: data.labourTotal,
          paintTotal: data.paintTotal
        }}
        type="grand"
      />
    </tr>
  );
});

export default TableRow;
