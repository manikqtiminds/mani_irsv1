// src/store/damageAssessmentStore/selectors.js
export const selectAssessments = (state) => state.assessments;
export const selectSelectedRows = (state) => state.selectedRows;
export const selectEditingRows = (state) => state.editingRows;
export const selectHasUnsavedChanges = (state) => state.hasUnsavedChanges;
export const selectModifiedAssessments = (state) => 
  state.assessments.filter(a => a.isModified);
