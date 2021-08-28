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
exports.userIsUnique = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const Usuario_1 = __importDefault(require("../models/Usuario"));
const validate = (req, res, next) => {
    const errores = express_validator_1.validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json(errores);
    }
    next();
};
exports.validate = validate;
const userIsUnique = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo } = req.body;
        if (yield Usuario_1.default.exists({ correo }))
            return res.status(400).json({
                errors: [
                    {
                        value: correo,
                        msg: "Este usuario ya está registrado en la base de datos.",
                        param: "correo",
                        location: "body",
                    },
                ],
            });
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.userIsUnique = userIsUnique;
//# sourceMappingURL=field-validations.js.map