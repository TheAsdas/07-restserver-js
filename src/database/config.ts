import mongoose from "mongoose";

export const conectarDb = async () => {
  try {
    const uri = process.env.MONGO_CONNECTION;

    if (uri) {
      await mongoose.connect(uri, {} as any, () => {});
      console.log("Conexión a la base de datos exitosa.");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Fue imposible conectarse a la base de datos.");
  }
};
