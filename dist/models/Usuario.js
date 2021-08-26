"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio."],
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio."],
        unique: [true, "Este correo ya está registrado."],
    },
    clave: {
        type: String,
        required: [true, "La contraseña es obligatoria."],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ["ADMIN", "USER"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});
exports.default = mongoose_1.model("Usuario", UsuarioSchema);
//# sourceMappingURL=Usuario.js.map