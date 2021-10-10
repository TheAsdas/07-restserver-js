"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const controller_1 = require("../controller");
const db_validator_1 = require("../helpers/db_validator");
const router = (0, express_1.Router)();
const validate = {
    post: [
        (0, express_validator_1.check)("nombre", "El nombre es obligatorio y no puede estar vacío.")
            .not()
            .isEmpty(),
        (0, express_validator_1.check)("clave", "La contraseña es obligatoria y debe tener más de 6 caracteres.").isLength({ min: 6 }),
        (0, express_validator_1.check)("rol").custom(db_validator_1.validateRole),
        (0, express_validator_1.check)("correo", "El correo no es válido.").isEmail().custom(db_validator_1.userIsUnique),
        middlewares_1.validateRequestFields,
    ],
    put: [
        (0, express_validator_1.check)("id")
            .isMongoId()
            .withMessage("La ID no es válida.")
            .custom(db_validator_1.userIdIsValid),
        (0, express_validator_1.check)("rol").custom(db_validator_1.validateRole),
        middlewares_1.validateRequestFields,
    ],
    delete: [
        middlewares_1.validateJwt,
        (0, middlewares_1.userHasRoles)("ADMIN"),
        (0, express_validator_1.check)("id")
            .isMongoId()
            .withMessage("La ID no es válida.")
            .custom(db_validator_1.userIdIsValid),
        middlewares_1.validateRequestFields,
    ],
};
router.get("/", controller_1.users.get);
router.put("/:id", validate.put, controller_1.users.put);
router.post("/", validate.post, controller_1.users.post);
router.delete("/:id", validate.delete, controller_1.users.delete_);
exports.default = router;
//# sourceMappingURL=users.js.map