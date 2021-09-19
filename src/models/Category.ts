import { model, Schema } from "mongoose";
import { models } from "./.d";

const schema = new Schema<models.Category>({
	name: { type: String, required: true, unique: true },
	state: { type: Boolean, default: true },
	createdBy: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
	editedBy: { type: Schema.Types.ObjectId, ref: "Usuario" },
});

schema.methods.toJSON = function () {
	const { __v, state, ...rest } = this.toObject();
	return rest;
};

export default model<models.Category>("Category", schema);
