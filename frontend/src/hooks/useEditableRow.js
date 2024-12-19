// frontend/src/hooks/useEditableRow.js
import { useState, useCallback } from 'react';

export function useEditableRow(initialData = {}) {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateField = useCallback((field, value) => {
    setData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Calculate dependent fields
      if (field === 'price' || field === 'qty') {
        const price = parseFloat(newData.price) || 0;
        const qty = parseInt(newData.qty) || 0;
        const gst = parseFloat(newData.gst) || 0;
        newData.total = (price * qty * (1 + gst/100)).toFixed(2);
      }

      if (field === 'rate' || field === 'dentHrs' || field === 'rrHrs') {
        const rate = parseFloat(newData.rate) || 0;
        const dentHrs = parseFloat(newData.dentHrs) || 0;
        const rrHrs = parseFloat(newData.rrHrs) || 0;
        newData.labourTotal = (rate * (dentHrs + rrHrs)).toFixed(2);
      }

      if (field === 'labour' || field === 'materials') {
        const labour = parseFloat(newData.labour) || 0;
        const materials = parseFloat(newData.materials) || 0;
        newData.paintTotal = (labour + materials).toFixed(2);
      }

      // Calculate grand total
      const total = parseFloat(newData.total) || 0;
      const labourTotal = parseFloat(newData.labourTotal) || 0;
      const paintTotal = parseFloat(newData.paintTotal) || 0;
      newData.grandTotal = (total + labourTotal + paintTotal).toFixed(2);

      setHasChanges(true);
      return newData;
    });
  }, []);

  const startEditing = useCallback(() => {
    setIsEditing(true);
    setHasChanges(false);
  }, []);

  const cancelEditing = useCallback(() => {
    setIsEditing(false);
    setData(initialData);
    setHasChanges(false);
  }, [initialData]);

  const saveEditing = useCallback(() => {
    setIsEditing(false);
    setHasChanges(false);
    return data;
  }, [data]);

  return {
    data,
    isEditing,
    hasChanges,
    updateField,
    startEditing,
    cancelEditing,
    saveEditing
  };
}
