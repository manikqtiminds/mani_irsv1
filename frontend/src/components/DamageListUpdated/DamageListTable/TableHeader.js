// src/components/DamageListUpdated/DamageListTable/TableHeader.js
function TableHeader({ onSelectAll, allSelected }) {
    return (
      <thead className="bg-[#047BBE] text-white sticky top-0 z-10">
        <tr className="divide-x divide-gray-200 border-b-2">
          <th className="w-10 px-4 py-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
          </th>
          <th colSpan="3" className="px-4 py-2 text-center text-sm font-medium uppercase tracking-wider">
            Details
          </th>
          <th colSpan="5" className="px-4 py-2 text-center text-sm font-medium uppercase tracking-wider">
            Part
          </th>
          <th colSpan="4" className="px-4 py-2 text-center text-sm font-medium uppercase tracking-wider">
            Labour
          </th>
          <th colSpan="3" className="px-4 py-2 text-center text-sm font-medium uppercase tracking-wider">
            Paint
          </th>
          <th colSpan="1" className="px-4 py-2 text-center text-sm font-medium uppercase tracking-wider">
            Total
          </th>
        </tr>
  
        <tr className="bg-[#fcd5ab] text-gray-900 divide-x divide-gray-100">
          <th></th>
          <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">Part Name</th>
          <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">Decision</th>
          <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">Metallurgy</th>
          <th className="px-4 py-3 text-left text-xs font-medium tracking-wider">Part #</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Qty</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Price</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">GST</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Total</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Rate</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Dent(hrs)</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">R&R(hrs)</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Total</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Labour</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Materials</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Total</th>
          <th className="px-4 py-3 text-center text-xs font-medium tracking-wider">Grand Total</th>
        </tr>
      </thead>
    );
  }
  
  export default TableHeader;
  