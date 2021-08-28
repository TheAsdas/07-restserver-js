import { model, Schema } from "mongoose";

export interface iUsuario {
  nombre: string;
  correo: string;
  clave: string;
  img?: string;
  rol: "ADMIN" | "USER";
  estado: boolean;
  google: boolean;
}

const schema = new Schema<iUsuario>({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio."],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio."],
    unique: true,
  },
  clave: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    enum: ["ADMIN", "USER"],
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

export default model("Usuario", schema);
