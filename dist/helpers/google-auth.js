"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleCredentials = void 0;
const google_auth_library_1 = require("google-auth-library");
const RequestError_1 = __importDefault(require("../errors/RequestError"));
const CLIENT_ID = process.env.G_PKEY;
const client = new google_auth_library_1.OAuth2Client(CLIENT_ID);
const verifyGoogleCredentials = async (idToken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userData = {
            nombre: payload === null || payload === void 0 ? void 0 : payload.name,
            img: payload === null || payload === void 0 ? void 0 : payload.picture,
            correo: payload === null || payload === void 0 ? void 0 : payload.email,
        };
        return userData;
    }
    catch (error) {
        throw (0, RequestError_1.default)([400, error.message]);
    }
};
exports.verifyGoogleCredentials = verifyGoogleCredentials;
//# sourceMappingURL=google-auth.js.map