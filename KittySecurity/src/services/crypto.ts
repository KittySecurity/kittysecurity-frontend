import CryptoJS from "crypto-js";


export function deriveKeyPBKDF2(password: string, salt: string, iterations = 100_000, keyLen = 32): CryptoJS.lib.WordArray {
    return CryptoJS.PBKDF2(password, salt, {
        keySize: keyLen / 4,
        iterations,
        hasher: CryptoJS.algo.SHA256
    });
}


export function generateIV(length = 16): string {
    return CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Hex);
}


export function encryptAESCBC(plaintext: string, key: CryptoJS.lib.WordArray, ivHex: string): string {
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}


export function decryptAESCBC(ciphertextB64: string, key: CryptoJS.lib.WordArray, ivHex: string): string {
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const encrypted = CryptoJS.enc.Base64.parse(ciphertextB64);
    const cipherParams: CryptoJS.lib.CipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: encrypted });
    const decrypted = CryptoJS.AES.decrypt(
        cipherParams,
        key,
        { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
}


export function deriveMasterHash(masterPassword: string, masterKey: CryptoJS.lib.WordArray,): string {
    const hash = deriveKeyPBKDF2(masterKey.toString(CryptoJS.enc.Hex), masterPassword, 100_000, 32);
    return hash.toString(CryptoJS.enc.Hex);
}


export function deriveMasterKey(masterPassword: string, email: string): CryptoJS.lib.WordArray {
    return deriveKeyPBKDF2(masterPassword, email, 100_000, 32);
}