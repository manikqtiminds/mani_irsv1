import CryptoJS from 'crypto-js';
import { ENCRYPTION_CONFIG } from './config';

export function encryptData(data) {
  if (!data) {
    throw new Error('Data is required for encryption');
  }

  try {
    // Convert hex key to WordArray
    const key = CryptoJS.enc.Hex.parse(ENCRYPTION_CONFIG.key);
    
    // Create zero IV
    const iv = CryptoJS.lib.WordArray.create(new Array(16).fill(0));

    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  } catch (error) {
    console.error('Internal encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
}

export function decryptData(encryptedData) {
  if (!encryptedData) {
    throw new Error('Encrypted data is required for decryption');
  }

  try {
    // Convert hex key to WordArray
    const key = CryptoJS.enc.Hex.parse(ENCRYPTION_CONFIG.key);
    
    // Create zero IV
    const iv = CryptoJS.lib.WordArray.create(new Array(16).fill(0));

    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Base64.parse(encryptedData) },
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (!result) {
      throw new Error('Decryption resulted in empty data');
    }

    return result;
  } catch (error) {
    console.error('Internal decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
}