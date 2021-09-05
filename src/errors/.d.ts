export interface iRequestError extends Error {
  /**
   * Estatus de error de la petición HTTP.
   */
  status: number;
}

/**
 * Datos requeridos para crear un  RequestError
 */
export type ReqErr = [status: number, message: string];
