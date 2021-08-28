import { RequestHandler } from "express";
import Usuario from "../models/Usuario";
import bcryptjs from "bcryptjs";

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

export const users_post: RequestHandler = async (req, res) => {
  const { nombre, correo, clave, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, clave, rol });

  //Encriptar la contraseña:
  const salt = bcryptjs.genSaltSync();
  usuario.clave = bcryptjs.hashSync(clave, salt);

  //Guardar en DB
  try {
    await usuario.save();
  } catch (error) {
    res.status(400).json(error).send();
    return;
  }
  return res
    .status(201)
    .json({ msg: "Hemos creado al usuario exitosamente.", usuario });
};

export const users_delete: RequestHandler = (req, res) => {
  res.json({ status: "delete", response: "Hola, mundo!" });
};

export const users_patch: RequestHandler = (req, res) => {
  res.json({ status: "patch", response: "Hola, mundo!" });
};
