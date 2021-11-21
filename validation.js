const fs = require("fs");
const {ValidateError} = require('./custom-error');

const validateConsoleArguments = (consoleArgs) => {
    const consoleArguments = consoleArgs.slice(2);

    let configAmount = 0;
    let inputPathAmount = 0;
    let outputPathAmount = 0;

    for (let i = 0; i < consoleArguments.length; i++) {
        if (consoleArguments[i] === '-c' || consoleArguments[i] === '--config')
            configAmount++
        if (consoleArguments[i] === '-i' || consoleArguments[i] === '--input')
            inputPathAmount++
        if (consoleArguments[i] === '-o' || consoleArguments[i] === '--output')
            outputPathAmount++
    }

    if (configAmount === 0) {
        throw new ValidateError('ERROR: Config is required', 1);
    } else if (configAmount > 1 || inputPathAmount > 1 || outputPathAmount > 1) {
        throw new ValidateError('ERROR: There can be no multiple of the same arguments', 2);
    }

    return 0;
}

const validateInputPath = (consoleArguments) => {
    const inputPathIndex = consoleArguments.indexOf('-i') === -1
        ? consoleArguments.indexOf('--input')
        : consoleArguments.indexOf('-i');
    let inputPath = '';
    if (inputPathIndex !== -1) {
        if (!fs.existsSync(consoleArguments[inputPathIndex + 1])) {
            throw new ValidateError('ERROR: Input file is not exists', 3);
        } else {
            inputPath = consoleArguments[inputPathIndex + 1];
        }
    }

    return inputPath;
}

const validateOutputPath = (consoleArguments) => {
    const outputPathIndex = consoleArguments.indexOf('-o') === -1
        ? consoleArguments.indexOf('--output') : consoleArguments.indexOf('-o');
    let outputPath = '';
    if (outputPathIndex !== -1) {
        if (!fs.existsSync(consoleArguments[outputPathIndex + 1])) {
            throw new ValidateError('ERROR: Output file is not exists', 3);
        } else {
            outputPath = consoleArguments[outputPathIndex + 1];
        }
    }

    return outputPath;
}

const validateCipherConfig = (consoleArguments) => {
    const validConfigItems = ['C1', 'C0', 'R1', 'R0', 'A'];
    const requiredConfigIndex = consoleArguments.indexOf('-c') === -1
        ? consoleArguments.indexOf('--config')
        : consoleArguments.indexOf('-c');

    let requiredConfig = '';
    let arrConfig = [];
    if (requiredConfigIndex !== -1) {
        requiredConfig = consoleArguments[requiredConfigIndex + 1];
        if (!requiredConfig) {
            throw new ValidateError('ERROR: Config is required', 1);
        }
        arrConfig = requiredConfig.split('-');
        for (let i = 0; i < arrConfig.length; i++) {
            if (!validConfigItems.includes(arrConfig[i])) {
                throw new ValidateError('ERROR: Config has wrong format', 1);
            }
        }
    }

    return arrConfig;
}

module.exports = {validateConsoleArguments, validateInputPath, validateOutputPath, validateCipherConfig}