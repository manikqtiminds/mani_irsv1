// This file now serves as the main entry point for encryption functionality
// Re-exporting from our modular implementation
export { decryptExternalData } from './encryption/external';
export { encryptData, decryptData } from './encryption/internal';