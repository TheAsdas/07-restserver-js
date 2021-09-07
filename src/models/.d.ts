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

export interface iUser {
	nombre: string;
	correo: string;
	/**
	 * Hash.
	 */
	clave: string;
	/**
	 * URL a imágen de perfil.
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

export interface iRole {
	rol: string;
}

export interface iCategory {
	name: string;
	state: boolean;
	createdBy: iUser | string;
	editedBy: iUser | string;
	_id: string;
	__v?: number;
}
