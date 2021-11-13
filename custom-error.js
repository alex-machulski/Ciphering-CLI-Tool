class ValidateError extends Error {
    constructor(message, errorCode) {
        super();
        this.name = 'Validate Error';
        this.message = message;
        this.code = errorCode;
    }
}

module.exports = {ValidateError}