import express from "express";
import cors from "cors";

import {connect} from "../database/config";
import * as routes from "../routes";

import {RouteError} from "../errors";
import {models} from "./.d";

const paths: { [key: string]: string } = {
	auth: "/api/auth",
	categories: "/api/categorias",
	users: "/api/usuarios",
	products: "/api/productos",
};

/**
 * Crea una instancia de servidor, la configura y la retorna.
 */
const ServerConstructor = async (port?: number) => {
	const server: models.Server = {
		app: express(),
		port: port?.toString() ?? process.env.PORT,
		listen: () => listen(server),
	};

	await connectToDatabase();
	setMiddlewares(server);
	setRoutes(server);

	return server;
};

const connectToDatabase = async () => await connect();

const setRoutes = (server: models.Server) => {
	Object.keys(paths).forEach((key) => {
		///@ts-ignore
		let router = routes[key];
		if (!router) throw RouteError(key);
		server.app.use(paths[key], router);
	});
};

const setMiddlewares = (server: models.Server) => {
	server.app.use([express.static("dist/public"), express.json(), cors()]);
};

const listen = (server: models.Server) => {
	const {app, port} = server;

	if (!port) throw Error("El puerto no fue especificado.");

	app.listen(port, () => {
		console.log("Servidor escuchando en el puerto", port);
	});
};

export default ServerConstructor;
