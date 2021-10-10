import { Router } from "express";
import { search } from "../controller";

const router = Router();

router.get("/:collection/:query", search.search());

export default router;
