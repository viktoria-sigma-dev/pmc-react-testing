/**
 * Converts a binary string to a base64-encoded string.
 *
 * @param {string} binary - The binary to be converted.
 * @returns {string} - The base64-encoded string.
 */
export const binaryToBase64 = (binary) => {
  const byteCharacters = binary.match(/.{1,8}/g); // Split binary string into 8-bit chunks
  const byteArray = byteCharacters.map(byte => parseInt(byte, 2)); // Convert each chunk to decimal
  return btoa(String.fromCharCode(...new Uint8Array(byteArray)));
}

/**
 * Converts a base64-encoded string to a binary string.
 *
 * @param {string} base64 - The base64-encoded string to be converted.
 * @returns {string} - The binary string.
 */
export const base64ToBinary = (base64) => {
  const decodedBase64 = decodeURIComponent(base64);
  const binaryString = atob(decodedBase64); // Decode base64 to binary string
  const binaryArray = Array.from(binaryString).map(char => char.charCodeAt(0).toString(2).padStart(8, '0')); // Convert each character to 8-bit binary
  return binaryArray.join(''); // Join the binary chunks
};
