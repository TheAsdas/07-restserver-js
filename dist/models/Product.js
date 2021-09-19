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
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Usuario", required: true },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category", required: true },
    editedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Usuario" },
    name: { type: String, required: true, unique: true },
    available: { type: Boolean, default: true },
    state: { type: Boolean, default: true },
    description: { type: String },
    price: { type: Number },
}, {});
schema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, state } = _a, data = __rest(_a, ["__v", "state"]);
    return data;
};
exports.default = mongoose_1.model("Product", schema);
//# sourceMappingURL=Product.js.map