import { useCallback } from 'react';
import useDamageStore from '../../../../../store/damageStore';

export function useDamageUpdates(referenceNo, currentImage) {
  const { 
    updateAnnotation, 
    deleteAnnotation, 
    fetchAnnotations 
  } = useDamageStore();

  const handleSave = useCallback(async (updatedData) => {
    try {
      for (const row of updatedData) {
        if (row.isModified) {
          await updateAnnotation(row.id, row);
        }
      }
      await fetchAnnotations(referenceNo, currentImage?.imageName);
    } catch (error) {
      console.error('Failed to save changes:', error);
      throw error;
    }
  }, [updateAnnotation, fetchAnnotations, referenceNo, currentImage]);

  const handleDelete = useCallback(async (ids) => {
    try {
      for (const id of ids) {
        await deleteAnnotation(id, referenceNo, currentImage?.imageName);
      }
      await fetchAnnotations(referenceNo, currentImage?.imageName);
    } catch (error) {
      console.error('Failed to delete rows:', error);
      throw error;
    }
  }, [deleteAnnotation, fetchAnnotations, referenceNo, currentImage]);

  return { handleSave, handleDelete };
}