"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryExists = exports.categoryNameIsTaken = exports.categoryExists = exports.userIdIsValid = exports.userIsUnique = exports.validateRole = void 0;
const models_1 = require("../models");
const validateRole = async (rol) => {
    if (!(await models_1.Role.exists({ rol })))
        throw new Error(`El rol ${rol} no es un rol válido.`);
};
exports.validateRole = validateRole;
const userIsUnique = async (correo) => {
    if (await models_1.User.exists({ correo }))
        throw new Error(`El correo ${correo} ya está registrado en la base de datos.`);
};
exports.userIsUnique = userIsUnique;
const userIdIsValid = async (id) => {
    if (!(await models_1.User.exists({ _id: id })))
        throw new Error(`El usuario con ID ${id} no existe.`);
};
exports.userIdIsValid = userIdIsValid;
const categoryExists = async (_id) => {
    if (!(await models_1.Category.exists({ _id, state: true })))
        throw Error(`La categoría con ID ${_id} no existe.`);
};
exports.categoryExists = categoryExists;
const categoryNameIsTaken = async (name) => {
    if (await models_1.Category.exists({ name: name.toUpperCase() }))
        throw Error(`El nombre ${name} ya está en uso.`);
};
exports.categoryNameIsTaken = categoryNameIsTaken;
const entryExists = (data) => async (value) => {
    const { model, filterBy = "_id", filter = {} } = data;
    filter[filterBy] = value;
    if (!(await model.exists(filter)))
        throw Error(`${model.modelName} con ${filterBy}=${value} no existe.`);
};
exports.entryExists = entryExists;
//# sourceMappingURL=db_validator.js.map