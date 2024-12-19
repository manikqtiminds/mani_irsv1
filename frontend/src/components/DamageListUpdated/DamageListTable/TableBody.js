// src/components/DamageListUpdated/DamageListTable/TableBody.js
import TableRow from './TableRow';

function TableBody({ 
  data = [], 
  selectedRows = [],
  onRowChange,
  onRowSelect
}) {
  if (!data || data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="18" className="px-6 py-4 text-center text-gray-500">
            No damage annotations available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, index) => (
        <TableRow
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

export default TableBody;
