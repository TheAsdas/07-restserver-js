import { model, Schema } from "mongoose";
import { iRole } from "./.d";

const schema = new Schema<iRole>({
	rol: { type: String, required: true },
});

export default model<iRole>("Role", schema);
