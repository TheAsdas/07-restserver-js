import { Category, Role, User } from "../models";

export const validateRole = async (rol: string) => {
	if (!(await Role.exists({ rol })))
		throw new Error(`El rol ${rol} no es un rol válido.`);
};

export const userIsUnique = async (correo: string) => {
	if (await User.exists({ correo }))
		throw new Error(
			`El correo ${correo} ya está registrado en la base de datos.`
		);
};

export const userIdIsValid = async (id: string) => {
	if (!(await User.exists({ _id: id })))
		throw new Error(`El usuario con ID ${id} no existe.`);
};

export const categoryExists = async (_id: string) => {
	if (!(await Category.exists({ _id, state: true })))
		throw Error(`La categoría con ID ${_id} no existe.`);
};

export const categoryNameIsTaken = async (name: string) => {
	if (await Category.exists({ name: name.toUpperCase() }))
		throw Error(`El nombre ${name} ya está en uso.`);
};
