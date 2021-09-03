import { Router } from "express";
import { login, googleSignIn } from '../controller/auth';
import { check } from "express-validator";
import { validate } from "../middlewares/field-validations";

const authRouter = Router();

const login_middlewares = [
  check("correo")
    .isEmail()
    .withMessage("El correo no fue provisto o es inválido."),
  check("clave")
    .not()
    .isEmpty()
    .withMessage("Tienes que proveer una contraseña válida."),
  validate,
];

const google_middlewares = [
  check("id_token")
    .not()
    .isEmpty()
    .withMessage("Tienes que proveer el token de Google."),
  validate,
];

authRouter.post("/login", login_middlewares, login);
authRouter.post("/google", google_middlewares, googleSignIn);

export default authRouter;
