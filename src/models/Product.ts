import {model, Schema} from "mongoose";
import {models} from "./.d"


const schema = new Schema<models.Product>({
	createdBy: {type: Schema.Types.ObjectId, ref: "Usuario", required: true},
	category: {type: Schema.Types.ObjectId, ref: "Category", required: true},
	editedBy: {type: Schema.Types.ObjectId, ref: "Usuario"},
	name: {type: String, required: true, unique: true},
	available: {type: Boolean, default: true},
	state: {type: Boolean, default: true},
	description: {type: String},
	price: {type: Number},
}, {});

schema.methods.toJSON = function () {
	const {__v, state, ...data} = this.toObject();
	return data;
};

export default model<models.Product>("Product", schema);
