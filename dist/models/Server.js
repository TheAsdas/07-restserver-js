"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("../routes/users"));
class Server {
    static init() {
        this._app = express_1.default();
        this._port = process.env.PORT;
        this.middlewares().routes();
        return this;
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
            console.log("Escuchando en el puerto " + this._port);
        });
        return this;
    }
}
Server._routes = {
    user: "/api/usuarios",
};
exports.default = Server;
//# sourceMappingURL=Server.js.map