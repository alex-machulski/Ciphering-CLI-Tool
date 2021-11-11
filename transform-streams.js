const {Transform} = require('stream');
const {encodeDecodeCaesar, encodeDecodeROT8, encodeDecodeAtbash} = require('./encoders');

class CaesarTransform extends Transform {
    constructor(flag) {
        super(flag);
        this.flag = flag;
    }
    getFlag() {
        return this.flag
    }
    _transform(chunk, encoding, callback) {
        try {
            const resultString = encodeDecodeCaesar(chunk.toString(), this.getFlag());

            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }
}

class ROT8Transform extends Transform {
    constructor(flag) {
        super(flag);
        this.flag = flag
    }
    getFlag() {
        return this.flag
    }
    _transform(chunk, encoding, callback) {
        try {
            const resultString = encodeDecodeROT8(chunk.toString(), this.getFlag());

            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }
}

class AtbashTransform extends Transform {
    _transform(chunk, encoding, callback) {
        try {
            const resultString = encodeDecodeAtbash(chunk.toString());

            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }
}

module.exports = {CaesarTransform, ROT8Transform, AtbashTransform}