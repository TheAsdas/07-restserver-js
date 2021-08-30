"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateJwt = ({ _id, rol, }) => {
    return new Promise((res, rej) => {
        const payload = { uid: _id, rol };
        const key = process.env.SKEY;
        if (key)
            jsonwebtoken_1.sign(payload, key, { expiresIn: "4h" }, (err, token) => {
                if (err) {
                    console.log(err);
                    rej("Hemos tenido un problema para generar el token.");
                }
                else {
                    res(token);
                }
            });
        else
            rej("La clave pública no está definida en las variables de entorno.");
    });
};
exports.generateJwt = generateJwt;
//# sourceMappingURL=json-web-tokens.js.map