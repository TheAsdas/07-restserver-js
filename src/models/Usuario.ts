import { model, Schema } from "mongoose";
import { iUser } from "./.d";

const schema = new Schema<iUser>({
	nombre: { type: String, required: true },
	correo: { type: String, required: true, unique: true },
	clave: { type: String, required: true },
	img: { type: String },
	rol: { type: String, required: true },
	estado: { type: Boolean, default: true },
	google: { type: Boolean, default: false },
});

schema.methods.toJSON = function () {
	const { __v, clave, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

export default model<iUser>("Usuario", schema);
