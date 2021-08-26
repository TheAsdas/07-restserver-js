import mongoose from "mongoose";
import ES from "../lang/es";

const { CON_SUCC, CON_FAIL } = ES.DB;

export const connectToDb = async () => {
  try {
    const uri = process.env.MONGO;
    if (uri) await mongoose.connect(uri, {});
    console.log(CON_SUCC);
  } catch (error) {
    console.log(error);
    throw new Error(CON_FAIL);
  }
};
