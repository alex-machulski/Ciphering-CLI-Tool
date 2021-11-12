const fs = require("fs");
const {stderr} = process;

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
        stderr.write('ERROR: Config is required');
        process.exit(1);
    } else if (configAmount > 1 || inputPathAmount > 1 || outputPathAmount > 1) {
        stderr.write('ERROR: There can be no multiple of the same arguments');
        process.exit(2);
    }
}

const validateInputPath = (consoleArguments) => {
    const inputPathIndex = consoleArguments.indexOf('-i') === -1
        ? consoleArguments.indexOf('--input')
        : consoleArguments.indexOf('-i');
    let inputPath = '';
    if (inputPathIndex !== -1) {
        if (!fs.existsSync(consoleArguments[inputPathIndex + 1])) {
            stderr.write('ERROR: Input file is not exists');
            process.exit(4);
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
            stderr.write('ERROR: Output file is not exists');
            process.exit(4);
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
            stderr.write('ERROR: Config is required');
            process.exit(1);
        }
        arrConfig = requiredConfig.split('-');
        for (let i = 0; i < arrConfig.length; i++) {
            if (!validConfigItems.includes(arrConfig[i])) {
                stderr.write('ERROR: Config has wrong format');
                process.exit(3);
            }
        }
    }

    return arrConfig;
}

module.exports = {validateConsoleArguments, validateInputPath, validateOutputPath, validateCipherConfig}