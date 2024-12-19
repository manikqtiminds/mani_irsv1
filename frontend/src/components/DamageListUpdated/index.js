// src/components/DamageListUpdated/index.js
import { useEffect } from 'react';
import { useDamageAssessment } from '../../hooks/useDamageAssessment';
import useDamageAssessmentStore from '../../store/damageAssessmentStore';
import DamageListToolbar from './DamageListToolbar';
import DamageListTable from './DamageListTable';

function DamageListUpdated({
  annotations,       // Optional: external data source
  onSave: propOnSave,  // Optional: external onSave handler
  onAdd: propOnAdd,    // Optional: external onAdd handler
  onDelete: propOnDelete // Optional: external onDelete handler
}) {
  // Extract state from the store
  const { 
    assessments,
    loading,
    error,
    hasUnsavedChanges,
    selectedRows,
    updateRow,
    toggleRowSelection,
    toggleAllRows
  } = useDamageAssessmentStore();

  // Extract handlers from the custom hook
  const { handleSave, handleAdd, handleDelete } = useDamageAssessment();

  // Decide which data and handlers to use:
  const data = annotations || assessments;
  const onSave = propOnSave || (() => {
    // Filter only modified rows
    const modifiedRows = data.filter(row => row.isModified);
    handleSave(modifiedRows);
  });
  const onAdd = propOnAdd || handleAdd;
  const onDelete = propOnDelete || handleDelete;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <DamageListToolbar
        hasUnsavedChanges={hasUnsavedChanges}
        selectedRows={selectedRows}
        onSave={onSave}
        onAdd={onAdd}
        onDelete={onDelete}
        disabled={loading}
      />

      <DamageListTable
        data={data}
        selectedRows={selectedRows}
        onRowChange={updateRow}
        onRowSelect={toggleRowSelection}
        onSelectAll={toggleAllRows}
      />
    </div>
  );
}

export default DamageListUpdated;
