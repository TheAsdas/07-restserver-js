import { model, Schema } from "mongoose";
import { iCategory } from "./.d";

const schema = new Schema({
	name: { type: String, required: true },
	state: { type: Boolean, default: true },
	createdBy: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
});

const Category = model<iCategory>("Category", schema);
export default Category;