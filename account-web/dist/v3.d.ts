import { ethers } from "ethers";
export interface V3Keystore {
    crypto: {
        cipher: string;
        cipherparams: {
            iv: string;
        };
        ciphertext: string;
        kdf: string;
        kdfparams: KDFParamsOut;
        mac: string;
    };
    id: string;
    version: number;
    address: string;
}
interface PBKDFParamsOut {
    c: number;
    dklen: number;
    prf: string;
    salt: string;
}
interface ScryptKDFParamsOut {
    dklen: number;
    n: number;
    p: number;
    r: number;
    salt: string;
}
declare type KDFParamsOut = ScryptKDFParamsOut | PBKDFParamsOut;
export declare function decipherV3(input: string | V3Keystore, password: string, nonStrict?: boolean): ethers.Wallet;
export declare function rawPrivateKeyToV3(privateKey: string, passphrase: string): Promise<string | undefined>;
export {};
//# sourceMappingURL=v3.d.ts.map