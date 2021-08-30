import { Request, Response } from "express";
import { iUsuario } from "../models/Usuario";

export const userIsAdmin = (req: Request, res: Response, next: Function) => {
  ///@ts-ignore
  const usuario: iUsuario = req.user;
  if (!usuario)
    return res
      .status(500)
      .json({ msg: "El usuario no está definido en el Request." });

  const { rol, nombre } = usuario;
  if (rol !== "ADMIN")
    return res
      .status(401)
      .json({ msg: `${nombre} no tiene permisos de ADMIN.` });
  next();
};
