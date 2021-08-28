import { RequestHandler } from "express";
import Usuario from "../models/Usuario";
import { hashSync } from "bcryptjs";

export const users_get: RequestHandler = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const errors: { msg: string }[] = [];

  if (isNaN(Number(limite)))
    errors.push({ msg: "El límite no es un número válido." });

  if (isNaN(Number(desde)))
    errors.push({ msg: "Desde no es un número válido." });

  if (errors.length !== 0) return res.json({ errors: errors });

  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.count(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  return res.json({ total, usuarios });
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

export const users_delete: RequestHandler = async (req, res) => {
  const { id } = req.params;

  //Borrar físicamente:
  // const usuario = await Usuario.findByIdAndRemove(id);
  // Borrar ideologicamente:
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  return res.json({ msg: "Hemos borrado el usuario correctamente.", usuario });
};

export const users_patch: RequestHandler = (req, res) => {
  res.json({ status: "patch", response: "Hola, mundo!" });
};
