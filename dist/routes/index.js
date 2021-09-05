"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = exports.user = exports.category = exports.auth = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const categories_1 = __importDefault(require("./categories"));
const users_1 = __importDefault(require("./users"));
exports.auth = auth_1.default;
exports.category = categories_1.default;
exports.user = users_1.default;
exports.product = (0, express_1.Router)();
//# sourceMappingURL=index.js.map