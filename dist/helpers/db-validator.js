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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdIsValid = exports.userIsUnique = exports.validateRole = void 0;
const Rol_1 = __importDefault(require("../models/Rol"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const validateRole = (rol) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield Rol_1.default.exists({ rol })))
        throw new Error(`El rol ${rol} no es un rol válido.`);
});
exports.validateRole = validateRole;
const userIsUnique = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield Usuario_1.default.exists({ correo }))
        throw new Error(`El correo ${correo} ya está registrado en la base de datos.`);
});
exports.userIsUnique = userIsUnique;
const userIdIsValid = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield Usuario_1.default.exists({ _id: id })))
        throw new Error(`El usuario con ID ${id} no existe.`);
});
exports.userIdIsValid = userIdIsValid;
//# sourceMappingURL=db-validator.js.map