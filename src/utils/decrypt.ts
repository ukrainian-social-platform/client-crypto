import { encryptionAlgorithmName, encrypionIvLength } from './algorithm';

export async function decrypt(data: Uint8Array, key: CryptoKey) {
    const iv = data.slice(0, encrypionIvLength);
    data = data.slice(encrypionIvLength);
    return new Uint8Array(await crypto.subtle.decrypt(
        { name: encryptionAlgorithmName, iv },
        key,
        data,
    ));
}
