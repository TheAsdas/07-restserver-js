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
exports.users_patch = exports.users_delete = exports.users_post = exports.users_put = exports.users_get = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const users_get = (req, res) => {
    const { tuVieja, tuHermana } = req.query;
    res
        .status(418)
        .json({ status: "get", response: "Hola, mundo!", tuVieja, tuHermana });
};
exports.users_get = users_get;
const users_put = (req, res) => {
    const { id } = req.params;
    res.json({ status: "put", response: "Hola, mundo!", id });
};
exports.users_put = users_put;
const users_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, clave, rol } = req.body;
    const usuario = new Usuario_1.default({ nombre, correo, clave, rol });
    const errores = express_validator_1.validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json(errores);
    }
    if (yield Usuario_1.default.exists({ correo }))
        return res
            .status(400)
            .json({ msg: "Este correo ya está registrado en el sistema." });
    const salt = bcryptjs_1.default.genSaltSync();
    usuario.clave = bcryptjs_1.default.hashSync(clave, salt);
    try {
        yield usuario.save();
    }
    catch (error) {
        res.status(400).json(error).send();
        return;
    }
    return res
        .status(201)
        .json({ msg: "Hemos creado al usuario exitosamente.", usuario });
});
exports.users_post = users_post;
const users_delete = (req, res) => {
    res.json({ status: "delete", response: "Hola, mundo!" });
};
exports.users_delete = users_delete;
const users_patch = (req, res) => {
    res.json({ status: "patch", response: "Hola, mundo!" });
};
exports.users_patch = users_patch;
//# sourceMappingURL=users.js.map