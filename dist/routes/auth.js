"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const controller_1 = require("../controller");
const router = express_1.Router();
const v = {
    login: [
        express_validator_1.check("correo")
            .isEmail()
            .withMessage("El correo no fue provisto o es inválido."),
        express_validator_1.check("clave")
            .not()
            .isEmpty()
            .withMessage("Tienes que proveer una contraseña válida."),
        middlewares_1.validateRequestFields,
    ],
    google: [
        express_validator_1.check("id_token")
            .not()
            .isEmpty()
            .withMessage("Tienes que proveer el token de Google."),
        middlewares_1.validateRequestFields,
    ],
};
router.post("/login", controller_1.auth.login);
router.post("/google", v.google, controller_1.auth.google);
exports.default = router;
//# sourceMappingURL=auth.js.map