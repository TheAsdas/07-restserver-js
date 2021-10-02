"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestFields = void 0;
const express_validator_1 = require("express-validator");
const validateRequestFields = (req, res, next) => {
    const errores = (0, express_validator_1.validationResult)(req);
    if (!errores.isEmpty()) {
        return res.status(400).json(errores);
    }
    next();
};
exports.validateRequestFields = validateRequestFields;
//# sourceMappingURL=field-validations.js.map