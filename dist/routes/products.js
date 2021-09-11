"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controller_1 = require("../controller");
const db_validator_1 = require("../helpers/db-validator");
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const router = express_1.Router();
const validation = {
    verifyId: [
        express_validator_1.check("id").isMongoId().withMessage("La ID es inválida."),
        middlewares_1.validateRequestFields,
        express_validator_1.check("id")
            .custom(db_validator_1.entryExists({ model: models_1.Product }))
            .withMessage("Este producto no existe."),
        middlewares_1.validateRequestFields,
    ],
    verifyDelete: [
        express_validator_1.check("id").isMongoId().withMessage("La ID es inválida."),
        middlewares_1.validateRequestFields,
        express_validator_1.check("id")
            .not()
            .custom(db_validator_1.entryExists({ model: models_1.Product, filter: { state: true } }))
            .withMessage("Este producto no existe."),
        middlewares_1.validateRequestFields,
    ],
    verifyParams: [
        express_validator_1.check(["name", "category"])
            .notEmpty()
            .withMessage("El parámetro no puede estar vacío."),
        middlewares_1.validateRequestFields,
        express_validator_1.check("category")
            .isMongoId()
            .withMessage("La ID es inválida.")
            .custom(db_validator_1.entryExists({ model: models_1.Category })),
        middlewares_1.validateRequestFields,
        express_validator_1.check("name")
            .not()
            .custom(db_validator_1.entryExists({ model: models_1.Product, filterBy: "name" }))
            .withMessage("Este producto ya existe."),
        middlewares_1.validateRequestFields,
    ],
};
router.get("/", controller_1.products.getMany);
router.get("/:id", validation.verifyId, controller_1.products.getOne);
router.post("/", middlewares_1.validateJwt, validation.verifyParams, controller_1.products.create);
router.put("/:id", middlewares_1.validateJwt, validation.verifyId, controller_1.products.modify);
router.delete("/:id", middlewares_1.validateJwt, middlewares_1.userIsAdmin, validation.verifyDelete, controller_1.products.remove);
exports.default = router;
//# sourceMappingURL=products.js.map