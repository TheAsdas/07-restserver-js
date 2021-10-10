"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBoolean = void 0;
const stringToBoolean = (value) => {
    if (!value)
        return false;
    else if (value === "false" || value === "no")
        return false;
    else if (value === "true" || value === "yes")
        return true;
    else
        return false;
};
exports.stringToBoolean = stringToBoolean;
//# sourceMappingURL=utils.js.map