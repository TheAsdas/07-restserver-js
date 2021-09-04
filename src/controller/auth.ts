import { compareSync } from "bcryptjs";
import { RequestHandler } from "express";
import Usuario from "../models/Usuario";
import { generateJwt } from "../helpers/json-web-tokens";
import RequestError from "../errors/RequestError";
import { verifyGoogleCredentials } from "../helpers/google-auth";
import authErrors from "../errors/authErrors";
import { iRequestError } from "../errors/errors";

export const login: RequestHandler = async (req, res) => {
	console.log(req);
	const { correo, clave } = req.body;
	const usuario = await Usuario.findOne({ correo, estado: true });

	try {
		const { USER_NOT_REGISTERED, USER_USED_GOOGLE, INCORRECT_PASSWORD } =
			authErrors;

		if (!usuario) throw RequestError(USER_NOT_REGISTERED);
		if (usuario.google) throw RequestError(USER_USED_GOOGLE);
		if (!compareSync(clave, usuario.clave))
			throw RequestError(INCORRECT_PASSWORD);

		// generar JWT
		const token = await generateJwt(usuario);

		return res.json({
			msg: "Andy's log are here.",
			usuario,
			token,
		});
	} catch (error) {
		const { status = 400, message } = error as iRequestError;
		console.log(error);
		return res.status(status).json({ msg: message });
	}
};

export const google: RequestHandler = async (req, res) => {
	const { id_token } = req.body;

	try {
		const { nombre, img, correo } = await verifyGoogleCredentials(id_token);
		const { USER_DEACTIVATED } = authErrors;

		let usuario = await Usuario.findOne({ correo });

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
			usuario = new Usuario(userData);
			await usuario.save();
		} else if (!usuario.estado) throw RequestError(USER_DEACTIVATED);

		const token = await generateJwt(usuario);

		return res.json({
			msg: "Has iniciado sesión con Google correctamente.",
			user: usuario,
			token,
		});
	} catch (error) {
		const { status = 400, message: msg } = error as iRequestError;

		console.log(error);
		return res.status(status).json({ msg });
	}
};
