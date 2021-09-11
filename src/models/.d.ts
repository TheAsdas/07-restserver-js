import { Express } from "express-serve-static-core";

/**
 * Un servidor de Express.
 */
declare interface iServer {
	/**
	 * Servidor Express.
	 */
	app: Express;
	/**
	 * Puerto en que el servidor escucha.
	 */
	port?: string;
	/**
	 * Comienza el servidor en el puerto especificado en el archivo de variables de entorno.
	 */
	listen: () => void;
}

declare interface iUser {
	nombre: string;
	correo: string;
	/**
	 * Hash.
	 */
	clave: string;
	/**
	 * URL a imagen de perfil.
	 */
	img?: string;
	rol: string;
	/**
	 * Si la cuenta está activada o no.
	 */
	estado: boolean;
	/**
	 * Si la cuenta fue creada con Google o no.
	 */
	google: boolean;
	_id?: string;
	uid?: string;
}

declare interface iRole {
	rol: string;
}

declare interface iCategory {
	name: string;
	state: boolean;
	createdBy: iUser | iThing;
	editedBy?: iUser | iThing;
	_id: string;
	__v?: number;
}

declare interface iThing {
	name: string;
	_id: string;
}

declare interface iProduct {
	name: string;
	state: boolean;
	createdBy: iThing | string;
	editedBy?: iThing | string;
	price?: number;
	category: string | iThing;
	description?: string;
	available: boolean;
}
