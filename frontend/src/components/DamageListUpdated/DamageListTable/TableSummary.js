// src/components/DamageListUpdated/DamageListTable/TableSummary.js
function TableSummary({ totalCost }) {
    return (
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
    );
  }
  
  export default TableSummary;
  