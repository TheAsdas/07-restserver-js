"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const controller_1 = require("../controller");
const db_validator_1 = require("../helpers/db-validator");
const router = express_1.Router();
const v = {
    post: [
        express_validator_1.check("nombre", "El nombre es obligatorio y no puede estar vacío.")
            .not()
            .isEmpty(),
        express_validator_1.check("clave", "La contraseña es obligatoria y debe tener más de 6 caracteres.").isLength({ min: 6 }),
        express_validator_1.check("rol").custom(db_validator_1.validateRole),
        express_validator_1.check("correo", "El correo no es válido.").isEmail().custom(db_validator_1.userIsUnique),
        middlewares_1.validate,
    ],
    put: [
        express_validator_1.check("id")
            .isMongoId()
            .withMessage("La ID no es válida.")
            .custom(db_validator_1.userIdIsValid),
        express_validator_1.check("rol").custom(db_validator_1.validateRole),
        middlewares_1.validate,
    ],
    delete: [
        middlewares_1.validateJwt,
        middlewares_1.userHasRoles("ADMIN"),
        express_validator_1.check("id")
            .isMongoId()
            .withMessage("La ID no es válida.")
            .custom(db_validator_1.userIdIsValid),
        middlewares_1.validate,
    ],
};
router.get("/", controller_1.user.get);
router.put("/:id", v.put, controller_1.user.put);
router.post("/", v.post, controller_1.user.post);
router.delete("/:id", v.delete, controller_1.user.delete_);
router.patch("/", controller_1.user.patch);
exports.default = router;
//# sourceMappingURL=users.js.map