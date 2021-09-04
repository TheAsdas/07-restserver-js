import { Router } from "express";
import { check } from "express-validator";

import { validate, userHasRoles, validateJwt } from "../middlewares";
import { user } from "../controller";
import {
	validateRole,
	userIsUnique,
	userIdIsValid,
} from "../helpers/db-validator";

const router = Router();

/**
 * # Validación
 */
const v = {
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
		validate,
	],
	put: [
		check("id")
			.isMongoId()
			.withMessage("La ID no es válida.")
			.custom(userIdIsValid),
		check("rol").custom(validateRole),
		validate,
	],
	delete: [
		validateJwt,
		userHasRoles("ADMIN"),
		check("id")
			.isMongoId()
			.withMessage("La ID no es válida.")
			.custom(userIdIsValid),
		validate,
	],
};

router.get("/", user.get);

router.put("/:id", v.put, user.put);

router.post("/", v.post, user.post);

router.delete("/:id", v.delete, user.delete_);

router.patch("/", user.patch);

export default router;
