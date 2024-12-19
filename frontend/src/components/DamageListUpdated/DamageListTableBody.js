// src/components/DamageListUpdated/DamageListTableBody.js
import DamageListTableRow from './DamageListTableRow';

function DamageListTableBody({ 
  data = [], 
  selectedRows = [],
  onRowChange,
  onRowSelect
}) {
  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="17" className="px-6 py-4 text-center text-gray-500">
            No damage assessments available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, index) => (
        <DamageListTableRow
          key={row.id || index}
          data={row}
          index={index}
          isSelected={selectedRows.includes(index)}
          onSelect={onRowSelect}
          onChange={onRowChange}
        />
      ))}
    </tbody>
  );
}

export default DamageListTableBody;
