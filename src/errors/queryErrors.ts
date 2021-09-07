import { ReqErr } from "./.d";

const errorList = {
	ALREADY_EXISTS: [400, "Este elemento ya existe en el sistema."] as ReqErr,
	DOES_NOT_EXIST: [
		400,
		"El elemento sobre el cual se quiere hacer la acción no existe.",
	] as ReqErr,
};

export default errorList;
