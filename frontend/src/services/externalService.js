import { decryptExternalData, encryptData } from '../utils/encryption';
import { checkReferenceNumber } from './api';

export const ExternalService = {
  async processExternalReference(encryptedRef) {
    try {
      if (!encryptedRef) {
        throw new Error('No encrypted reference provided');
      }

      console.log('Processing external reference:', encryptedRef);

      // Step 1: Decrypt the external reference
      const referenceNo = await this.decryptReference(encryptedRef);
      if (!referenceNo) {
        throw new Error('Failed to decrypt reference number');
      }
      console.log('Successfully decrypted reference:', referenceNo);

      // Step 2: Validate the reference exists
      const exists = await this.validateReference(referenceNo);
      if (!exists) {
        throw new Error('Reference number not found in system');
      }
      console.log('Reference validation successful');

      // Step 3: Re-encrypt for internal use
      const internalRef = this.encryptForInternal(referenceNo);
      console.log('Reference re-encrypted for internal use');

      return {
        success: true,
        referenceNo,
        encryptedRef: internalRef
      };
    } catch (error) {
      console.error('External reference processing failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to process reference'
      };
    }
  },

  async decryptReference(encryptedRef) {
    try {
      return decryptExternalData(encryptedRef);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt reference number');
    }
  },

  async validateReference(referenceNo) {
    try {
      return await checkReferenceNumber(referenceNo);
    } catch (error) {
      console.error('Validation error:', error);
      throw new Error('Failed to validate reference number');
    }
  },

  encryptForInternal(referenceNo) {
    try {
      return encryptData(referenceNo);
    } catch (error) {
      console.error('Internal encryption error:', error);
      throw new Error('Failed to encrypt for internal use');
    }
  }
};