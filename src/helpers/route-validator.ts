import {check} from "express-validator";
import {validateRequestFields} from "../middlewares";
import {Model} from "mongoose";
import {entryExists} from "./db_validator";

const MESSAGES = {
	INVALID_ID: "La ID es inválida.",
	INVALID_PARAM: "El parámetro no puede estar vacío.",
	ALREADY_EXISTS: "La entrada ya existe en la base de datos.",
	NOT_EXISTS: "La entrada no existe en la base de datos."
}

/**
 * Chequea que los campos provistos por el usuario sean una ID válida
 * de MongoDB.
 * @param fields Campos a revisar.
 */
export const paramsAreValidMongoId = (...fields: string[]) => [
	check(fields).isMongoId().withMessage(MESSAGES.INVALID_ID),
	validateRequestFields,
];

/**
 * Chequea que los campos ingresados por el usuario tengan algún
 * valor.
 * @param fields Campos a revisar.
 */
export const paramsAreNotEmpty = (...fields: string[]) => [
	check(fields).notEmpty().withMessage(MESSAGES.INVALID_PARAM),
	validateRequestFields,
]

/**
 * Verifica que ningún campo entre todos los documentos de una
 * colección tenga el valor definido por  `param`.
 * @param param Parámetro con el valor específico que NO debería
 * existir. Proveniente del Request.
 * @param model Modelo de la colección.
 * @param field [opcional] Campo del modelo a revisar. En caso de no
 * ser provisto, el campo tendrá el mismo nombre que el param.
 */
export const paramIsUniqueInCollection = (
	param: string,
	model: Model<any>,
	field?: string,
) => [
	check(param)
		.not().custom(entryExists({model, filterBy: field ?? param}))
		.withMessage(MESSAGES.ALREADY_EXISTS),
	validateRequestFields,
];

/**
 * Revisa si la ID de un documento de Mongo existe en la colección del
 * modelo.
 * @param field Campo a revisar del Request. Tiene que ser una ID de
 * Mongo.
 * @param model Modelo cuyo esquema se quiere revisar.
 * @param state? [Opcional] Define si quieres que el documento esté
 * activado o desactivado. Deja en blanco si quieres conseguir ambos.
 */
export const mongoIdRefersToValidDbEntry = (
	field: string,
	model: Model<any>,
	state?: boolean
) => [
	check(field)
		.custom(entryExists({model, filter: state !== undefined ? {state} : {}}))
		.withMessage(MESSAGES.NOT_EXISTS),
	validateRequestFields
]