import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
      await mongoose.connect( process.env.);
  } catch (error) {
    console.log(error);
    throw new Error("No pudimos conectar con la base de datos.");
  }
};
