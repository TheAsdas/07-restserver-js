import express from "express";
import dotenv from "dotenv";
import * as core from "express-serve-static-core";
import cors from "cors";

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
    this.middlewares().routes();

    return this;
  }

  private static routes() {
    this._app.get("/api", (req, res) => {
      res.status(418).json({ status: "get", response: "Hola, mundo!" });
    });
    this._app.put("/api", (req, res) => {
      res.json({ status: "put", response: "Hola, mundo!" });
    });
    this._app.post("/api", (req, res) => {
      res.status(201).json({ status: "post", response: "Hola, mundo!" });
    });
    this._app.delete("/api", (req, res) => {
      res.json({ status: "delete", response: "Hola, mundo!" });
    });

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
