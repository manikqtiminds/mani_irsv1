// src/pages/ReviewEditUpdate/components/DamageDetailsColumn.js
import { useEffect } from 'react';
import useInspectionStore from '../../../store/inspectionStore';
import useDamageAssessmentStore from '../../../store/damageAssessmentStore';
import DamageListUpdated from '../../../components/DamageListUpdated';

function DamageDetailsColumn() {
  const { currentImage, referenceNo } = useInspectionStore();
  const { 
    assessments,
    loading, 
    error,
    fetchAssessments,
    updateAssessment,
    addAssessment,
    deleteAssessments
  } = useDamageAssessmentStore();

  useEffect(() => {
    if (currentImage?.imageName && referenceNo) {
      fetchAssessments(referenceNo, currentImage.imageName);
    }
  }, [currentImage?.imageName, referenceNo, fetchAssessments]);

  const handleSave = async (updatedData = []) => {
    if (!Array.isArray(updatedData)) {
      console.error('Invalid data format for save:', updatedData);
      return;
    }
  
    try {
      for (const row of updatedData) {
        if (row.isModified) {
          await updateAssessment(row.id, row);
        }
      }
      await fetchAssessments(referenceNo, currentImage.imageName);
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };
  

  const handleAdd = async () => {
    try {
      const newAssessment = {
        referenceNo,
        imageName: currentImage.imageName,
        carPartMasterId: null,
        repairReplaceId: null,
        price: 0,
        rate: 0,
        dentHrs: 0,
        rrHrs: 0,
        labour: 0,
        materials: 0
      };

      await addAssessment(newAssessment);
      await fetchAssessments(referenceNo, currentImage.imageName);
    } catch (error) {
      console.error('Failed to add new assessment:', error);
    }
  };

  const handleDelete = async (ids) => {
    try {
      await deleteAssessments(ids);
      await fetchAssessments(referenceNo, currentImage.imageName);
    } catch (error) {
      console.error('Failed to delete assessments:', error);
    }
  };

  if (!currentImage) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <p className="text-gray-500">Select an image to view damage details</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <DamageListUpdated
        annotations={assessments}
        loading={loading}
        error={error}
        onSave={handleSave}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default DamageDetailsColumn;
