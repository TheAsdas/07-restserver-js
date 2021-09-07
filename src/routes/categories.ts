import { Router } from "express";
import { check } from "express-validator";
import { category } from "../controller";
import { categoryExists, categoryNameIsTaken } from "../helpers/db-validator";
import { validateJwt, validateRequestFields } from "../middlewares";

/**
 * # Router de categorías
 * ----------------------
 * ### Endpoints:
 * | Ruta| Permisos | Descripción |
 * |:-|:-:|-:|
 * |`"/":get` | `<Public>` | Listar categorías. |
 * |`"/:id":get` | `<Public>` | Mostrar una categoría. |
 * |`"/":post` | `<Private>` | Crear una categoría. |
 * |`"/:id":put` | `<Private>` | Modificar una categoría. |
 * |`"/:id":delete` | `<Private>` | Borrar una categoría. |
 */
const router = Router();

const validate = {
	post: [
		validateJwt,
		check("name", "El nombre es obligatorio.").not().isEmpty(),
		validateRequestFields,
	],
	getOne: [
		check("id")
			.isMongoId()
			.withMessage("La ID es inválida.")
			.custom(categoryExists),
		validateRequestFields,
	],
	put: [
		validateJwt,
		check("id")
			.isMongoId()
			.withMessage("La ID es inválida.")
			.custom(categoryExists),
		check("name")
			.notEmpty()
			.withMessage("El nombre es obligatorio.")
			.custom(categoryNameIsTaken),
		validateRequestFields,
	],
	delete: [
		validateJwt,
		check("id")
			.isMongoId()
			.withMessage("La ID es inválida.")
			.custom(categoryExists),
		validateRequestFields,
	],
};

router.get("/", category.getMany);

router.get("/:id", validate.getOne, category.getOne);

/* Privado: solo con JWT */
router.post("/", validate.post, category.create);

/* Privado: solo con JWT */
router.put("/:id", validate.put, category.edit);

/* Privado: solo con JWT */
router.delete("/:id", validate.delete, category.remove);

export default router;
