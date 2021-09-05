import { Router } from "express";
import auth_router from "./auth";
import category_router from "./categories";
import user_router from "./users";

export const auth = auth_router;
export const category = category_router;
export const user = user_router;
export const product = Router();