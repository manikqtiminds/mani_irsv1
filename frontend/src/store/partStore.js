// frontend/src/store/partStore.js
import { create } from 'zustand';
import { fetchPartNames, fetchPartDetails } from '../services/partService';

const usePartStore = create((set, get) => ({
  parts: [],
  loading: false,
  error: null,

  fetchParts: async () => {
    set({ loading: true, error: null });
    try {
      const parts = await fetchPartNames();
      set({ parts, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getPartDetails: async (partId) => {
    try {
      return await fetchPartDetails(partId);
    } catch (error) {
      console.error('Error fetching part details:', error);
      return null;
    }
  }
}));

export default usePartStore;
