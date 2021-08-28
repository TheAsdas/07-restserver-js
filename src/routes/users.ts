import { Router } from "express";
import { check } from "express-validator";
import { users_patch } from "../controller/users";
import { validate, userIsUnique } from "../middlewares/field-validations";
import {
  users_delete,
  users_get,
  users_post,
  users_put,
} from "../controller/users";
import Rol from "../models/Rol";

const userRouter = Router();

const users_post_middlewares = [
  userIsUnique,
  check("nombre", "El nombre es obligatorio y no puede estar vacío.")
    .not()
    .isEmpty(),
  check(
    "clave",
    "La contraseña es obligatoria y debe tener más de 6 caracteres."
  ).isLength({ min: 6 }),
  check("rol").custom(async (rol) => {
    if (!(await Rol.exists({ rol })))
      throw new Error(`El rol ${rol} no es un rol válido.`);
  }),
  check("correo", "El correo no es válido.").isEmail(),
  validate,
];

userRouter.get("/", users_get);

userRouter.put("/:id", users_put);

userRouter.post("/", users_post_middlewares, users_post);

userRouter.delete("/", users_delete);

userRouter.patch("/", users_patch);

export default userRouter;
