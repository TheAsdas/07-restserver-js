import { compareSync } from "bcryptjs";
import { RequestHandler } from "express";
import Usuario from "../models/Usuario";
import { generateJwt } from "../helpers/json-web-tokens";
import RequestError from "../models/RequestError";
import { verifyGoogleCredentials } from "../helpers/google-auth";

export const login: RequestHandler = async (req, res) => {
  const { correo, clave } = req.body;
  const usuario = await Usuario.findOne({ correo, estado: true });

  try {
    const notRegistered =
      "Este usuario no está registrado en la base de datos.";
    const incorrectPass = "La contraseña está incorrecta.";

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
    const { code: status, message } = error as RequestError;
    console.log(error);
    return res.status(status ?? 400).json({ msg: message });
  }
};

export const googleSignIn: RequestHandler = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await verifyGoogleCredentials(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      //crear usuario
      const userData = {
        nombre,
        img,
        correo,
        clave: "null",
        google: true,
        rol: "USER",
      };
      usuario = new Usuario(userData);
      await usuario.save();
    } else if (!usuario.estado) {
      throw new RequestError(401, "Este usuario está desactivado.");
    }

    const token = await generateJwt(usuario);

    return res.json({
      msg: "Has iniciado sesión con Google correctamente.",
      user: usuario,
      token,
    });
  } catch (error) {
    const { code, message } = error;

    console.log(error);
    return res.status(code ?? 500).json({ msg: message });
  }
};
