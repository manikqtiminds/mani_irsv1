import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { decryptData } from '../../../utils/encryption';

export function useReferenceData(setReferenceNo, fetchImages) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const encryptedData = params.get('data');

    if (!encryptedData) {
      navigate('/');
      return;
    }

    try {
      const decryptedRefNo = decryptData(encryptedData);
      if (!decryptedRefNo) {
        throw new Error('Failed to decrypt reference number');
      }
      setReferenceNo(decryptedRefNo);
    } catch (error) {
      console.error('Error decrypting reference number:', error);
      navigate('/');
    }
  }, [location.search, navigate, setReferenceNo]);

  useEffect(() => {
    if (fetchImages) {
      fetchImages();
    }
  }, [fetchImages]);
}