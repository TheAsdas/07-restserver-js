import express from "express";
import dotenv from "dotenv";
import * as core from "express-serve-static-core";
import cors from "cors";
import userRouter from "../routes/users";

class Server {
  private static _app: core.Express;
  private static _port: string | undefined;
  private static _routes = {
    user: "/api/usuarios",
  };

  /**
   * Configura el servidor.
   */
  static init() {
    //dotenv.config();
    this._app = express();
    this._port = process.env.PORT;
    this.middlewares().routes();

    return this;
  }

  private static routes() {
    this._app.use(this._routes.user, userRouter);

    return this;
  }

  private static middlewares() {
    this._app.use(express.static("dist/public"), cors());

    return this;
  }

  static listen() {
    this._app.listen(this._port, () => {
      console.log("Escuchando en el puerto " + this._port);
    });

    return this;
  }
}

export default Server;
