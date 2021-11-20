const {validateConsoleArguments, validateInputPath, validateOutputPath, validateCipherConfig} = require('./validation');
const {ValidateError} = require("./custom-error");

describe('validate console arguments', () => {
    test('should throw error: config is required', () => {
        const consoleArguments = ["node", "index", "C1-C0-A"];
        expect(() => validateConsoleArguments(consoleArguments)).toThrowError(new ValidateError('ERROR: Config is required', 1));
    })

    test('should throw error: There can be no multiple of the same arguments', () => {
        const consoleArguments = ["node", "index", "-c", "C1-C1", "-i", "input.txt", "--config", "A-R1-R1"];
        expect(() => validateConsoleArguments(consoleArguments)).toThrowError(new ValidateError('ERROR: There can be no multiple of the same arguments', 2))
    })

    test('should work without errors', () => {
        const consoleArguments = ["node", "index", "-c", "C1-C1"];
        expect(validateConsoleArguments(consoleArguments)).toBe(0);
    })
})

describe('validate input path', () => {
    test('should throw error: input file is not exists', () => {
        const consoleArguments = ["node", "index", "-c", "C1-C1", "-i", "qwertyuiop.txt"];
        expect(() => validateInputPath(consoleArguments)).toThrowError(new ValidateError('ERROR: Input file is not exists', 3));
    })

    test('should return empty path if there is no input argument', () => {
        const consoleArguments = ["node", "index", "-c", "C1-C1"];
        let path = validateInputPath(consoleArguments);
        expect(path).toBe('');
    })

    test('should return right path if there is an input argument', () => {
        const consoleArguments = ["node", "index", "-c", "C1-C1", "--input", "input.txt"];
        let path = validateInputPath(consoleArguments);
        expect(path).toBe('input.txt')
    })
})

describe('validate output path', () => {
    test('should throw error: Output file is not exists', () => {
        const consoleArguments = ["node", "index", "-c", "C1", "--output", "qwertyuiop.txt"];
        expect(() => validateOutputPath(consoleArguments)).toThrowError(new ValidateError('ERROR: Output file is not exists', 3));
    })

    test('should return empty path if there is no output argument', () => {
        const consoleArguments = ["node", "index", "-c", "C1"];
        let path = validateOutputPath(consoleArguments);
        expect(path).toBe('');
    })

    test('should return right path if there is an output argument', () => {
        const consoleArguments = ["node", "index", "-c", "C1-C1", "--output", "output.txt"];
        let path = validateOutputPath(consoleArguments);
        expect(path).toBe('output.txt')
    })
})