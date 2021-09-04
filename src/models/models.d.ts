import { Express } from "express-serve-static-core";

export interface iServer {
  app: Express;
  port?: string;
  listen: Function;
}
