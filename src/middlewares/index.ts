import * as fieldValidations from "./field-validations";
import * as validateJWT from "./validate-jwt";
import * as validateRoles from "./validate-roles";

module.exports = { ...fieldValidations, ...validateJWT, ...validateRoles };
