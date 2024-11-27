import SHA256 from "crypto-js/sha256";

// This function will be used to generate SHA-256 hash from an input string
export function getSHA256Hash(message) {
  const hash = SHA256(message).toString();  // Converts hash to string format
  return hash;
}

  