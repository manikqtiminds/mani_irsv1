import { useState, useCallback } from 'react';

function useTableData(initialData = []) {
  const [data, setData] = useState(initialData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const updateRow = useCallback((index, updates) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], ...updates };
      return newData;
    });
    setHasUnsavedChanges(true);
  }, []);

  const deleteRows = useCallback((indices) => {
    setData(prevData => prevData.filter((_, index) => !indices.includes(index)));
    setSelectedRows([]);
    setHasUnsavedChanges(true);
  }, []);

  const toggleRowSelection = useCallback((index) => {
    setSelectedRows(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      return [...prev, index];
    });
  }, []);

  const toggleAllRows = useCallback((checked) => {
    setSelectedRows(checked ? data.map((_, index) => index) : []);
  }, [data]);

  const saveChanges = useCallback(async () => {
    // Implement your save logic here
    setHasUnsavedChanges(false);
    return true;
  }, []);

  const resetData = useCallback((newData) => {
    setData(newData);
    setHasUnsavedChanges(false);
    setSelectedRows([]);
  }, []);

  return {
    data,
    hasUnsavedChanges,
    selectedRows,
    updateRow,
    deleteRows,
    toggleRowSelection,
    toggleAllRows,
    saveChanges,
    resetData
  };
}

export default useTableData;