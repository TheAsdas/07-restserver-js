import { Request, Response } from "express";

export type iMiddleware = (req: Request, res: Response, next: Function) => any;


import { validateRequestFields } from "./field-validations";
import { validateJwt } from "./validate-jwt";
import { userHasRoles, userIsAdmin } from "./validate-roles";

export { validateRequestFields as validate, validateJwt, userHasRoles, userIsAdmin };
