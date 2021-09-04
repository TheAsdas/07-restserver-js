"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authErrors = {
    INCORRECT_PASSWORD: [401, "Tu contraseña es incorrecta."],
    USER_NOT_REGISTERED: [401, "No estás registrado en el sistema."],
    USER_DEACTIVATED: [403, "Tu cuenta está desactivada."],
    USER_USED_GOOGLE: [401, "Tu cuenta fue registrada con Google."],
};
exports.default = authErrors;
//# sourceMappingURL=authErrors.js.map