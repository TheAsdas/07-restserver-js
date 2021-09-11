import { Router } from "express";
import { check } from "express-validator";
import { products } from "../controller";
import { entryExists } from "../helpers/db-validator";
import {
	userIsAdmin,
	validateJwt,
	validateRequestFields,
} from "../middlewares";
import { Category, Product } from "../models";

const router = Router();

const validation = {
	verifyId: [
		check("id").isMongoId().withMessage("La ID es inválida."),
		validateRequestFields,
		check("id")
			.custom(entryExists({ model: Product }))
			.withMessage("Este producto no existe."),
		validateRequestFields,
	],
	verifyDelete: [
		check("id").isMongoId().withMessage("La ID es inválida."),
		validateRequestFields,
		check("id")
			.not()
			.custom(entryExists({ model: Product, filter: { state: true } }))
			.withMessage("Este producto no existe."),
		validateRequestFields,
	],
	verifyParams: [
		check(["name", "category"])
			.notEmpty()
			.withMessage("El parámetro no puede estar vacío."),
		validateRequestFields,
		check("category")
			.isMongoId()
			.withMessage("La ID es inválida.")
			.custom(entryExists({ model: Category })),
		validateRequestFields,
		check("name")
			.not()
			.custom(entryExists({ model: Product, filterBy: "name" }))
			.withMessage("Este producto ya existe."),
		validateRequestFields,
	],
};

router.get("/", products.getMany);

router.get("/:id", validation.verifyId, products.getOne);

router.post("/", validateJwt, validation.verifyParams, products.create);

router.put("/:id", validateJwt, validation.verifyId, products.modify);

router.delete(
	"/:id",
	validateJwt,
	userIsAdmin,
	validation.verifyDelete,
	products.remove
);

export default router;
