import * as secp from '@noble/secp256k1';
import { ethers } from 'ethers';
import { Account } from 'types/account';

export function decipherV3(input: string, password: string, nonStrict = false) {
  const json = nonStrict ? input.toLowerCase() : input;
  const decrypted = ethers.Wallet.fromEncryptedJsonSync(json, password);
  return decrypted;
}

export function getAccountFromV3(
  V3Keystore: string,
  passphrase: string
): Account {
  decipherV3(V3Keystore, passphrase);

  return {
    VERSION: 0,
    async getPublicKey(isCompressed = true) {
      const wallet = decipherV3(V3Keystore, passphrase);

      return secp.getPublicKey(wallet.privateKey.substring(2), isCompressed);
    },
    async sign(hash) {
      const signature = await secp.signAsync(
        hash,
        decipherV3(V3Keystore, passphrase).privateKey.substring(2),
        {
          lowS: true,
        }
      );

      return signature.toCompactRawBytes();
    },
  };
}
