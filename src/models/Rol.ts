import { model, Schema } from "mongoose";
const schema = new Schema({
  rol: {
    type: String,
    required: [true, "Eñ rol es obligatorio."],
  },
});

const Rol = model("role", schema);
export default Rol;
