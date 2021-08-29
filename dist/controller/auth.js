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
exports.login = void 0;
const bcryptjs_1 = require("bcryptjs");
const Usuario_1 = __importDefault(require("../models/Usuario"));
const json_web_tokens_1 = require("../helpers/json-web-tokens");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, clave } = req.body;
    const usuario = yield Usuario_1.default.findOne({ correo, estado: true });
    try {
        if (!usuario)
            return res.status(400).json({
                msg: "Este usuario no está registrado.",
            });
        if (!bcryptjs_1.compareSync(clave, usuario.clave))
            return res.status(400).json({ msg: "La contraseña es incorrecta." });
        const token = yield json_web_tokens_1.generateJwt(usuario.id);
        return res.json({
            msg: "Andy's log are here.",
            usuario,
            token,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "¿Servidor no funciona? Entendible. Tenga un buen día. P.D.: Avísele al administrador.",
        });
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map