"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.categories = exports.auth = void 0;
const auth_1 = __importDefault(require("./auth"));
const categories_1 = __importDefault(require("./categories"));
const users_1 = __importDefault(require("./users"));
exports.auth = auth_1.default;
exports.categories = categories_1.default;
exports.users = users_1.default;
//# sourceMappingURL=index.js.map