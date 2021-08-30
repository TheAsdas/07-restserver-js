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
exports.validateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const validateJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("x-token");
    if (!token)
        return res
            .status(401)
            .json({ msg: "El token de autorización no fue enviado." });
    try {
        const key = process.env.SKEY;
        if (key) {
            const { uid } = jsonwebtoken_1.default.verify(token, key);
            const user = yield Usuario_1.default.findOne({ _id: uid, estado: true });
            console.log(user);
            if (!user)
                throw new Error("Los muertos no pueden votar.");
            req.headers["uid"] = uid;
            req.user = user;
        }
        else
            return res.status(500).json({
                msg: "La SKEY no está definida en las variables de entorno.",
            });
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ msg: error.message });
    }
});
exports.validateJwt = validateJwt;
//# sourceMappingURL=validate-jwt.js.map