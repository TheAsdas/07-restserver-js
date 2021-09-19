"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.google = exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const google_auth_1 = require("../helpers/google-auth");
const json_web_tokens_1 = require("../helpers/json-web-tokens");
const errors_1 = require("../errors");
const models_1 = require("../models");
const login = async (req, res) => {
    console.log(req);
    const { correo, clave } = req.body;
    const usuario = await models_1.User.findOne({ correo, estado: true });
    try {
        const { USER_NOT_REGISTERED, USER_USED_GOOGLE, INCORRECT_PASSWORD } = errors_1.authErrors;
        if (!usuario)
            throw errors_1.RequestError(USER_NOT_REGISTERED);
        if (usuario.google)
            throw errors_1.RequestError(USER_USED_GOOGLE);
        if (!bcryptjs_1.compareSync(clave, usuario.clave))
            throw errors_1.RequestError(INCORRECT_PASSWORD);
        const token = await json_web_tokens_1.generateJwt(usuario);
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
};
exports.login = login;
const google = async (req, res) => {
    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = await google_auth_1.verifyGoogleCredentials(id_token);
        const { USER_DEACTIVATED } = errors_1.authErrors;
        let usuario = await models_1.User.findOne({ correo });
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
            await usuario.save();
        }
        else if (!usuario.estado)
            throw errors_1.RequestError(USER_DEACTIVATED);
        const token = await json_web_tokens_1.generateJwt(usuario);
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
};
exports.google = google;
//# sourceMappingURL=auth.js.map