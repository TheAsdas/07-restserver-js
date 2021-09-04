export interface iRequestError extends Error {
  status: number;
}

export type ReqErr = [status: number, message: string];