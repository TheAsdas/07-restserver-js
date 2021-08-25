import { Router } from "express";
import {
  users_delete,
  users_get,
  users_post,
  users_put,
} from "../controller/users";

const userRouter = Router();

userRouter.get("/", users_get);

userRouter.put("/", users_put);

userRouter.post("/", users_post);

userRouter.delete("/", users_delete);

export default userRouter;
