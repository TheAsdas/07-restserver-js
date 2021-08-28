import { Router } from "express";
import { check } from "express-validator";

import { users_patch } from "../controller/users";
import { validate } from "../middlewares/field-validations";
import {
  users_delete,
  users_get,
  users_post,
  users_put,
} from "../controller/users";
import {
  validateRole,
  userIsUnique,
  userIdIsValid,
} from "../helpers/db-validator";

const userRouter = Router();

const users_post_middlewares = [
  check("nombre", "El nombre es obligatorio y no puede estar vacío.")
    .not()
    .isEmpty(),
  check(
    "clave",
    "La contraseña es obligatoria y debe tener más de 6 caracteres."
  ).isLength({ min: 6 }),
  check("rol").custom(validateRole),
  check("correo", "El correo no es válido.").isEmail().custom(userIsUnique),
  //check("correo"),
  validate,
];

const users_put_middlewares = [
  check("id")
    .isMongoId()
    .withMessage("La ID no es válida.")
    .custom(userIdIsValid),
  check("rol").custom(validateRole),
  validate,
];

userRouter.get("/",  users_get);

userRouter.put("/:id", users_put_middlewares, users_put);

userRouter.post("/", users_post_middlewares, users_post);

userRouter.delete("/", users_delete);

userRouter.patch("/", users_patch);

export default userRouter;
