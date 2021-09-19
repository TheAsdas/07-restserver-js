import {model, Schema} from "mongoose";
import {models} from "./.d";

const schema = new Schema<models.User>({
	nombre: {type: String, required: true},
	correo: {type: String, required: true, unique: true},
	clave: {type: String, required: true},
	img: {type: String},
	rol: {type: String, required: true},
	estado: {type: Boolean, default: true},
	google: {type: Boolean, default: false},

});

schema.methods.toJSON = function () {
	const {__v, clave, _id, ...user} = this.toObject();
	user.uid = _id;
	return user;
};

export default model<models.User>("Usuario", schema);
