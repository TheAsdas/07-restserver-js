"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controller/users");
const users_2 = require("../controller/users");
const userRouter = express_1.Router();
userRouter.get("/", users_2.users_get);
userRouter.put("/:id", users_2.users_put);
userRouter.post("/", users_2.users_post);
userRouter.delete("/", users_2.users_delete);
userRouter.patch("/", users_1.users_patch);
exports.default = userRouter;
//# sourceMappingURL=users.js.map