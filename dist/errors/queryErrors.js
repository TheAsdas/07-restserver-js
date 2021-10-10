"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorList = {
    ALREADY_EXISTS: [400, "Este elemento ya existe en el sistema."],
    DOES_NOT_EXIST: [400, "El elemento sobre el cual se quiere hacer la acción no existe.",],
    INVALID_REFERENCE: [400, "La ID hace referencia a un objeto que no existe."],
    COLLECTION_NOT_FOUND: [400, "La colección no existe."],
};
exports.default = errorList;
//# sourceMappingURL=queryErrors.js.map