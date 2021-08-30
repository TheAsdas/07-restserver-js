import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario from "../models/Usuario";

export const validateJwt = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = req.header("x-token");

  if (!token)
    return res
      .status(401)
      .json({ msg: "El token de autorización no fue enviado." });

  try {
    const key = process.env.SKEY;
    if (key) {
      const { uid } = jwt.verify(token, key) as JwtPayload;
      const user = await Usuario.findOne({ _id: uid, estado: true });

      console.log(user);
      
      if (!user) throw new Error("Los muertos no pueden votar." );
      req.headers["uid"] = uid;
      ///@ts-ignore
      req.user = user;
    } else
      return res.status(500).json({
        msg: "La SKEY no está definida en las variables de entorno.",
      });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: error.message });
  }
};
