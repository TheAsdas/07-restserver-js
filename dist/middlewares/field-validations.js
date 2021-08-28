"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (req, res, next) => {
    const errores = express_validator_1.validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json(errores);
    }
    next();
};
exports.validate = validate;
//# sourceMappingURL=field-validations.js.map