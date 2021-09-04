import { ReqErr } from "./errors.d";
import { iRequestError } from "./errors.d";

export const RequestError = (error: ReqErr) => {
  const reqError = Error(error[1]) as iRequestError;
  reqError.status = error[0];
  return reqError as iRequestError;
};

export default RequestError;
