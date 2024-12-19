// frontend/src/utils/calculations/totals.js
export const calculatePartTotal = (price, qty, gstRate) => {
    const subtotal = parseFloat(price || 0) * (parseInt(qty) || 1);
    const gst = subtotal * (parseFloat(gstRate || 0) / 100);
    return parseFloat((subtotal + gst).toFixed(2));
  };
  
  export const calculateLabourTotal = (rate, dentHrs, rrHrs) => {
    const total = parseFloat(rate || 0) * (parseFloat(dentHrs || 0) + parseFloat(rrHrs || 0));
    return parseFloat(total.toFixed(2));
  };
  
  export const calculatePaintTotal = (labour, materials) => {
    const total = parseFloat(labour || 0) + parseFloat(materials || 0);
    return parseFloat(total.toFixed(2));
  };
  
  export const calculateGrandTotal = (partTotal, labourTotal, paintTotal) => {
    const total = parseFloat(partTotal || 0) + 
                  parseFloat(labourTotal || 0) + 
                  parseFloat(paintTotal || 0);
    return parseFloat(total.toFixed(2));
  };
  