import { authErrors, RequestError } from "../errors";
import { iRequestError } from "../errors/.d";
import { iMiddleware } from "./.d";

/**
 * Chequea que el usuario que hace la petición tiene el rol de administrador.
 * @param req Request
 * @param res Response
 * @param next Función que avanza al próximo Middleware.
 */
export const userIsAdmin: iMiddleware = (req, res, next) => {
	try {
		const userRole: string = (req as any).user.rol;
		const { USER_NOT_DEFINED, NO_PRIVILEGES } = authErrors;

		if (!userRole) throw RequestError(USER_NOT_DEFINED);
		if (userRole !== "ADMIN") throw RequestError(NO_PRIVILEGES);

		next();
	} catch (error) {
		const { status = 500, message } = error as iRequestError;
		res.status(status).json({ msg: message });
	}
};

/**
 * Chequea que el rol del usuario esté dentro de la lista de roles provistos.
 * @param validRoles Arreglo con los roles válidos que acepta la petición.
 */
export const userHasRoles = (...validRoles: string[]): iMiddleware => {
	return (req, res, next) => {
		try {
			const userRole: string = (req as any).user.rol;
			const { USER_NOT_DEFINED, NO_PRIVILEGES } = authErrors;

			if (!userRole) throw RequestError(USER_NOT_DEFINED);
			if (!validRoles.includes(userRole)) throw RequestError(NO_PRIVILEGES);

			next();
		} catch (error) {
			const { status = 500, message } = error as iRequestError;
			res.status(status).json({ msg: message });
		}
	};
};
