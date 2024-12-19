import { useEffect } from 'react';
import useInspectionStore from '../../../store/inspectionStore';

function useNavigationPrompt(hasUnsavedChanges) {
  const { currentImageIndex } = useInspectionStore();

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (hasUnsavedChanges) {
      // Show confirmation when changing images
      // You can implement your own confirmation UI here
      const shouldProceed = window.confirm('You have unsaved changes. Do you want to proceed?');
      if (!shouldProceed) {
        // Revert image change
        // Implement your logic here
      }
    }
  }, [currentImageIndex, hasUnsavedChanges]);
}

export default useNavigationPrompt;