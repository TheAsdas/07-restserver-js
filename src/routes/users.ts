import { Router } from "express";
import controller from "../controller";

const userRouter = Router();

userRouter.get("/", controller.user.del);

userRouter.put("/", controller.user.put);

userRouter.post("/", controller.user.post);

userRouter.delete("/", controller.user.del);

export default userRouter;
