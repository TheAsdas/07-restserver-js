"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authErrors = {
    INCORRECT_PASSWORD: [401, "Tu contraseña es incorrecta."],
    USER_NOT_REGISTERED: [401, "No estás registrado en el sistema."],
    USER_DEACTIVATED: [403, "Tu cuenta está desactivada."],
    USER_USED_GOOGLE: [401, "Tu cuenta fue registrada con Google."],
    JWT_NOT_FOUND: [400, "El token de autorización no fue enviado."],
    SKEY_NOT_FOUND: [
        500,
        "La SKEY no está definida en las variables de entorno.",
    ],
    NO_PRIVILEGES: [
        401,
        "No tienes los privilegios requeridos para realizar esta acción.",
    ],
    USER_NOT_DEFINED: [
        500,
        "El usuario no está definido en el Request. Recuerda que debes verificar el JWT antes que nada.",
    ],
};
exports.default = authErrors;
//# sourceMappingURL=authErrors.js.map