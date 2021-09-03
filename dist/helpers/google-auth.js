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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleCredentials = void 0;
const google_auth_library_1 = require("google-auth-library");
const CLIENT_ID = process.env.G_PKEY;
const client = new google_auth_library_1.OAuth2Client(CLIENT_ID);
const verifyGoogleCredentials = (idToken) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield client.verifyIdToken({
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
});
exports.verifyGoogleCredentials = verifyGoogleCredentials;
//# sourceMappingURL=google-auth.js.map