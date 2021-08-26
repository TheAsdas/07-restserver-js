import { model, Schema } from "mongoose";

interface Usuario {
  nombre: string;
  correo: string;
  clave: string;
  img?: string;
  rol: boolean;
  estado: boolean;
  google: boolean;
}

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio."],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio."],
    unique: [true, "Este correo ya está registrado."],
  },
  clave: {
    type: String,
    required: [true, "La contraseña es obligatoria."],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN", "USER"],
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

export default model<Usuario>("Usuario", UsuarioSchema);
