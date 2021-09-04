import { Express } from "express-serve-static-core";

/**
 * Un servidor de Express.
 */
export interface iServer {
  /**
   * Servidor Express.
   */
  app: Express;
  /**
   * Puerto en que el servidor escucha.
   */
  port?: string;
  /**
   * Comienza el sevidor en el puerto especificado en el archivo de variables de entorno.
   */
  listen: () => void;
}
