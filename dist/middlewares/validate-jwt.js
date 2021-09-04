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
exports.validateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const RequestError_1 = __importDefault(require("../errors/RequestError"));
const authErrors_1 = __importDefault(require("../errors/authErrors"));
const validateJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { JWT_NOT_FOUND, SKEY_NOT_FOUND, USER_DEACTIVATED } = authErrors_1.default;
        const token = req.header("x-token");
        const key = process.env.SKEY;
        let uid;
        if (!token)
            throw (0, RequestError_1.default)(JWT_NOT_FOUND);
        else if (!key)
            throw (0, RequestError_1.default)(SKEY_NOT_FOUND);
        try {
            let payload = jsonwebtoken_1.default.verify(token, key);
            uid = payload.uid;
        }
        catch (error) {
            const { message } = error;
            throw (0, RequestError_1.default)([400, message]);
        }
        const user = yield Usuario_1.default.findOne({ _id: uid, estado: true });
        if (!user)
            throw (0, RequestError_1.default)(USER_DEACTIVATED);
        req.headers["uid"] = uid;
        req.user = user;
        next();
    }
    catch (error) {
        const { message, status = 500 } = error;
        console.log(error);
        return res.status(status).json({ msg: message });
    }
});
exports.validateJwt = validateJwt;
//# sourceMappingURL=validate-jwt.js.map