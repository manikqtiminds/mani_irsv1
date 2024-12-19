// src/components/DamageListUpdated/utils/calculations.js
export const calculatePartTotal = (price = 0, qty = 1, gst = 0) => {
    return (parseFloat(price) * parseInt(qty)) * (1 + parseFloat(gst) / 100);
  };
  
  export const calculateLabourTotal = (rate = 0, dentHrs = 0, rrHrs = 0) => {
    return parseFloat(rate) * (parseFloat(dentHrs) + parseFloat(rrHrs));
  };
  
  export const calculatePaintTotal = (labour = 0, materials = 0) => {
    return parseFloat(labour) + parseFloat(materials);
  };
  