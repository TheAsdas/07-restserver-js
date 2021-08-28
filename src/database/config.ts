import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const uri = process.env.MONGO;
    if (uri) await mongoose.connect(uri, {});
    console.log("Conexión exitosa con la base de datos.");
  } catch (error) {
    console.log(error);
    throw new Error("No pudimos conectarnos con la base de datos.");
  }
};
