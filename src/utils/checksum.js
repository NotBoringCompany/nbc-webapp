const crypto = require('crypto');

/**
 * `validChecksum` checks if the given address has a valid checksum.
 * @param {string} addr the address to check
 * @returns a boolean value
 */
export const validChecksum = (addr) => {
  const hex = addr.toLowerCase().slice(2);

  const d = crypto.createHash('sha3-256');
  d.update(Buffer.from(hex, 'hex'));
  const hash = d.digest();

  let ret = '0x';

  for (let i = 0; i < hex.length; i++) {
    const b = hex[i];
    let c = b;

    if (b < '0' || b > '9') {
      if ((hash[Math.floor(i / 2)] & (128 - (i % 2) * 120)) !== 0) {
        c = String.fromCharCode(b.charCodeAt(0) - 32);
      }
    }

    ret += c;
  }

  return addr === ret;
}