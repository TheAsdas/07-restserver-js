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
exports.googleSignIn = exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const Usuario_1 = __importDefault(require("../models/Usuario"));
const json_web_tokens_1 = require("../helpers/json-web-tokens");
const RequestError_1 = __importDefault(require("../models/RequestError"));
const google_auth_1 = require("../helpers/google-auth");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, clave } = req.body;
    const usuario = yield Usuario_1.default.findOne({ correo, estado: true });
    try {
        const notRegistered = "Este usuario no está registrado en la base de datos.";
        const incorrectPass = "La contraseña está incorrecta.";
        if (!usuario)
            throw new RequestError_1.default(401, notRegistered);
        if (!bcryptjs_1.compareSync(clave, usuario.clave))
            throw new RequestError_1.default(401, incorrectPass);
        const token = yield json_web_tokens_1.generateJwt(usuario);
        return res.json({
            msg: "Andy's log are here.",
            usuario,
            token,
        });
    }
    catch (error) {
        const { code: status, message } = error;
        console.log(error);
        return res.status(status !== null && status !== void 0 ? status : 400).json({ msg: message });
    }
});
exports.login = login;
const googleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = yield google_auth_1.verifyGoogleCredentials(id_token);
        let usuario = yield Usuario_1.default.findOne({ correo });
        if (!usuario) {
            const userData = {
                nombre,
                img,
                correo,
                clave: "null",
                google: true,
                rol: "USER",
            };
            usuario = new Usuario_1.default(userData);
            yield usuario.save();
        }
        else if (!usuario.estado) {
            throw new RequestError_1.default(401, "Este usuario está desactivado.");
        }
        const token = yield json_web_tokens_1.generateJwt(usuario);
        return res.json({
            msg: "Has iniciado sesión con Google correctamente.",
            user: usuario,
            token,
        });
    }
    catch (error) {
        const { code, message } = error;
        console.log(error);
        return res.status(code !== null && code !== void 0 ? code : 500).json({ msg: message });
    }
});
exports.googleSignIn = googleSignIn;
//# sourceMappingURL=auth.js.map