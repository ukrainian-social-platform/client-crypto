import { encryptionAlgorithmName, encrypionIvLength } from './algorithm';

export async function encrypt(data: Uint8Array, key: CryptoKey) {
    const iv = crypto.getRandomValues(new Uint8Array(encrypionIvLength));
    const encrypted = await crypto.subtle.encrypt(
        { name: encryptionAlgorithmName, iv },
        key,
        data,
    );
    const res = new Uint8Array(iv.byteLength + encrypted.byteLength);
    res.set(iv, 0);
    res.set(new Uint8Array(encrypted), iv.byteLength);
    return res;
}
