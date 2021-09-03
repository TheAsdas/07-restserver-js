import { validationResult } from "express-validator";
import { Middleware } from "./middlewares";

export const validate: Middleware = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores);
  }

  next();
};
