import { RequestHandler } from "express";
import Usuario from "../models/Usuario";
import { hashSync } from "bcryptjs";

export const users_get: RequestHandler = (req, res) => {
  const { tuVieja, tuHermana } = req.query;
  res
    .status(418)
    .json({ status: "get", response: "Hola, mundo!", tuVieja, tuHermana });
};

export const users_put: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { clave, google, ...data } = req.body;

  if (clave) {
    data.clave = hashSync(clave);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, data);

  res.json({ msg: "Usuario actualizado.", usuario });
};

export const users_post: RequestHandler = async (req, res) => {
  const { nombre, correo, clave, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, clave, rol });

  //Encriptar la contraseña:
  usuario.clave = hashSync(clave);

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
