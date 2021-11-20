const {encodeDecodeCaesar, encodeDecodeROT8, encodeDecodeAtbash} = require('./encoders');

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
        const text = 'abcd';
        const caesarFlag = 1;
        expect(encodeDecodeCaesar(text, caesarFlag)).toBe('bcde');
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
        const text = 'abcde';
        const ROT8Flag = 1;
        expect(encodeDecodeROT8(text, ROT8Flag)).toBe('ijklm');
    })
})