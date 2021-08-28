import { Router } from "express";
import { check } from "express-validator";
import { users_patch } from "../controller/users";
import {
  users_delete,
  users_get,
  users_post,
  users_put,
} from "../controller/users";

const userRouter = Router();

userRouter.get("/", users_get);

userRouter.put("/:id", users_put);

userRouter.post(
  "/",
  [check("correo", "El correo no es válido.").isEmail()],
  users_post
);

userRouter.delete("/", users_delete);

userRouter.patch("/", users_patch);

export default userRouter;
