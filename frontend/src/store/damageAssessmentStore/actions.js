// src/store/damageAssessmentStore/actions.js

export const createActions = (set, get) => ({
    toggleRowSelection: (index) => {
      set(state => {
        const isAlreadySelected = state.selectedRows.includes(index);
        const newSelectedRows = isAlreadySelected
          ? state.selectedRows.filter(i => i !== index)
          : [...state.selectedRows, index];
  
        const newEditingRows = new Set(state.editingRows);
        if (!isAlreadySelected) {
          newEditingRows.add(index);
        } else {
          newEditingRows.delete(index);
        }
  
        return {
          selectedRows: newSelectedRows,
          editingRows: newEditingRows
        };
      });
    },
  
    updateRow: (index, updates) => {
      set(state => {
        const newAssessments = [...state.assessments];
        newAssessments[index] = { 
          ...newAssessments[index], 
          ...updates,
          isModified: true // Mark as modified whenever changes occur
        };
        return { 
          assessments: newAssessments,
          hasUnsavedChanges: true
        };
      });
    },
  
    clearEditing: () => set({ editingRows: new Set() }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setHasUnsavedChanges: (hasUnsaved) => set({ hasUnsavedChanges: hasUnsaved })
  });
  