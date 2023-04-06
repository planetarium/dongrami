import { Lib9cType } from '../types/lib9c';

export function getActions(module: Lib9cType) {
  return Object.keys(module)
    .filter((f) => !f.startsWith('deserialize'))
    .filter((f) => f[0] === f[0].toLowerCase())
    .filter((f) => !f.startsWith('_'))
    .filter(
      (f) =>
        ![
          'boot',
          'default',
          'attachSignature',
          'buildUnsignedTransaction',
          'serializeObjectAsDotnet',
          'toHex',
          'parseHex',
        ].includes(f)
    );
}
