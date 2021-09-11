import { Model } from "mongoose";

export type EntryExistsData = {
	model: Model<any>;
	filterBy?: string;
	filter?: { [key: string]: any };
};
