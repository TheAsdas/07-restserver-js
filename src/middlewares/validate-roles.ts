import { iMiddleware } from "./.d";

export const userIsAdmin: iMiddleware = (req, res, next) => {
	///@ts-ignore
	const usuario: iUsuario = req.user;
	if (!usuario)
		return res
			.status(500)
			.json({ msg: "El usuario no está definido en el Request." });

	const { rol, nombre } = usuario;
	if (rol !== "ADMIN")
		return res
			.status(401)
			.json({ msg: `${nombre} no tiene permisos de ADMIN.` });
	next();
};

/**
 *
 * @param validRoles Arreglo con los roles válidos que acepta la petición.
 * @returns Middleware
 */
export const userHasRoles = (...validRoles: string[]): iMiddleware => {
	return (req, res, next) => {
		///@ts-ignore
		const userRole = req.user.rol;

		if (!validRoles.includes(userRole))
			return res.status(401).json({
				msg: `El usuario tiene el rol ${userRole}, y no tiene permisos. Roles con permisiones: ${validRoles.join(
					", "
				)}.`,
			});

		next();
	};
};
