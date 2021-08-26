import { RequestHandler } from "express";
import Usuario from "../models/Usuario";

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
  const usuario = new Usuario(body);

  console.log(body);
  res.json(req.body);
};

export const users_delete: RequestHandler = (req, res) => {
  res.json({ status: "delete", response: "Hola, mundo!" });
};

export const users_patch: RequestHandler = (req, res) => {
  res.json({ status: "patch", response: "Hola, mundo!" });
};
