module.exports = class ErrorObject extends Error {
    constructor(message, secure = true) {
        super(message);
        this.secure = secure;
        Error.captureStackTrace(this, this.constructor);
    }       
}