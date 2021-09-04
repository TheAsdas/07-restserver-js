"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    rol: {
        type: String,
        required: [true, "Eñ rol es obligatorio."],
    },
});
const Rol = (0, mongoose_1.model)("role", schema);
exports.default = Rol;
//# sourceMappingURL=Rol.js.map