import { Router } from "express";
import { check } from "express-validator";
import { validateRequestFields } from "../middlewares/field-validations";
import { authController } from "../controller";

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
		validateRequestFields,
	],
	google: [
		check("id_token")
			.not()
			.isEmpty()
			.withMessage("Tienes que proveer el token de Google."),
		validateRequestFields,
	],
};

router.post("/login", authController.login);
router.post("/google", v.google, authController.google);

export default router;
