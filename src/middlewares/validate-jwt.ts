import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario from "../models/Usuario";
import { Middleware } from "./middlewares";
import RequestError from "../errors/RequestError";
import authErrors from "../errors/authErrors";
import { iRequestError } from "../errors/errors";

export const validateJwt: Middleware = async (req, res, next) => {
	try {
		const { JWT_NOT_FOUND, SKEY_NOT_FOUND, USER_DEACTIVATED } = authErrors;
		const token = req.header("x-token");
		const key = process.env.SKEY;
		let uid;

		if (!token) throw RequestError(JWT_NOT_FOUND);
		else if (!key) throw RequestError(SKEY_NOT_FOUND);

		try {
			let payload = jwt.verify(token, key) as JwtPayload;
			uid = payload.uid;
			//uid = _uid;
		} catch (error) {
			const { message } = error as Error;
			throw RequestError([400, message]);
		}

		const user = await Usuario.findOne({ _id: uid, estado: true });

		if (!user) throw RequestError(USER_DEACTIVATED);

		req.headers["uid"] = uid;
		///@ts-ignore
		req.user = user;
		next();
	} catch (error) {
		const { message, status = 500 } = error as iRequestError;

		console.log(error);
		return res.status(status).json({ msg: message });
	}
};
