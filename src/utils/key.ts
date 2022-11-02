import { encryptionKeyLength, encryptionAlgorithmName, derivationAlgorithmName, derivationHash, derivationIterations } from './algorithm';

export async function createKey(rawRoot: Uint8Array) {
    const masterKey = await crypto.subtle.importKey(
        'raw',
        rawRoot,
        derivationAlgorithmName,
        false,
        ['deriveKey'],
    );

    return await crypto.subtle.deriveKey({
        name: derivationAlgorithmName,
        hash: derivationHash,
        iterations: derivationIterations,
        salt: rawRoot,
    }, masterKey, {
        name: encryptionAlgorithmName,
        length: encryptionKeyLength,
    }, false, [
        'encrypt',
        'decrypt',
    ]);
}
