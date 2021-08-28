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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_1 = require("../controller/users");
const field_validations_1 = require("../middlewares/field-validations");
const users_2 = require("../controller/users");
const Rol_1 = __importDefault(require("../models/Rol"));
const userRouter = express_1.Router();
const users_post_middlewares = [
    field_validations_1.userIsUnique,
    express_validator_1.check("nombre", "El nombre es obligatorio y no puede estar vacío.")
        .not()
        .isEmpty(),
    express_validator_1.check("clave", "La contraseña es obligatoria y debe tener más de 6 caracteres.").isLength({ min: 6 }),
    express_validator_1.check("rol").custom((rol) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(yield Rol_1.default.exists({ rol })))
            throw new Error(`El rol ${rol} no es un rol válido.`);
    })),
    express_validator_1.check("correo", "El correo no es válido.").isEmail(),
    field_validations_1.validate,
];
userRouter.get("/", users_2.users_get);
userRouter.put("/:id", users_2.users_put);
userRouter.post("/", users_post_middlewares, users_2.users_post);
userRouter.delete("/", users_2.users_delete);
userRouter.patch("/", users_1.users_patch);
exports.default = userRouter;
//# sourceMappingURL=users.js.map