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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users_patch = exports.users_delete = exports.users_post = exports.users_put = exports.users_get = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const bcryptjs_1 = require("bcryptjs");
const users_get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const errors = [];
    if (isNaN(Number(limite)))
        errors.push({ msg: "El límite no es un número válido." });
    if (isNaN(Number(desde)))
        errors.push({ msg: "Desde no es un número válido." });
    if (errors.length !== 0)
        return res.json({ errors: errors });
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        Usuario_1.default.count(query),
        Usuario_1.default.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);
    return res.json({ total, usuarios });
});
exports.users_get = users_get;
const users_put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { clave, google } = _a, data = __rest(_a, ["clave", "google"]);
    if (clave) {
        data.clave = bcryptjs_1.hashSync(clave);
    }
    const usuario = yield Usuario_1.default.findByIdAndUpdate(id, data);
    res.json({ msg: "Usuario actualizado.", usuario });
});
exports.users_put = users_put;
const users_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, clave, rol } = req.body;
    const usuario = new Usuario_1.default({ nombre, correo, clave, rol });
    usuario.clave = bcryptjs_1.hashSync(clave);
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