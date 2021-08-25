"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users_patch = exports.users_delete = exports.users_post = exports.users_put = exports.users_get = void 0;
const users_get = (req, res) => {
    const { tuVieja, tuHermana } = req.query;
    res
        .status(418)
        .json({ status: "get", response: "Hola, mundo!", tuVieja, tuHermana });
};
exports.users_get = users_get;
const users_put = (req, res) => {
    const { id } = req.params;
    res.json({ status: "put", response: "Hola, mundo!", id });
};
exports.users_put = users_put;
const users_post = (req, res) => {
    const body = req.body;
    res.status(201).json({ status: "post", response: "Hola, mundo!", body });
};
exports.users_post = users_post;
const users_delete = (req, res) => {
    res.json({ status: "delete", response: "Hola, mundo!" });
};
exports.users_delete = users_delete;
const users_patch = (req, res) => {
    res.json({ status: "patch", response: "Hola, mundo!" });
};
exports.users_patch = users_patch;
//# sourceMappingURL=users.js.map