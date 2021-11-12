const fs = require('fs');
const {CaesarTransform, ROT8Transform, AtbashTransform} = require('./transform-streams');
const {validateConsoleArguments, validateInputPath, validateOutputPath, validateCipherConfig} = require('./validation');
const {pipeline} = require('stream');
const {stdout, stdin, stderr} = process;

validateConsoleArguments(process.argv);
let inputPath = validateInputPath(process.argv);
let outputPath = validateOutputPath(process.argv);
let arrConfig = validateCipherConfig(process.argv);

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
const writableStream = !!outputPath ? fs.createWriteStream(outputPath, {encoding: 'utf-8', flags: 'a'}) : stdout;

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






