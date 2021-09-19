import {CustomValidator} from "express-validator";
import {Category, Role, User} from "../models";
import {db_validator} from  "./";

export const validateRole: CustomValidator = async (rol: string) => {
	if (!(await Role.exists({rol})))
		throw new Error(`El rol ${rol} no es un rol válido.`);
};

export const userIsUnique: CustomValidator = async (correo: string) => {
	if (await User.exists({correo}))
		throw new Error(
			`El correo ${correo} ya está registrado en la base de datos.`
		);
};

export const userIdIsValid: CustomValidator = async (id: string) => {
	if (!(await User.exists({_id: id})))
		throw new Error(`El usuario con ID ${id} no existe.`);
};

export const categoryExists: CustomValidator = async (_id: string) => {
	if (!(await Category.exists({_id, state: true})))
		throw Error(`La categoría con ID ${_id} no existe.`);
};

export const categoryNameIsTaken: CustomValidator = async (name: string) => {
	if (await Category.exists({name: name.toUpperCase()}))
		throw Error(`El nombre ${name} ya está en uso.`);
};

/**
 * Revisa si una entrada existe en la base de datos según la ID provista.
 * @param data
 */
export const entryExists = (data: db_validator.entryExists.input ): CustomValidator =>
	async (value: string) => {
		const {model, filterBy = "_id", filter = {}} = data;

		filter[filterBy] = value;
		if (!(await model.exists(filter)))
			throw Error(`${model.modelName} con ${filterBy}=${value} no existe.`);
	};
