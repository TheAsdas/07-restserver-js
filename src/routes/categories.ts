import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.json({ msg: "Categorías." });
});
export default router;
