import { Router } from "express";
import { check } from "express-validator";

import {
	validateRequestFields,
	userHasRoles,
	validateJwt,
} from "../middlewares";
import { users } from "../controller";
import {
	validateRole,
	userIsUnique,
	userIdIsValid,
} from "../helpers/db-validator";

const router = Router();

/**
 * # Validación
 */
const validate = {
	post: [
		check("nombre", "El nombre es obligatorio y no puede estar vacío.")
			.not()
			.isEmpty(),
		check(
			"clave",
			"La contraseña es obligatoria y debe tener más de 6 caracteres."
		).isLength({ min: 6 }),
		check("rol").custom(validateRole),
		check("correo", "El correo no es válido.").isEmail().custom(userIsUnique),
		validateRequestFields,
	],
	put: [
		check("id")
			.isMongoId()
			.withMessage("La ID no es válida.")
			.custom(userIdIsValid),
		check("rol").custom(validateRole),
		validateRequestFields,
	],
	delete: [
		validateJwt,
		userHasRoles("ADMIN"),
		check("id")
			.isMongoId()
			.withMessage("La ID no es válida.")
			.custom(userIdIsValid),
		validateRequestFields,
	],
};

router.get("/", users.get);

router.put("/:id", validate.put, users.put);

router.post("/", validate.post, users.post);

router.delete("/:id", validate.delete, users.delete_);

export default router;
