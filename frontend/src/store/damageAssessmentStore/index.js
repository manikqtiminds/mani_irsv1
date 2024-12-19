// src/store/damageAssessmentStore/index.js
import { create } from 'zustand';
import { createActions } from './actions';

const initialState = {
  assessments: [],
  selectedRows: [],
  editingRows: new Set(),
  hasUnsavedChanges: false,
  loading: false,
  error: null
};

const useDamageAssessmentStore = create((set, get) => ({
  ...initialState,
  ...createActions(set, get)
}));

export default useDamageAssessmentStore;
