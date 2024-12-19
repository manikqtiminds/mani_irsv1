// src/components/DamageListUpdated/DamageListTable/index.js
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableSummary from './TableSummary';

function DamageListTable({ 
  data = [], 
  selectedRows = [],
  onRowChange,
  onRowSelect,
  onSelectAll
}) {
  const totalCost = data?.reduce((sum, item) => {
    const cost = parseFloat(item.ActualCostRepair) || 0;
    return sum + cost;
  }, 0);

  return (
    <div className="flex-1 relative overflow-hidden">
      <TableSummary totalCost={totalCost} />

      <div className="absolute inset-0 top-[48px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <table className="w-full min-w-[580px] divide-y divide-gray-200">
          <TableHeader 
            onSelectAll={onSelectAll}
            allSelected={data.length > 0 && selectedRows.length === data.length}
          />
          <TableBody 
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
