import { ReqErr } from "./.d";

const errorList = {
	SEARCH_NOT_IMPLEMENTED: [
		500,
		"La búsqueda en esta colección no ha sido implementada.",
	] as ReqErr,
	DEFAULT_ERROR: [500, "Algo salió mal."] as ReqErr,
};

export default errorList;
