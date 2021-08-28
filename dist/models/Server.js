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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("../routes/users"));
const config_1 = require("../database/config");
class Server {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            this._app = express_1.default();
            this._port = process.env.PORT;
            this._ready = false;
            yield (yield this.connect()).middlewares().routes();
            return this;
        });
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.connectToDb();
            return this;
        });
    }
    static routes() {
        this._app.use(this._routes.user, users_1.default);
        return this;
    }
    static middlewares() {
        this._app.use(express_1.default.static("dist/public"), cors_1.default(), express_1.default.json());
        return this;
    }
    static listen() {
        this._app.listen(this._port, () => {
            console.log("Servidor escuchando en el puerto", this._port);
        });
        return this;
    }
}
Server._routes = {
    user: "/api/usuarios",
};
exports.default = Server;
//# sourceMappingURL=Server.js.map