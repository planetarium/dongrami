export function Uint8ArrayToHex(array: Uint8Array) {
  return Array.from(array)
    .map((i) => i.toString(16).padStart(2, '0'))
    .join('');
}
