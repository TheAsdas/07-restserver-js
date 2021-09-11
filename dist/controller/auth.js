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
exports.google = exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const google_auth_1 = require("../helpers/google-auth");
const json_web_tokens_1 = require("../helpers/json-web-tokens");
const errors_1 = require("../errors");
const models_1 = require("../models");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const { correo, clave } = req.body;
    const usuario = yield models_1.User.findOne({ correo, estado: true });
    try {
        const { USER_NOT_REGISTERED, USER_USED_GOOGLE, INCORRECT_PASSWORD } = errors_1.authErrors;
        if (!usuario)
            throw errors_1.RequestError(USER_NOT_REGISTERED);
        if (usuario.google)
            throw errors_1.RequestError(USER_USED_GOOGLE);
        if (!bcryptjs_1.compareSync(clave, usuario.clave))
            throw errors_1.RequestError(INCORRECT_PASSWORD);
        const token = yield json_web_tokens_1.generateJwt(usuario);
        res.json({
            msg: "Andy's log are here.",
            usuario,
            token,
        });
    }
    catch (error) {
        const { status = 400, message } = error;
        console.log(error);
        res.status(status).json({ msg: message });
    }
});
exports.login = login;
const google = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = yield google_auth_1.verifyGoogleCredentials(id_token);
        const { USER_DEACTIVATED } = errors_1.authErrors;
        let usuario = yield models_1.User.findOne({ correo });
        if (!usuario) {
            const userData = {
                nombre,
                img,
                correo,
                clave: "null",
                google: true,
                rol: "USER",
            };
            usuario = new models_1.User(userData);
            yield usuario.save();
        }
        else if (!usuario.estado)
            throw errors_1.RequestError(USER_DEACTIVATED);
        const token = yield json_web_tokens_1.generateJwt(usuario);
        res.json({
            msg: "Has iniciado sesión con Google correctamente.",
            user: usuario,
            token,
        });
    }
    catch (error) {
        const { status = 400, message: msg } = error;
        console.log(error);
        res.status(status).json({ msg });
    }
});
exports.google = google;
//# sourceMappingURL=auth.js.map