const fs = require('fs');
const {CaesarTransform, ROT8Transform, AtbashTransform} = require('./transform-streams');
const {pipeline} = require('stream');
const {stdout, stdin, stderr} = process;

const validConfigItems = ['C1', 'C0', 'R1', 'R0', 'A'];

// validate arguments
const consoleArguments = process.argv.slice(2);

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

const requiredConfigIndex = process.argv.indexOf('-c') === -1 ? process.argv.indexOf('--config') : process.argv.indexOf('-c');
const inputPathIndex = process.argv.indexOf('-i') === -1 ? process.argv.indexOf('--input') : process.argv.indexOf('-i');
const outputPathIndex = process.argv.indexOf('-o') === -1 ? process.argv.indexOf('--output') : process.argv.indexOf('-o');

// validate input/output
let inputPath = '';
let outputPath = '';
if (inputPathIndex !== -1) {
    if (!fs.existsSync(process.argv[inputPathIndex + 1])) {
        stderr.write('ERROR: Input file is not exists');
        process.exit(4);
    } else {
        inputPath = process.argv[inputPathIndex + 1];
    }
}
if (outputPathIndex !== -1) {
    if (!fs.existsSync(process.argv[outputPathIndex + 1])) {
        stderr.write('ERROR: Output file is not exists');
        process.exit(4);
    } else {
        outputPath = process.argv[outputPathIndex + 1];
    }
}

// validate config
let requiredConfig = '';
let arrConfig = [];
if (requiredConfigIndex !== -1) {
    requiredConfig = process.argv[requiredConfigIndex + 1];
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

// creating streams 
const arrTransformStreams = [];
for (let i = 0; i < arrConfig.length; i++) {
    if (arrConfig[i][0] === 'A') {
        arrTransformStreams.push(new AtbashTransform());
    } else if (arrConfig[i][0] === 'C') {
        arrTransformStreams.push(new CaesarTransform(Number(arrConfig[i][1])));
    } else if (arrConfig[i][0] === 'R') {
        arrTransformStreams.push(new ROT8Transform(Number(arrConfig[i][1])));
    }
}

const readableStream = !!inputPath ? fs.createReadStream(inputPath, 'utf-8') : stdin;
const writableStream = !!outputPath ? fs.createWriteStream(outputPath) : stdout;

pipeline(
    readableStream,
    ...arrTransformStreams,
    writableStream,
    (error) => {
        if (error) {
            stderr.write(error.message);
            process.exit(5);
        }
    }
);






