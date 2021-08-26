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
exports.conectarDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conectarDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uri = process.env.MONGO_CONNECTION;
        if (uri) {
            yield mongoose_1.default.connect(uri, {}, () => { });
            console.log("Conexión a la base de datos exitosa.");
        }
    }
    catch (error) {
        console.log(error);
        throw new Error("Fue imposible conectarse a la base de datos.");
    }
});
exports.conectarDb = conectarDb;
//# sourceMappingURL=config.js.map