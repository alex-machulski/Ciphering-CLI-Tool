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

