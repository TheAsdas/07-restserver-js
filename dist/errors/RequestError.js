"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = void 0;
const RequestError = (error) => {
    const reqError = Error(error[1]);
    reqError.status = error[0];
    return reqError;
};
exports.RequestError = RequestError;
exports.default = exports.RequestError;
//# sourceMappingURL=RequestError.js.map