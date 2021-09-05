"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    state: { type: Boolean, default: true },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Usuario", required: true },
});
const Category = (0, mongoose_1.model)("Category", schema);
exports.default = Category;
//# sourceMappingURL=Category.js.map