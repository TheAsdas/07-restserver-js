"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryNameIsTaken = exports.categoryExists = exports.userIdIsValid = exports.userIsUnique = exports.validateRole = void 0;
const models_1 = require("../models");
const validateRole = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield models_1.Role.exists({ rol })))
        throw new Error(`El rol ${rol} no es un rol válido.`);
});
exports.validateRole = validateRole;
const userIsUnique = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield models_1.User.exists({ correo }))
        throw new Error(`El correo ${correo} ya está registrado en la base de datos.`);
});
exports.userIsUnique = userIsUnique;
const userIdIsValid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield models_1.User.exists({ _id: id })))
        throw new Error(`El usuario con ID ${id} no existe.`);
});
exports.userIdIsValid = userIdIsValid;
const categoryExists = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield models_1.Category.exists({ _id, state: true })))
        throw Error(`La categoría con ID ${_id} no existe.`);
});
exports.categoryExists = categoryExists;
const categoryNameIsTaken = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield models_1.Category.exists({ name: name.toUpperCase() }))
        throw Error(`El nombre ${name} ya está en uso.`);
});
exports.categoryNameIsTaken = categoryNameIsTaken;
//# sourceMappingURL=db-validator.js.map