import { validationResult } from "express-validator";
import { iMiddleware } from './.d';

export const validate: iMiddleware = (req, res, next) => {
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json(errores);
	}

	next();
};
