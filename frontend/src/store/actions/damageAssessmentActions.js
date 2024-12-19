// src/store/actions/damageAssessmentActions.js
import * as api from '../../services/damageAssessmentService';

export const fetchAssessmentsAction = async (set, get, referenceNo, imageName) => {
  set({ loading: true, error: null });
  try {
    const data = await api.fetchDamageAssessments(referenceNo, imageName);
    set({ 
      assessments: data,
      loading: false,
      hasUnsavedChanges: false,
      selectedRows: []
    });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
};

export const updateAssessmentAction = async (set, get, id, data) => {
  set({ loading: true, error: null });
  try {
    await api.updateDamageAssessment(id, data);
    const state = get();
    await fetchAssessmentsAction(set, get, state.referenceNo, state.currentImage?.imageName);
  } catch (error) {
    set({ error: error.message, loading: false });
    throw error;
  }
};

export const addAssessmentAction = async (set, get, data) => {
  set({ loading: true, error: null });
  try {
    await api.addDamageAssessment(data);
    const state = get();
    await fetchAssessmentsAction(set, get, state.referenceNo, state.currentImage?.imageName);
  } catch (error) {
    set({ error: error.message, loading: false });
    throw error;
  }
};

export const deleteAssessmentsAction = async (set, get, ids) => {
  set({ loading: true, error: null });
  try {
    for (const id of ids) {
      await api.deleteDamageAssessment(id);
    }
    const state = get();
    await fetchAssessmentsAction(set, get, state.referenceNo, state.currentImage?.imageName);
    set({ selectedRows: [] });
  } catch (error) {
    set({ error: error.message, loading: false });
    throw error;
  }
};
