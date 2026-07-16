//  Extend Error
class RequestError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
export default RequestError;
