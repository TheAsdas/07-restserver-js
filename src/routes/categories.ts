import { Router } from "express";

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

router.get("/", (req, res) => {
	res.json({ msg: "get" });
});
router.get("/:id", (req, res) => {
	res.json({ msg: "get id" });
});

/* Privado: solo con JWT */
router.post("/", (req, res) => {
	res.json({ msg: "post" });
});

/* Privado: solo con JWT */
router.put("/:id", (req, res) => {
	res.json({ msg: "put" });
});

/* Privado: solo con JWT */
router.delete("/:id", (req, res) => {
	res.json({ msg: "delete" });
});

export default router;
