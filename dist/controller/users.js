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
exports.patch = exports.delete_ = exports.post = exports.put = exports.get = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const bcryptjs_1 = require("bcryptjs");
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const errors = [];
    if (isNaN(Number(limite)))
        errors.push({ msg: "El límite no es un número válido." });
    if (isNaN(Number(desde)))
        errors.push({ msg: "Desde no es un número válido." });
    if (errors.length !== 0)
        return res.json({ errors });
    const query = { estado: true };
    const [total, usuarios] = yield Promise.all([
        Usuario_1.default.count(query),
        Usuario_1.default.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);
    return res.json({ total, usuarios });
});
exports.get = get;
const put = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { clave, google, estado, _id } = _a, data = __rest(_a, ["clave", "google", "estado", "_id"]);
    if (clave) {
        data.clave = bcryptjs_1.hashSync(clave);
    }
    const usuario = yield Usuario_1.default.findByIdAndUpdate(id, data);
    res.json({ msg: "Usuario actualizado.", usuario });
});
exports.put = put;
const post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.post = post;
const delete_ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const uid = req.header("uid");
    const rol = req.header("rol");
    const requestingUser = req.user;
    const deletedUser = yield Usuario_1.default.findByIdAndUpdate(id, { estado: false });
    return res.json({
        msg: "Hemos borrado el usuario correctamente.",
        requestingUser,
        deletedUser,
        uid,
    });
});
exports.delete_ = delete_;
const patch = (req, res) => {
    res.json({ status: "patch", response: "Hola, mundo!" });
};
exports.patch = patch;
//# sourceMappingURL=users.js.map