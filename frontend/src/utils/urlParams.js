import { decryptData } from './encryption';

export const getDecryptedReferenceNo = (search) => {
  try {
    const params = new URLSearchParams(search);
    const encryptedData = params.get('data') || params.get('ref');
    
    if (!encryptedData) {
      throw new Error('No reference number provided');
    }

    const decryptedRefNo = decryptData(encryptedData);
    if (!decryptedRefNo) {
      throw new Error('Invalid reference number');
    }

    return decryptedRefNo;
  } catch (error) {
    console.error('Error processing reference number:', error);
    throw error;
  }
};