import { CustomValidator } from "express-validator";
import { Model } from "mongoose";
import { Category, Product, Role, User } from "../models";
import { EntryExistsData } from "./.d";

export const validateRole: CustomValidator = async (rol: string) => {
	if (!(await Role.exists({ rol })))
		throw new Error(`El rol ${rol} no es un rol válido.`);
};

export const userIsUnique: CustomValidator = async (correo: string) => {
	if (await User.exists({ correo }))
		throw new Error(
			`El correo ${correo} ya está registrado en la base de datos.`
		);
};

export const userIdIsValid: CustomValidator = async (id: string) => {
	if (!(await User.exists({ _id: id })))
		throw new Error(`El usuario con ID ${id} no existe.`);
};

export const categoryExists: CustomValidator = async (_id: string) => {
	if (!(await Category.exists({ _id, state: true })))
		throw Error(`La categoría con ID ${_id} no existe.`);
};

export const categoryNameIsTaken: CustomValidator = async (name: string) => {
	if (await Category.exists({ name: name.toUpperCase() }))
		throw Error(`El nombre ${name} ya está en uso.`);
};

export const productExists: CustomValidator = async (_id: string) => {
	if (!(await Product.exists({ _id, state: true })))
		throw Error(`El producto con ID ${_id} no existe.`);
};

/**
 * Revisa si un documento existe en el esquema del modelo provisto.
 * Por defecto busca un documento por su `_id`, pero se puede especificar otro campo de búsqueda.
 * @param model Modelo del esquema que revisar.
 * @param filterBy Especifica con qué campo quieres filtrar la existencia del documento.
 * @param filter Parámetros extra estáticos para filtrar el documento.
 */
export const entryExists =
	({model, filterBy = "_id", filter = {}}: EntryExistsData): CustomValidator =>
	async (value: string) => {
		filter[filterBy] = value;
		if (!(await model.exists(filter)))
			throw Error(`${model.modelName} con ${filterBy}=${value} no existe.`);
	};

export const productNameIsTaken: CustomValidator = async (name: string) => {
	if (await Product.exists({ name }))
		throw Error(`El nombre ${name} ya está en uso.`);
};
