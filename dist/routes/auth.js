"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const field_validations_1 = require("../middlewares/field-validations");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
const v = {
    login: [
        (0, express_validator_1.check)("correo")
            .isEmail()
            .withMessage("El correo no fue provisto o es inválido."),
        (0, express_validator_1.check)("clave")
            .not()
            .isEmpty()
            .withMessage("Tienes que proveer una contraseña válida."),
        field_validations_1.validate,
    ],
    google: [
        (0, express_validator_1.check)("id_token")
            .not()
            .isEmpty()
            .withMessage("Tienes que proveer el token de Google."),
        field_validations_1.validate,
    ],
};
router.post("/login", controller_1.auth.login);
router.post("/google", v.google, controller_1.auth.google);
exports.default = router;
//# sourceMappingURL=auth.js.map