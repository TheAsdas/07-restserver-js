import { compareSync } from "bcryptjs";
import { RequestHandler } from "express";
import Usuario from "../models/Usuario";
import { generateJwt } from "../helpers/json-web-tokens";

export const login: RequestHandler = async (req, res) => {
  const { correo, clave } = req.body;
  const usuario = await Usuario.findOne({ correo, estado: true });

  try {
    // si el usuario no existe:
    if (!usuario)
      return res.status(400).json({
        msg: "Este usuario no está registrado.",
      });

    // si la contraseña está incorrecta:
    if (!compareSync(clave, usuario.clave))
      return res.status(400).json({ msg: "La contraseña es incorrecta." });

    // generar JWT
    const token = await generateJwt(usuario.id);
    return res.json({
      msg: "Andy's log are here.",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "¿Servidor no funciona? Entendible. Tenga un buen día. P.D.: Avísele al administrador.",
    });
  }
};
