// src/components/DamageListUpdated/TableCells/TotalCell.js
function TotalCell({ values, type }) {
    const calculateTotal = () => {
      switch (type) {
        case 'part':
          const price = parseFloat(values.price) || 0;
          const qty = parseInt(values.qty) || 1;
          const gst = parseFloat(values.gstRate) || 0;
          return (price * qty * (1 + gst/100)).toFixed(2);
        
        case 'labour':
          const rate = parseFloat(values.rate) || 0;
          const dentHrs = parseFloat(values.dentHrs) || 0;
          const rrHrs = parseFloat(values.rrHrs) || 0;
          return (rate * (dentHrs + rrHrs)).toFixed(2);
        
        case 'paint':
          const labour = parseFloat(values.labour) || 0;
          const materials = parseFloat(values.materials) || 0;
          return (labour + materials).toFixed(2);
        
        case 'grand':
          const partTotal = parseFloat(calculatePartTotal(values)) || 0;
          const labourTotal = parseFloat(calculateLabourTotal(values)) || 0;
          const paintTotal = parseFloat(calculatePaintTotal(values)) || 0;
          return (partTotal + labourTotal + paintTotal).toFixed(2);
        
        default:
          return '0.00';
      }
    };
  
    const calculatePartTotal = (values) => {
      const price = parseFloat(values.price) || 0;
      const qty = parseInt(values.qty) || 1;
      const gst = parseFloat(values.gstRate) || 0;
      return price * qty * (1 + gst/100);
    };
  
    const calculateLabourTotal = (values) => {
      const rate = parseFloat(values.rate) || 0;
      const dentHrs = parseFloat(values.dentHrs) || 0;
      const rrHrs = parseFloat(values.rrHrs) || 0;
      return rate * (dentHrs + rrHrs);
    };
  
    const calculatePaintTotal = (values) => {
      const labour = parseFloat(values.labour) || 0;
      const materials = parseFloat(values.materials) || 0;
      return labour + materials;
    };
  
    return (
      <td className="px-4 py-2 text-right font-medium">
        ₹{calculateTotal()}
      </td>
    );
  }
  
  export default TotalCell;
  