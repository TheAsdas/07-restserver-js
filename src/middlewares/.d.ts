import { Request, Response } from "express";

export type iMiddleware = (req: Request, res: Response, next: Function) => any;


import { validate } from "./field-validations";
import { validateJwt } from "./validate-jwt";
import { userHasRoles, userIsAdmin } from "./validate-roles";

export { validate, validateJwt, userHasRoles, userIsAdmin };
