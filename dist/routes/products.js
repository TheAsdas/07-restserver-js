"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const middlewares_1 = require("../middlewares");
const models_1 = require("../models");
const route_validator_1 = require("../helpers/route-validator");
const router = (0, express_1.Router)();
router.get("/", controller_1.products.getMany());
router.get("/:id", (0, route_validator_1.paramsAreValidMongoId)("id"), (0, route_validator_1.mongoIdRefersToValidDbEntry)("id", models_1.Product, true), controller_1.products.getOne());
router.post("/", middlewares_1.validateJwt, (0, route_validator_1.paramsAreNotEmpty)("name", "category"), (0, route_validator_1.paramIsUniqueInCollection)("name", models_1.Product), (0, route_validator_1.paramsAreValidMongoId)("category"), (0, route_validator_1.mongoIdRefersToValidDbEntry)("category", models_1.Category, true), controller_1.products.create());
router.put("/:id", middlewares_1.validateJwt, (0, route_validator_1.paramsAreValidMongoId)("id"), (0, route_validator_1.mongoIdRefersToValidDbEntry)("id", models_1.Product, true), controller_1.products.modify());
router.delete("/:id", middlewares_1.validateJwt, (0, middlewares_1.userHasRoles)("ADMIN"), (0, route_validator_1.paramsAreValidMongoId)("id"), (0, route_validator_1.mongoIdRefersToValidDbEntry)("id", models_1.Product, true), controller_1.products.remove());
exports.default = router;
//# sourceMappingURL=products.js.map