"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controller/users");
const field_validations_1 = require("../middlewares/field-validations");
const users_2 = require("../controller/users");
const db_validator_1 = require("../helpers/db-validator");
const userRouter = express_1.Router();
const users_post_middlewares = [
    express_validator_1.check("nombre", "El nombre es obligatorio y no puede estar vacío.")
        .not()
        .isEmpty(),
    express_validator_1.check("clave", "La contraseña es obligatoria y debe tener más de 6 caracteres.").isLength({ min: 6 }),
    express_validator_1.check("rol").custom(db_validator_1.validateRole),
    express_validator_1.check("correo", "El correo no es válido.").isEmail().custom(db_validator_1.userIsUnique),
    field_validations_1.validate,
];
const users_put_middlewares = [
    express_validator_1.check("id")
        .isMongoId()
        .withMessage("La ID no es válida.")
        .custom(db_validator_1.userIdIsValid),
    express_validator_1.check("rol").custom(db_validator_1.validateRole),
    field_validations_1.validate,
];
const user_delete_middlewares = [
    express_validator_1.check("id")
        .isMongoId()
        .withMessage("La ID no es válida.")
        .custom(db_validator_1.userIdIsValid),
    field_validations_1.validate,
];
userRouter.get("/", users_2.users_get);
userRouter.put("/:id", users_put_middlewares, users_2.users_put);
userRouter.post("/", users_post_middlewares, users_2.users_post);
userRouter.delete("/:id", user_delete_middlewares, users_2.users_delete);
userRouter.patch("/", users_1.users_patch);
exports.default = userRouter;
//# sourceMappingURL=users.js.map