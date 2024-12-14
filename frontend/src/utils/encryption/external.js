import CryptoJS from "crypto-js";
import { ENCRYPTION_CONFIG } from "./config";

export function decryptExternalData(encryptedBase64) {
  console.log("Frontend key:", import.meta.env.VITE_ENCRYPTION_KEY);
  if (!encryptedBase64) {
    throw new Error("Encrypted data is required");
  }

  try {
    // Ensure base64 is correctly decoded
    const encryptedData = decodeURIComponent(encryptedBase64);

    console.log("Encrypted Base64:", encryptedData);

    // Parse the hex key into bytes
    const keyBytes = CryptoJS.enc.Hex.parse(ENCRYPTION_CONFIG.key);

    // Create zero IV (16 bytes)
    const iv = CryptoJS.lib.WordArray.create(new Array(16).fill(0));

    // Convert Base64 to WordArray
    const ciphertext = CryptoJS.enc.Base64.parse(encryptedData);

    console.log("Ciphertext:", {
      base64: encryptedData,
      hexString: ciphertext.toString(CryptoJS.enc.Hex),
      sigBytes: ciphertext.sigBytes,
    });

    // Decrypt using a more manual approach
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: ciphertext },
      keyBytes,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    // Convert to UTF8 string, with error handling
    let decryptedText = "";
    try {
      decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    } catch (utfError) {
      console.error("UTF-8 Conversion Error:", utfError);

      // Fallback: try Latin1 encoding
      decryptedText = decrypted.toString(CryptoJS.enc.Latin1);
    }

    console.log("Decryption result:", {
      decryptedText,
      length: decryptedText.length,
      hexString: decrypted.toString(CryptoJS.enc.Hex),
    });

    if (!decryptedText) {
      throw new Error("Decryption resulted in empty data");
    }

    return decryptedText;
  } catch (error) {
    console.error("Detailed decryption error:", {
      message: error.message,
      stack: error.stack,
    });
    throw new Error("Failed to decrypt external data: " + error.message);
  }
}
