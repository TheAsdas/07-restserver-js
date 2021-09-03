"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.default = RequestError;
//# sourceMappingURL=RequestError.js.map