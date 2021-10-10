"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestErrorConstructor = void 0;
const RequestErrorConstructor = (error) => {
    const reqError = Error(error[1]);
    reqError.status = error[0];
    return reqError;
};
exports.RequestErrorConstructor = RequestErrorConstructor;
exports.default = exports.RequestErrorConstructor;
//# sourceMappingURL=RequestError.js.map