"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHasRoles = exports.userIsAdmin = void 0;
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
const userHasRoles = (...validRoles) => {
    return (req, res, next) => {
        const userRole = req.user.rol;
        if (!validRoles.includes(userRole))
            return res.status(401).json({
                msg: `El usuario tiene el rol ${userRole}, y no tiene permisos. Roles con permisiones: ${validRoles.join(", ")}.`,
            });
        next();
    };
};
exports.userHasRoles = userHasRoles;
//# sourceMappingURL=validate-roles.js.map