import { ReqErr } from "./.d";
import { iRequestError } from "./.d";

/**
 * Crea un error que se puede lanzar cuando algo sale mal en una petición HTTP.
 */
export const RequestErrorConstructor = (error: ReqErr) => {
	const reqError = Error(error[1]) as iRequestError;
	reqError.status = error[0];
	return reqError;
};

export default RequestErrorConstructor;
