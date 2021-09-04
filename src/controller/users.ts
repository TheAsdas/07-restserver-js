import { RequestHandler } from "express";
import Usuario from "../models/Usuario";
import { hashSync } from "bcryptjs";

export const get: RequestHandler = async (req, res) => {
	const { limite = 5, desde = 0 } = req.query;
	const errors: { msg: string }[] = [];

	if (isNaN(Number(limite)))
		errors.push({ msg: "El límite no es un número válido." });

	if (isNaN(Number(desde)))
		errors.push({ msg: "Desde no es un número válido." });

	if (errors.length !== 0) return res.json({ errors });

	const query = { estado: true };

	const [total, usuarios] = await Promise.all([
		Usuario.count(query),
		Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
	]);

	return res.json({ total, usuarios });
};

export const put: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const { clave, google, estado, _id, ...data } = req.body;

	if (clave) {
		data.clave = hashSync(clave);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, data);

	res.json({ msg: "Usuario actualizado.", usuario });
};

export const post: RequestHandler = async (req, res) => {
	const { nombre, correo, clave, rol } = req.body;
	const hashedPass = hashSync(clave);
	const usuario = new Usuario({ nombre, correo, hashedPass, rol });

	try {
		await usuario.save();

		res
			.status(201)
			.json({ msg: "Hemos creado al usuario exitosamente.", usuario });
	} catch (error) {
		res.status(400).json(error);
		return;
	}
};

export const delete_: RequestHandler = async (req, res) => {
	const { id } = req.params;
	///@ts-ignore
	const requestingUser = req.user;

	try {
		const deletedUser = await Usuario.findByIdAndUpdate(id, { estado: false });

		res.json({
			msg: "Hemos borrado el usuario correctamente.",
			requestingUser,
			deletedUser,
		});
	} catch (error) {
		res.status(400).json({ msg: (error as Error).message });
	}
};

export const patch: RequestHandler = (req, res) => {
	res.json({ status: "patch", response: "Hola, mundo!" });
};
