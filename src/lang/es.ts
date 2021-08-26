import { fullFreeze } from "../utils/util";
const ES = {
  DB: {
    CON_FAIL: "No pudimos conectar con la base de datos.",
    CON_SUCC: "La conexión con la base de datos fue exitosa.",
  },
  LISTENING_ON: "Escuchando en el puerto",
};

fullFreeze(ES);

export default ES;
