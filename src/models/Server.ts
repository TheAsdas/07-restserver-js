import express from "express";
import { Express } from "express-serve-static-core";
import cors from "cors";
import userRouter from "../routes/users";
import ES from "../lang/es";

class Server {
  private static _app: Express;
  private static _port: string | undefined;
  private static _routes = {
    user: "/api/usuarios",
  };

  /**
   * Configura el servidor.
   */
  static init() {
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
    this._app.use(express.static("dist/public"), cors(), express.json());

    return this;
  }

  static listen() {
    const { LISTENING_ON } = ES;
    this._app.listen(this._port, () => {
      console.log(LISTENING_ON, this._port);
    });

    return this;
  }
}

export default Server;
