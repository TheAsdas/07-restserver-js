import express from "express";
import { Express } from "express-serve-static-core";
import cors from "cors";
import userRouter from "../routes/users";
import { connectToDb } from "../database/config";

class Server {
  private static _app: Express;
  public static _ready: boolean;
  private static _port: string | undefined;
  private static _routes = {
    user: "/api/usuarios",
  };

  /**
   * Configura el servidor.
   */
  static async init() {
    this._app = express();
    this._port = process.env.PORT;
    this._ready = false;
    await (await this.connect()).middlewares().routes();

    return this;
  }

  private static async connect() {
    await connectToDb();
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
    this._app.listen(this._port, () => {
      console.log("Servidor escuchando en el puerto", this._port);
    });

    return this;
  }
}

export default Server;
