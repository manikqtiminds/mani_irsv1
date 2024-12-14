// Encryption configuration
export const ENCRYPTION_CONFIG = {
    key: import.meta.env.VITE_ENCRYPTION_KEY || '35560c254fc6de889a11c11c3805c09c85703bb9c8d728d33c1ce7fdd0413f2e',
    blockSize: 16,
    mode: 'CBC',
    padding: 'Pkcs7'
  };