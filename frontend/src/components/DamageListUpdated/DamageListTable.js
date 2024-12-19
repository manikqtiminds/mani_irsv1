// src/components/DamageListUpdated/DamageListTable.js
import DamageListTableHeader from './DamageListTableHeader';
import DamageListTableBody from './DamageListTableBody';

function DamageListTable({ 
  data = [], 
  selectedRows = [],
  onRowChange,
  onRowSelect,
  onSelectAll
}) {
  // Calculate total cost
  const totalCost = data?.reduce((sum, item) => {
    const cost = parseFloat(item.totals?.grandTotal || 0);
    return sum + cost;
  }, 0);

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Summary Row */}
      <div className="bg-[#072C63] text-white">
        <table className="w-full">
          <thead>
            <tr>
              <th colSpan="12" className="px-4 py-3 text-left text-md font-bold uppercase tracking-wider">
                Summary
              </th>
              <th colSpan="4" className="px-4 py-3 text-right text-md font-bold uppercase tracking-wider">
                ₹ {totalCost.toFixed(2)}
              </th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Main Table */}
      <div className="absolute inset-0 top-[48px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <table className="w-full min-w-[1200px] divide-y divide-gray-200">
          <DamageListTableHeader 
            onSelectAll={onSelectAll}
            allSelected={data.length > 0 && selectedRows.length === data.length}
          />
          <DamageListTableBody 
            data={data}
            selectedRows={selectedRows}
            onRowChange={onRowChange}
            onRowSelect={onRowSelect}
          />
        </table>
      </div>
    </div>
  );
}

export default DamageListTable;
