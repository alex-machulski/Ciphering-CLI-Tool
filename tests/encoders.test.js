const {encodeDecodeCaesar, encodeDecodeROT8, encodeDecodeAtbash} = require('../encoders');

describe('caesar cipher', () => {
    test('should not encode numbers', () => {
        const text = '12345';
        const caesarFlag = 1;
        expect(encodeDecodeCaesar(text, caesarFlag)).toBe(text);
    })

    test('should not encode russian letters', () => {
        const text = 'абвгд';
        const caesarFlag = 1;
        expect(encodeDecodeCaesar(text, caesarFlag)).toBe(text);
    })

    test('should correct encode english letters', () => {
        const text = 'zAbCdaZ1';
        const caesarFlag = 1;
        expect(encodeDecodeCaesar(text, caesarFlag)).toBe('aBcDebA1');
    })

    test('should correct decode english letters', () => {
        const text = 'AbCda1';
        const caesarFlag = 0;
        expect(encodeDecodeCaesar(text, caesarFlag)).toBe('ZaBcz1');
    })
})

describe('ROT-8 cipher', () => {
    test('should not encode numbers', () => {
        const text = '12345';
        const ROT8Flag = 1;
        expect(encodeDecodeROT8(text, ROT8Flag)).toBe(text);
    })

    test('should not encode russian letters', () => {
        const text = 'абвгд';
        const ROT8Flag = 1;
        expect(encodeDecodeROT8(text, ROT8Flag)).toBe(text);
    })

    test('should correct encode english letters', () => {
        const text = 'xYzAbc1';
        const ROT8Flag = 1;
        expect(encodeDecodeROT8(text, ROT8Flag)).toBe('fGhIjk1');
    })

    test('should correct decode english letters', () => {
        const text = 'xYzaBc1';
        const ROT8Flag = 0;
        expect(encodeDecodeROT8(text, ROT8Flag)).toBe('pQrsTu1');
    })
})

describe('Atbash cipher', () => {
    test('should not encode numbers', () => {
        const text = '12345';
        expect(encodeDecodeAtbash(text)).toBe(text);
    })

    test('should not encode russian letters', () => {
        const text = 'абвгд';
        expect(encodeDecodeAtbash(text)).toBe(text);
    })

    test('should correct encode english letters', () => {
        const text = 'abCDe';
        expect(encodeDecodeAtbash(text)).toBe('zyXWv');
    })
})