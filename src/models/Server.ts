import express from "express";
import { Express } from "express-serve-static-core";
import cors from "cors";
import userRouter from "../routes/users";
import { conectarDb } from "../database/config";

class Server {
  private static _app: Express;
  private static _port: string | undefined;
  private static _routes = {
    user: "/api/usuarios",
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
    //crear server y conseguir puerto
    this._app = express();
    this._port = process.env.PORT;
    //conectar a base de datos
    await this.conectar();
    //configurar servidor
    this.routes().middlewares();

    return this;
  }

  /**
   * # Conectar a DB:
   * Conecta el servidor a la base de datos.
   *
   * @returns La instancia del servidor.
   */
  private static async conectar() {
    await conectarDb();

    return this;
  }

  /**
   * # Rutas
   * Configura las rutas del servidor.
   * @returns La instancia del servidor.
   */
  private static routes() {
    this._app.use(this._routes.user, userRouter);

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
      console.log("Escuchando en el puerto " + this._port);
    });

    return this;
  }
}

export default Server;
