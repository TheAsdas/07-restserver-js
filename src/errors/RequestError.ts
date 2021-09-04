import { ReqErr } from "./errors.d";
import { iRequestError } from "./errors.d";

/**
 * Crea un error que se puede lanzar cuando algo sale mal en una petición HTTP.
 */
export const RequestErrorConstructor = (error: ReqErr) => {
  const reqError = Error(error[1]) as iRequestError;
  reqError.status = error[0];
  return reqError as iRequestError;
};

export default RequestErrorConstructor;
