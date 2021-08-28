import { validationResult } from "express-validator";
import { Middleware } from "express-validator/src/base";
import Usuario from "../models/Usuario";

export const validate: Middleware = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(errores);
  }

  next();
};

export const userIsUnique: Middleware = async (req, res, next) => {
  try {
    const { correo } = req.body;

    if (await Usuario.exists({ correo }))
      return res.status(400).json({
        errors: [
          {
            value: correo,
            msg: "Este usuario ya está registrado en la base de datos.",
            param: "correo",
            location: "body",
          },
        ],
      });

    next();
  } catch (error) {
    next(error);
  }
};
