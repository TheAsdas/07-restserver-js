import express from "express";
import { Express } from "express-serve-static-core";
import cors from "cors";

import { connectToDb } from "../database/config";
import * as routes from "../routes";

class Server {
  private static _app: Express;
  private static _port: string | undefined;
  private static readonly _routes = {
    user: "/api/usuarios",
    auth: "/api/auth",
  };

  /**
   * # Configurar el servidor
   * Crea y configura el servidor siguiendo estos pasos:
   * 1. Crea la instancia de express.
   * 1. Extrae el puerto desde el archivo de variables de entorno.
   * 1. Se conecta a la base de datos.
   * 1. Configura las rutas.
   * 1. Configura los middlewares.
   *
   * @returns La instancia del servidor.
   */
  static async init() {
    this._app = express();
    this._port = process.env.PORT;
    await (await this.connect()).middlewares().routes();

    return this;
  }

  private static async connect() {
    await connectToDb();
    return this;
  }

  private static routes() {
    this._app.use(this._routes.auth, routes.auth);
    this._app.use(this._routes.user, routes.users);
    this._app.use(this._routes.user, routes.categories);

    return this;
  }

  /**
   * # Middlewares
   * Configura los middlewares del servidor.
   *
   * @returns La instancia del servidor.
   */
  private static middlewares() {
    this._app.use(express.static("dist/public"), express.json(), cors());

    return this;
  }

  /**
   * # Escuchar en puerto
   * Comienza el sevidor en el puerto especificado en el archivo de variables de entorno.
   *
   * @returns La instancia del sevidor.
   */
  static listen() {
    this._app.listen(this._port, () => {
      console.log("Servidor escuchando en el puerto", this._port);
    });

    return this;
  }
}

export default Server;
