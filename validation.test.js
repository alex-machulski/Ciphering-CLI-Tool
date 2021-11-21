const {validateConsoleArguments, validateInputPath, validateOutputPath, validateCipherConfig} = require('./validation');
const {ValidateError} = require("./custom-error");

describe('validate console arguments', () => {
    test('should throw error: config is required', () => {
        const consoleCommand = "node index C1-C0-A";
        const consoleArguments = consoleCommand.split(' ');
        expect(() => validateConsoleArguments(consoleArguments)).toThrowError(new ValidateError('ERROR: Config is required', 1));
    })

    test('should throw error: There can be no multiple of the same arguments', () => {
        const consoleCommand = "node index -c C1-C1 -i input.txt --config A-R1-R1 -o output.txt";
        const consoleArguments = consoleCommand.split(' ');
        expect(() => validateConsoleArguments(consoleArguments)).toThrowError(new ValidateError('ERROR: There can be no multiple of the same arguments', 2));
    })

    test('should work without errors', () => {
        const consoleCommand = "node index -c C1-C1";
        const consoleArguments = consoleCommand.split(' ');
        expect(validateConsoleArguments(consoleArguments)).toBe(0);
    })
})

describe('validate input path', () => {
    test('should throw error: input file is not exists', () => {
        const consoleCommand = "node index -c C1-C1 -i qwertyuiop.txt"
        const consoleArguments = consoleCommand.split(' ');
        expect(() => validateInputPath(consoleArguments)).toThrowError(new ValidateError('ERROR: Input file is not exists', 3));
    })

    test('should return empty path if there is no input argument', () => {
        const consoleCommand = "node index -c C1-C1";
        const consoleArguments = consoleCommand.split(' ');
        let path = validateInputPath(consoleArguments);
        expect(path).toBe('');
    })

    test('should return right path if there is an input argument', () => {
        const consoleCommand = "node index -c C1-C1 --input input.txt";
        const consoleArguments = consoleCommand.split(' ');
        let path = validateInputPath(consoleArguments);
        expect(path).toBe('input.txt');
    })
})

describe('validate output path', () => {
    test('should throw error: Output file is not exists', () => {
        const consoleCommand = "node index -c C1 --output qwertyuiop.txt";
        const consoleArguments = consoleCommand.split(' ');
        expect(() => validateOutputPath(consoleArguments)).toThrowError(new ValidateError('ERROR: Output file is not exists', 3));
    })

    test('should return empty path if there is no output argument', () => {
        const consoleCommand = "node index -c C1";
        const consoleArguments = consoleCommand.split(' ');
        let path = validateOutputPath(consoleArguments);
        expect(path).toBe('');
    })

    test('should return right path if there is an output argument', () => {
        const consoleCommand = "node index -c C1-C1 --output output.txt";
        const consoleArguments = consoleCommand.split(' ');
        let path = validateOutputPath(consoleArguments);
        expect(path).toBe('output.txt');
    })
})

describe('validate ciphering config', () => {
    test('should throw error "config is required" if config is empty', () => {
        const consoleCommand = "node index -c  ";
        const consoleArguments = consoleCommand.split(' ');
        expect(() => validateCipherConfig(consoleArguments)).toThrowError(new ValidateError('ERROR: Config is required', 1));
    })

    test('should throw error "config has wrong format"', () => {
        const consoleCommand = "node index -c R5-C1-A";
        const consoleArguments = consoleCommand.split(' ');
        expect(() => validateCipherConfig(consoleArguments)).toThrowError(new ValidateError('ERROR: Config has wrong format', 1));
    })

    test('should return right array of ciphers', () => {
        const consoleCommand = "node index -c R1-C1-A";
        const consoleArguments = consoleCommand.split(' ');
        const ciphers = validateCipherConfig(consoleArguments);
        expect(ciphers).toEqual(['R1', 'C1', 'A']);
    })
})