import express from "express";
import dotenv from "dotenv";
import * as core from "express-serve-static-core";

class Server {
  private static _app: core.Express;
  private static _port: string | undefined;

  /**
   * Configura el servidor.
   */
  static init() {
    //dotenv.config();
    this._app = express();
    this._port = process.env.PORT;
    this.middlewares();
    this.routes();
  }

  private static routes() {
    this._app.get("/api", (req, res) => {
      res.send("Hello, world.");
    });
  }

  private static middlewares() {
    this._app.use(express.static("dist/public"));
  }

  static listen() {
    this._app.listen(this._port, () => {
      console.log("Escuchando en el puerto " + this._port);
    });
  }
}

export default Server;
