import { model, Schema } from "mongoose";
import { iRole } from "./.d";

const schema = new Schema({
	rol: { type: String, required: [true] },
});

const Role = model<iRole>("Role", schema);
export default Role;
