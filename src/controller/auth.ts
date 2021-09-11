import { RequestHandler } from "express";
import { compareSync } from "bcryptjs";

import { verifyGoogleCredentials } from "../helpers/google-auth";
import { generateJwt } from "../helpers/json-web-tokens";
import { RequestError, authErrors } from "../errors";
import { iRequestError } from "../errors/.d";
import { User } from "../models";

export const login: RequestHandler = async (req, res) => {
	console.log(req);
	const { correo, clave } = req.body;
	const usuario = await User.findOne({ correo, estado: true });

	try {
		const { USER_NOT_REGISTERED, USER_USED_GOOGLE, INCORRECT_PASSWORD } =
			authErrors;

		if (!usuario) throw RequestError(USER_NOT_REGISTERED);
		if (usuario.google) throw RequestError(USER_USED_GOOGLE);
		if (!compareSync(clave, usuario.clave))
			throw RequestError(INCORRECT_PASSWORD);

		// generar JWT
		const token = await generateJwt(usuario);

		res.json({
			msg: "Andy's log are here.",
			usuario,
			token,
		});
	} catch (error) {
		const { status = 400, message } = error as iRequestError;
		console.log(error);
		res.status(status).json({ msg: message });
	}
};

export const google: RequestHandler = async (req, res) => {
	const { id_token } = req.body;

	try {
		const { nombre, img, correo } = await verifyGoogleCredentials(id_token);
		const { USER_DEACTIVATED } = authErrors;

		let usuario = await User.findOne({ correo });

		if (!usuario) {
			//crear usuario
			const userData = {
				nombre,
				img,
				correo,
				clave: "null",
				google: true,
				rol: "USER",
			};
			usuario = new User(userData);
			await usuario.save();
		} else if (!usuario.estado) throw RequestError(USER_DEACTIVATED);

		const token = await generateJwt(usuario);

		res.json({
			msg: "Has iniciado sesión con Google correctamente.",
			user: usuario,
			token,
		});
	} catch (error) {
		const { status = 400, message: msg } = error as iRequestError;

		console.log(error);
		res.status(status).json({ msg });
	}
};
