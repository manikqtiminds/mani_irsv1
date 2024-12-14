export function debugDecryption(encryptedBase64) {
    try {
      const keyBytes = CryptoJS.enc.Hex.parse(ENCRYPTION_CONFIG.key);
      const iv = CryptoJS.lib.WordArray.create(new Array(16).fill(0));
      const ciphertext = CryptoJS.enc.Base64.parse(encryptedBase64);
  
      console.log('Decryption Debug:', {
        key: ENCRYPTION_CONFIG.key,
        keyBytes: keyBytes.toString(CryptoJS.enc.Hex),
        iv: iv.toString(CryptoJS.enc.Hex),
        ciphertext: ciphertext.toString(CryptoJS.enc.Hex),
        base64Ciphertext: encryptedBase64
      });
  
      // Try multiple decryption approaches
      const approaches = [
        { padding: CryptoJS.pad.Pkcs7, encoding: CryptoJS.enc.Utf8 },
        { padding: CryptoJS.pad.NoPadding, encoding: CryptoJS.enc.Utf8 },
        { padding: CryptoJS.pad.Pkcs7, encoding: CryptoJS.enc.Latin1 },
        { padding: CryptoJS.pad.NoPadding, encoding: CryptoJS.enc.Latin1 }
      ];
  
      approaches.forEach(({ padding, encoding }, index) => {
        try {
          const decrypted = CryptoJS.AES.decrypt(
            { ciphertext: ciphertext },
            keyBytes, 
            {
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: padding
            }
          );
  
          const result = decrypted.toString(encoding);
          
          console.log(`Approach ${index + 1}:`, {
            padding: padding === CryptoJS.pad.Pkcs7 ? 'PKCS7' : 'NoPadding',
            encoding: encoding.toString(),
            result,
            resultHex: decrypted.toString(CryptoJS.enc.Hex)
          });
        } catch (approachError) {
          console.error(`Approach ${index + 1} failed:`, approachError);
        }
      });
    } catch (error) {
      console.error('Debug function error:', error);
    }
  }