"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("../controller");
const db_validator_1 = require("../helpers/db-validator");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
const validate = {
    post: [
        middlewares_1.validateJwt,
        express_validator_1.check("name", "El nombre es obligatorio.").not().isEmpty(),
        middlewares_1.validateRequestFields,
    ],
    getOne: [
        express_validator_1.check("id")
            .isMongoId()
            .withMessage("La ID es inválida.")
            .custom(db_validator_1.categoryExists),
        middlewares_1.validateRequestFields,
    ],
    put: [
        middlewares_1.validateJwt,
        express_validator_1.check("id")
            .isMongoId()
            .withMessage("La ID es inválida.")
            .custom(db_validator_1.categoryExists),
        express_validator_1.check("name")
            .notEmpty()
            .withMessage("El nombre es obligatorio.")
            .custom(db_validator_1.categoryNameIsTaken),
        middlewares_1.validateRequestFields,
    ],
    delete: [
        middlewares_1.validateJwt,
        middlewares_1.userIsAdmin,
        express_validator_1.check("id")
            .isMongoId()
            .withMessage("La ID es inválida.")
            .custom(db_validator_1.categoryExists),
        middlewares_1.validateRequestFields,
    ],
};
router.get("/", controller_1.categories.getMany);
router.get("/:id", validate.getOne, controller_1.categories.getOne);
router.post("/", validate.post, controller_1.categories.create);
router.put("/:id", validate.put, controller_1.categories.edit);
router.delete("/:id", validate.delete, controller_1.categories.remove);
exports.default = router;
//# sourceMappingURL=categories.js.map