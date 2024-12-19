// src/utils/transformers/assessmentTransformer.js
export const transformAssessmentData = (rawData) => {
    console.log('Raw data received:', rawData);
  
    if (!Array.isArray(rawData)) {
      console.warn('Invalid data format received:', rawData);
      return [];
    }
  
    return rawData.map(item => {
      console.log('Processing item:', item);
  
      const transformed = {
        id: item.id,
        carPartMasterId: item.CarPartMasterID,
        partName: item.partName || '',
        metallurgy: item.metallurgy || '',
        partNumber: item.partNumber || '',
        decision: getDecisionFromId(item.RepairReplaceID),
        qty: 1,
        price: parseFloat(item.price) || 0,
        gst: 18, // Default GST rate
        rate: parseFloat(item.rate) || 0,
        dentHrs: parseFloat(item.dentHrs) || 0,
        rrHrs: parseFloat(item.rrHrs) || 0,
        labourTotal: parseFloat(item.labourTotal) || 0,
        labour: parseFloat(item.labour) || 0,
        materials: parseFloat(item.materials) || 0,
        paintTotal: parseFloat(item.paintTotal) || 0
      };
  
      console.log('Transformed item:', transformed);
      return transformed;
    });
  };
  
  const getDecisionFromId = (repairReplaceId) => {
    switch (parseInt(repairReplaceId)) {
      case 0: return 'Repair';
      case 1: return 'Replace';
      default: return 'NA';
    }
  };
  