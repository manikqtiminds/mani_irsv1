// src/store/damageAssessmentStore.js
import { create } from 'zustand';
import { damageAssessmentApi } from '../services/api/damageAssessmentApi';

const useDamageAssessmentStore = create((set, get) => ({
  assessments: [],
  loading: false,
  error: null,
  hasUnsavedChanges: false,
  selectedRows: [],

  fetchAssessments: async (referenceNo, imageName) => {
    set({ loading: true, error: null });
    try {
      const data = await damageAssessmentApi.fetch(referenceNo, imageName);
      set({ 
        assessments: data,
        loading: false,
        hasUnsavedChanges: false,
        selectedRows: []
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  saveChanges: async (modifiedAssessments) => {
    set({ loading: true, error: null });
    try {
      for (const assessment of modifiedAssessments) {
        if (assessment.id) {
          await damageAssessmentApi.update(assessment.id, assessment);
        } else {
          await damageAssessmentApi.create(assessment);
        }
      }
      
      // Refresh data
      const state = get();
      await state.fetchAssessments(state.referenceNo, state.currentImage?.imageName);
      
      set({ hasUnsavedChanges: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  addAssessment: async (data) => {
    set({ loading: true, error: null });
    try {
      await damageAssessmentApi.create(data);
      
      // Refresh data
      const state = get();
      await state.fetchAssessments(state.referenceNo, state.currentImage?.imageName);
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteAssessments: async (ids) => {
    set({ loading: true, error: null });
    try {
      for (const id of ids) {
        await damageAssessmentApi.delete(id);
      }
      
      // Refresh data
      const state = get();
      await state.fetchAssessments(state.referenceNo, state.currentImage?.imageName);
      
      set({ selectedRows: [] });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Local state updates
  updateRow: (index, updates) => {
    set(state => {
      const newAssessments = [...state.assessments];
      newAssessments[index] = { 
        ...newAssessments[index], 
        ...updates,
        isModified: true 
      };
      return { 
        assessments: newAssessments,
        hasUnsavedChanges: true
      };
    });
  },

  toggleRowSelection: (index) => {
    set(state => ({
      selectedRows: state.selectedRows.includes(index)
        ? state.selectedRows.filter(i => i !== index)
        : [...state.selectedRows, index]
    }));
  },

  toggleAllRows: (checked) => {
    set(state => ({
      selectedRows: checked 
        ? state.assessments.map((_, index) => index)
        : []
    }));
  }
}));

export default useDamageAssessmentStore;
