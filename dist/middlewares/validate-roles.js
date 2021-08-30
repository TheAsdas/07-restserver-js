"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsAdmin = void 0;
const userIsAdmin = (req, res, next) => {
    const usuario = req.user;
    if (!usuario)
        return res
            .status(500)
            .json({ msg: "El usuario no está definido en el Request." });
    const { rol, nombre } = usuario;
    if (rol !== "ADMIN")
        return res
            .status(401)
            .json({ msg: `${nombre} no tiene permisos de ADMIN.` });
    next();
};
exports.userIsAdmin = userIsAdmin;
//# sourceMappingURL=validate-roles.js.map