import { model, Schema } from "mongoose";
import {models} from "./.d";

const schema = new Schema<models.Role>({
	rol: { type: String, required: true },
});

export default model<models.Role>("Role", schema);
