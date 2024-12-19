// src/hooks/useDamageAssessment/index.js
import { useCallback } from 'react';
import useDamageAssessmentStore from '../../store/damageAssessmentStore';
import { selectModifiedAssessments } from '../../store/damageAssessmentStore/selectors';
import { saveAssessments } from './api';
import { validateAssessment } from './utils';

export const useDamageAssessment = () => {
  const store = useDamageAssessmentStore();
  const modifiedAssessments = selectModifiedAssessments(store);

  const handleSave = useCallback(async () => {
    if (!store.hasUnsavedChanges) return;

    try {
      store.setLoading(true);

      // Validate modified assessments
      const isValid = modifiedAssessments.every(validateAssessment);
      if (!isValid) {
        throw new Error('Invalid assessment data');
      }

      // Save changes to backend
      await saveAssessments(modifiedAssessments);

      // Clear editing states and reset flags
      store.clearEditing();
      store.setHasUnsavedChanges(false);
      store.setError(null);
    } catch (error) {
      console.error('Failed to save changes:', error);
      store.setError(error.message);
    } finally {
      store.setLoading(false);
    }
  }, [store, modifiedAssessments]);

  const handleRowSelect = useCallback((index) => {
    store.toggleRowSelection(index);
  }, [store]);

  const handleRowUpdate = useCallback((index, updates) => {
    store.updateRow(index, updates);
  }, [store]);

  return {
    assessments: store.assessments,
    selectedRows: store.selectedRows,
    editingRows: store.editingRows,
    hasUnsavedChanges: store.hasUnsavedChanges,
    loading: store.loading,
    error: store.error,
    handleSave,
    handleRowSelect,
    handleRowUpdate
  };
};
