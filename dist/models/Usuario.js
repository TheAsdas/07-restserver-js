"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio."],
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio."],
        unique: true,
    },
    clave: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
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
schema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, clave, _id } = _a, user = __rest(_a, ["__v", "clave", "_id"]);
    user.uid = _id;
    return user;
};
exports.default = (0, mongoose_1.model)("Usuario", schema);
//# sourceMappingURL=Usuario.js.map