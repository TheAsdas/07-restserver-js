"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../database/config");
const routes = __importStar(require("../routes"));
const errors_1 = require("../errors");
const paths = {
    auth: "/api/auth",
    categories: "/api/categorias",
    users: "/api/usuarios",
    products: "/api/productos",
};
const ServerConstructor = async (port) => {
    var _a;
    const server = {
        app: express_1.default(),
        port: (_a = port === null || port === void 0 ? void 0 : port.toString()) !== null && _a !== void 0 ? _a : process.env.PORT,
        listen: () => listen(server),
    };
    await connectToDatabase();
    setMiddlewares(server);
    setRoutes(server);
    return server;
};
const connectToDatabase = async () => await config_1.connect();
const setRoutes = (server) => {
    Object.keys(paths).forEach((key) => {
        let router = routes[key];
        if (!router)
            throw errors_1.RouteError(key);
        server.app.use(paths[key], router);
    });
};
const setMiddlewares = (server) => {
    server.app.use([express_1.default.static("dist/public"), express_1.default.json(), cors_1.default()]);
};
const listen = (server) => {
    const { app, port } = server;
    if (!port)
        throw Error("El puerto no fue especificado.");
    app.listen(port, () => {
        console.log("Servidor escuchando en el puerto", port);
    });
};
exports.default = ServerConstructor;
//# sourceMappingURL=Server.js.map