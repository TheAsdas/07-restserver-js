"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        const uri = process.env.MONGO;
        if (uri)
            await mongoose_1.default.connect(uri, {});
        console.log("Conexión exitosa con la base de datos.");
    }
    catch (error) {
        console.log(error);
        throw Error("No pudimos conectarnos con la base de datos.");
    }
};
exports.connect = connect;
//# sourceMappingURL=config.js.map