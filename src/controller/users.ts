import { RequestHandler } from "express";

export const users_get: RequestHandler = (req, res) => {
  const { tuVieja, tuHermana } = req.query;
  res
    .status(418)
    .json({ status: "get", response: "Hola, mundo!", tuVieja, tuHermana });
};

export const users_put: RequestHandler = (req, res) => {
  const { id } = req.params;
  res.json({ status: "put", response: "Hola, mundo!", id });
};

export const users_post: RequestHandler = (req, res) => {
  const body = req.body;
  res.status(201).json({ status: "post", response: "Hola, mundo!", body });
};

export const users_delete: RequestHandler = (req, res) => {
  res.json({ status: "delete", response: "Hola, mundo!" });
};

export const users_patch: RequestHandler = (req, res) => {
  res.json({ status: "patch", response: "Hola, mundo!" });
};
