//  Extend Error
class ResponseError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
export {};
