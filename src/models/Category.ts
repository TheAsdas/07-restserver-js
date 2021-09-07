import { model, Schema } from "mongoose";
import { iCategory } from "./.d";

const schema = new Schema<iCategory>({
	name: { type: String, required: true, unique: true },
	state: { type: Boolean, default: true },
	createdBy: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
});

schema.methods.toJSON = function () {
	const { __v, _id, ...rest } = this.toObject();
	rest.id = _id;
	return rest;
};

const Category = model<iCategory>("Category", schema);

export default Category;
