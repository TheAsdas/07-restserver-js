import { Request, Response } from 'express';

export type iMiddleware = (
  req: Request,
  res: Response,
  next: Function
) => void | Response;
