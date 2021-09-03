"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const express_validator_1 = require("express-validator");
const field_validations_1 = require("../middlewares/field-validations");
const authRouter = express_1.Router();
const login_middlewares = [
    express_validator_1.check("correo")
        .isEmail()
        .withMessage("El correo no fue provisto o es inválido."),
    express_validator_1.check("clave")
        .not()
        .isEmpty()
        .withMessage("Tienes que proveer una contraseña válida."),
    field_validations_1.validate,
];
const google_middlewares = [
    express_validator_1.check("id_token")
        .not()
        .isEmpty()
        .withMessage("Tienes que proveer el token de Google."),
    field_validations_1.validate,
];
authRouter.post("/login", login_middlewares, auth_1.login);
authRouter.post("/google", google_middlewares, auth_1.googleSignIn);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map