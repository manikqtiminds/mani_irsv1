// src/components/DamageListUpdated/DamageListTableRow.js
import {
  PartNameCell,
  DecisionCell,
  MetallurgyCell,
  QuantityCell,
  FloatInputCell,
  GSTCell,
  TotalCell
} from './TableCells';

function DamageListTableRow({
  data,
  index,
  isSelected,
  onSelect,
  onChange
}) {
  // Row is editable if it's selected
  const isEditable = isSelected;

  return (
    <tr className={`divide-x border-b hover:bg-gray-50 ${
      isSelected ? 'bg-blue-50' : ''
    }`}>
      <td className="px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(index, e.target.checked)}
          className="w-4 h-4 rounded border-gray-300"
        />
      </td>

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

      <MetallurgyCell value={data.metallurgy} />
      
      <td className="px-4 py-2">{data.partNumber}</td>

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

      <GSTCell value={data.gst} partType={data.metallurgy} />

      <TotalCell
        values={{ price: data.price, qty: data.qty, gst: data.gst }}
        type="part"
      />

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

      <TotalCell
        values={{ rate: data.rate, dentHrs: data.dentHrs, rrHrs: data.rrHrs }}
        type="labour"
      />

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
}

export default DamageListTableRow;
