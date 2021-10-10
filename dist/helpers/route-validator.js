"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoIdRefersToValidDbEntry = exports.paramIsUniqueInCollection = exports.paramsAreNotEmpty = exports.paramsAreValidMongoId = void 0;
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const db_validator_1 = require("./db_validator");
const MESSAGES = {
    INVALID_ID: "La ID es inválida.",
    INVALID_PARAM: "El parámetro no puede estar vacío.",
    ALREADY_EXISTS: "La entrada ya existe en la base de datos.",
    NOT_EXISTS: "La entrada no existe en la base de datos."
};
const paramsAreValidMongoId = (...fields) => [
    (0, express_validator_1.check)(fields).isMongoId().withMessage(MESSAGES.INVALID_ID),
    middlewares_1.validateRequestFields,
];
exports.paramsAreValidMongoId = paramsAreValidMongoId;
const paramsAreNotEmpty = (...fields) => [
    (0, express_validator_1.check)(fields).notEmpty().withMessage(MESSAGES.INVALID_PARAM),
    middlewares_1.validateRequestFields,
];
exports.paramsAreNotEmpty = paramsAreNotEmpty;
const paramIsUniqueInCollection = (param, model, field) => [
    (0, express_validator_1.check)(param)
        .not().custom((0, db_validator_1.entryExists)({ model, filterBy: field !== null && field !== void 0 ? field : param }))
        .withMessage(MESSAGES.ALREADY_EXISTS),
    middlewares_1.validateRequestFields,
];
exports.paramIsUniqueInCollection = paramIsUniqueInCollection;
const mongoIdRefersToValidDbEntry = (field, model, state) => [
    (0, express_validator_1.check)(field)
        .custom((0, db_validator_1.entryExists)({ model, filter: state !== undefined ? { state } : {} }))
        .withMessage(MESSAGES.NOT_EXISTS),
    middlewares_1.validateRequestFields
];
exports.mongoIdRefersToValidDbEntry = mongoIdRefersToValidDbEntry;
//# sourceMappingURL=route-validator.js.map