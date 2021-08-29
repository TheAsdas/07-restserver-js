import { rejects } from "assert";
import { sign } from "jsonwebtoken";

export const generateJwt = (uid: string): Promise<string | undefined> => {
  return new Promise((res, rej) => {
    const payload = { uid };
    const key = process.env.SKEY;

    if (key)
      sign(payload, key, { expiresIn: "4" }, (err, token) => {
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
