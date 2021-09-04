import express from "express";
import cors from "cors";

import { connectToDb } from "../database/config";
import * as routes from "../routes";

import { iServer } from "./models";

const paths = {
  users: "/api/usuarios",
  auth: "/api/auth",
};
const middlewares = [express.static("dist/public"), express.json(), cors()];

/**
 * # Configurar el servidor
 * Crea una instancia de servidor, la configura y la retorna.
 */
const init = (port?: number) => {
  const server: iServer = {
    app: express(),
    port: port?.toString() ?? process.env.PORT,
    listen: () => listen(server),
  };
  connectDb();
  setMiddlewares(server);
  setRoutes(server);

  return server;
};

/**
 * Conecta con la base de datos.
 */
const connectDb = async () => {
  await connectToDb();
};

const setRoutes = (server: iServer) => {
  const { app } = server;
  app.use(paths.auth, routes.auth);
  app.use(paths.users, routes.users);
  app.use(paths.users, routes.categories);

  return this;
};

/**
 * Configura los middlewares del servidor.
 */
const setMiddlewares = (server: iServer) => {
  server.app.use(middlewares);
};

/**
 * Comienza el sevidor en el puerto especificado en el archivo de variables de entorno.
 */
const listen = (server: iServer) => {
  const { app, port } = server;

  if (!port) throw Error("El puerto no fue especificado.");

  app.listen(port, () => {
    console.log("Servidor escuchando en el puerto", port);
  });
};

export default init;