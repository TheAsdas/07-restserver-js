"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.products = exports.categories = exports.auth = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.auth = auth_1.default;
const categories_1 = __importDefault(require("./categories"));
exports.categories = categories_1.default;
const users_1 = __importDefault(require("./users"));
exports.users = users_1.default;
const products_1 = __importDefault(require("./products"));
exports.products = products_1.default;
//# sourceMappingURL=index.js.map