import { sign } from "jsonwebtoken";
import { iUser } from '../models/.d';

export const generateJwt = ({
  _id,
  rol,
}: iUser): Promise<string | undefined> => {
  return new Promise((res, rej) => {
    const payload = { uid: _id, rol };
    const key = process.env.SKEY;

    if (key)
      sign(payload, key, { expiresIn: "4h" }, (err, token) => {
        if (err) {
          console.log(err);
          rej("Hemos tenido un problema para generar el token.");
        } else {
          res(token);
        }
      });
    else rej("La clave pública no está definida en las variables de entorno.");
  });
};
