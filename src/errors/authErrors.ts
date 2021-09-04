import { ReqErr } from "./errors";

const authErrors = {
	INCORRECT_PASSWORD: [401, "Tu contraseña es incorrecta."] as ReqErr,
	USER_NOT_REGISTERED: [401, "No estás registrado en el sistema."] as ReqErr,
	USER_DEACTIVATED: [403, "Tu cuenta está desactivada."] as ReqErr,
	USER_USED_GOOGLE: [401, "Tu cuenta fue registrada con Google."] as ReqErr,
	JWT_NOT_FOUND: [400, "El token de autorización no fue enviado."] as ReqErr,
	SKEY_NOT_FOUND: [
		500,
		"La SKEY no está definida en las variables de entorno.",
	] as ReqErr,
};

export default authErrors;
