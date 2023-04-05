import { Account } from "@planetarium/sign";
import { decipherV3, rawPrivateKeyToV3, V3Keystore } from "./v3";
/**
 * account-web
 *
 * Gets Web3 Secret Storage formatted keyfile as key source and creates account.
 * https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition
 *
 */
export declare function getAccountFromV3(V3Keystore: string, passphrase: string): Account;
export { decipherV3, rawPrivateKeyToV3, V3Keystore };
//# sourceMappingURL=index.d.ts.map