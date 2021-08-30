import { compareSync } from "bcryptjs";
import { RequestHandler } from "express";
import Usuario from "../models/Usuario";
import { generateJwt } from "../helpers/json-web-tokens";
import RequestError from "../models/RequestError";

export const login: RequestHandler = async (req, res) => {
  const { correo, clave } = req.body;
  const usuario = await Usuario.findOne({ correo, estado: true });

  try {
    const notRegistered =
        "Este usuario no está registrado en la base de datos.",
      incorrectPass = "La contraseña está incorrecta.";

    if (!usuario) throw new RequestError(401, notRegistered);

    // si la contraseña está incorrecta:
    if (!compareSync(clave, usuario.clave))
      throw new RequestError(401, incorrectPass);

    // generar JWT
    const token = await generateJwt(usuario);

    return res.json({
      msg: "Andy's log are here.",
      usuario,
      token,
    });
  } catch (error) {
    const { status, message } = error as RequestError;
    console.log(error);
    return res.status(status ?? 400).json({ msg: message });
  }
};
