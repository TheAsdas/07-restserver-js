import express from "express";
import cors from "cors";

import { connect } from "../database/config";
import * as routes from "../routes";

import { iServer } from "./.d";
import { RouteError } from "../errors";

const paths: { [key: string]: string } = {
	auth: "/api/auth",
	categories: "/api/categorias",
	users: "/api/usuarios",
	products: "/api/productos",
};
const middlewares = [express.static("dist/public"), express.json(), cors()];

/**
 * Crea una instancia de servidor, la configura y la retorna.
 */
const init = (port?: number) => {
	const server: iServer = {
		app: express(),
		port: port?.toString() ?? process.env.PORT,
		listen: () => listen(server),
	};

	connectToDatabase();
	setMiddlewares(server);
	setRoutes(server);

	return server;
};

const connectToDatabase = async () => await connect();

const setRoutes = (server: iServer) => {
	Object.keys(paths).forEach((key) => {
		///@ts-ignore
		let router = routes[key];
		if (!router) throw RouteError(key);
		server.app.use(paths[key], router);
	});
};

const setMiddlewares = (server: iServer) => {
	server.app.use(middlewares);
};

const listen = (server: iServer) => {
	const { app, port } = server;

	if (!port) throw Error("El puerto no fue especificado.");

	app.listen(port, () => {
		console.log("Servidor escuchando en el puerto", port);
	});
};

export default init;
