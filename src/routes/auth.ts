import { Router } from "express";
import { check } from "express-validator";
import { validate } from "../middlewares/field-validations";
import { auth } from "../controller";

const router = Router();

/**
 * # Validación
 */
const v = {
	login: [
		check("correo")
			.isEmail()
			.withMessage("El correo no fue provisto o es inválido."),
		check("clave")
			.not()
			.isEmpty()
			.withMessage("Tienes que proveer una contraseña válida."),
		validate,
	],
	google: [
		check("id_token")
			.not()
			.isEmpty()
			.withMessage("Tienes que proveer el token de Google."),
		validate,
	],
};

router.post("/login", auth.login);
router.post("/google", v.google, auth.google);

export default router;
