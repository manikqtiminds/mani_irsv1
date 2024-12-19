// src/hooks/useDamageAssessment.js
import { useCallback } from 'react';
import useDamageAssessmentStore from '../store/damageAssessmentStore';

export const useDamageAssessment = () => {
  const store = useDamageAssessmentStore();

  const handleSave = useCallback(async () => {
    const modifiedAssessments = store.assessments.filter(a => a.isModified);
    if (modifiedAssessments.length === 0) return;

    try {
      await store.saveChanges(modifiedAssessments);
    } catch (error) {
      console.error('Failed to save changes:', error);
      // Handle error (show notification, etc.)
    }
  }, [store]);

  const handleAdd = useCallback(async () => {
    try {
      await store.addAssessment({
        referenceNo: store.referenceNo,
        imageName: store.currentImage?.imageName,
        // Default values for new assessment
        carPartMasterId: null,
        repairReplaceId: null,
        price: 0,
        // ... other default values
      });
    } catch (error) {
      console.error('Failed to add assessment:', error);
      // Handle error
    }
  }, [store]);

  const handleDelete = useCallback(async () => {
    if (store.selectedRows.length === 0) return;

    try {
      const selectedIds = store.selectedRows.map(index => store.assessments[index].id);
      await store.deleteAssessments(selectedIds);
    } catch (error) {
      console.error('Failed to delete assessments:', error);
      // Handle error
    }
  }, [store]);

  return {
    handleSave,
    handleAdd,
    handleDelete,
    // ... other utility functions
  };
};
