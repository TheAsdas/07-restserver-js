"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHasRoles = exports.userIsAdmin = void 0;
const errors_1 = require("../errors");
const userIsAdmin = (req, res, next) => {
    try {
        const userRole = req.user.rol;
        const { USER_NOT_DEFINED, NO_PRIVILEGES } = errors_1.authErrors;
        if (!userRole)
            throw (0, errors_1.RequestError)(USER_NOT_DEFINED);
        if (userRole !== "ADMIN")
            throw (0, errors_1.RequestError)(NO_PRIVILEGES);
        next();
    }
    catch (error) {
        const { status = 500, message } = error;
        res.status(status).json({ msg: message });
    }
};
exports.userIsAdmin = userIsAdmin;
const userHasRoles = (...validRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.rol;
            const { USER_NOT_DEFINED, NO_PRIVILEGES } = errors_1.authErrors;
            if (!userRole)
                throw (0, errors_1.RequestError)(USER_NOT_DEFINED);
            if (!validRoles.includes(userRole))
                throw (0, errors_1.RequestError)(NO_PRIVILEGES);
            next();
        }
        catch (error) {
            const { status = 500, message } = error;
            res.status(status).json({ msg: message });
        }
    };
};
exports.userHasRoles = userHasRoles;
//# sourceMappingURL=validate-roles.js.map