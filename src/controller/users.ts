import { RequestHandler } from "express";

export const users_get: RequestHandler = (req, res) => {
  res.status(418).json({ status: "get", response: "Hola, mundo!" });
};

export const users_put: RequestHandler = (req, res) => {
  res.json({ status: "put", response: "Hola, mundo!" });
};

export const users_post: RequestHandler = (req, res) => {
  res.status(201).json({ status: "post", response: "Hola, mundo!" });
};

export const users_delete: RequestHandler = (req, res) => {
  res.json({ status: "delete", response: "Hola, mundo!" });
};
