import { OAuth2Client } from "google-auth-library";
import RequestError from "../errors/RequestError";

const CLIENT_ID = process.env.G_PKEY;

const client = new OAuth2Client(CLIENT_ID);

export const verifyGoogleCredentials = async (idToken: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const userData = {
      nombre: payload?.name,
      img: payload?.picture,
      correo: payload?.email,
    };

    return userData;
  } catch (error) {
    throw RequestError([400, error.message]);
  }
};
