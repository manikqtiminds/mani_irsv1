import { decryptExternalData, encryptData} from '../encryption';
import { validateExternalRequest } from './validator';
import { checkReferenceNumber } from '../../services/api';

/**
 * Processes external request and validates reference number
 */
export const processExternalRequest = async (searchParams) => {
  try {
    // Get encrypted reference from query params
    const encryptedRef = validateExternalRequest(searchParams);
    
    // Decrypt the external reference number
    const referenceNo = decryptExternalData(encryptedRef);
    console.log('Decrypted reference number:', referenceNo);
    
    if (!referenceNo) {
      throw new Error('Failed to decrypt reference number');
    }

    // Verify reference number exists in database
    const exists = await checkReferenceNumber(referenceNo);
    if (!exists) {
      throw new Error('Reference number not found in system');
    }

    // Re-encrypt with our application's encryption for internal use
    const reEncryptedRef = encryptData(referenceNo);

    return {
      success: true,
      referenceNo,
      encryptedRef: reEncryptedRef
    };
  } catch (error) {
    console.error('External request processing error:', error);
    return {
      success: false,
      error: error.message || 'Failed to process external request'
    };
  }
};