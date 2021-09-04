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
exports.google = exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const Usuario_1 = __importDefault(require("../models/Usuario"));
const json_web_tokens_1 = require("../helpers/json-web-tokens");
const RequestError_1 = __importDefault(require("../errors/RequestError"));
const google_auth_1 = require("../helpers/google-auth");
const authErrors_1 = __importDefault(require("../errors/authErrors"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const { correo, clave } = req.body;
    const usuario = yield Usuario_1.default.findOne({ correo, estado: true });
    try {
        const { USER_NOT_REGISTERED, USER_USED_GOOGLE, INCORRECT_PASSWORD } = authErrors_1.default;
        if (!usuario)
            throw (0, RequestError_1.default)(USER_NOT_REGISTERED);
        if (usuario.google)
            throw (0, RequestError_1.default)(USER_USED_GOOGLE);
        if (!(0, bcryptjs_1.compareSync)(clave, usuario.clave))
            throw (0, RequestError_1.default)(INCORRECT_PASSWORD);
        const token = yield (0, json_web_tokens_1.generateJwt)(usuario);
        return res.json({
            msg: "Andy's log are here.",
            usuario,
            token,
        });
    }
    catch (error) {
        const { status = 400, message } = error;
        console.log(error);
        return res.status(status).json({ msg: message });
    }
});
exports.login = login;
const google = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = yield (0, google_auth_1.verifyGoogleCredentials)(id_token);
        const { USER_DEACTIVATED } = authErrors_1.default;
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
        else if (!usuario.estado)
            throw (0, RequestError_1.default)(USER_DEACTIVATED);
        const token = yield (0, json_web_tokens_1.generateJwt)(usuario);
        return res.json({
            msg: "Has iniciado sesión con Google correctamente.",
            user: usuario,
            token,
        });
    }
    catch (error) {
        const { status = 400, message: msg } = error;
        console.log(error);
        return res.status(status).json({ msg });
    }
});
exports.google = google;
//# sourceMappingURL=auth.js.map