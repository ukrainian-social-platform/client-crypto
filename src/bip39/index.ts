export { default as getDictionary } from '@ukrainian-social-platform/bip39-dictionaries';

export async function generatePhrase(wordlist: string[]) {
    const buf = crypto.getRandomValues(new Uint8Array(32));
    const sha = new Uint8Array(await crypto.subtle.digest('SHA-256', buf));
    const binaryString = [...buf, sha[0]].map((v) => v.toString(2).padStart(8, '0')).join('');
    const positions = binaryString.match(/.{11}/g)!.map((v) => Number.parseInt(v, 2));
    return positions.map((i) => wordlist[i]).join(' ');
}

export async function parsePhrase(phrase: string, wordlist: string[]): Promise<[result: Uint8Array, shaOk: boolean]> {
    const words = phrase.split(' ');
    if (words.length !== 24) {
        throw new Error('Phrase should consist of 24 words');
    }
    let binaryString = '';
    words.forEach((word) => {
        const position = wordlist.indexOf(word);
        if (position === -1) throw new Error(`Can't find word ${word} in the dictionary`);
        binaryString += position.toString(2).padStart(11, '0');
    });
    const bufValues = binaryString.match(/.{8}/g)!.map((v) => Number.parseInt(v, 2));
    const sha0 = bufValues.pop();
    const buf = new Uint8Array(bufValues);
    const sha = new Uint8Array(await crypto.subtle.digest('SHA-256', buf));
    return [ buf, sha0 === sha[0] ];
}
