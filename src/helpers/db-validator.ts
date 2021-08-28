import Rol from "../models/Rol";
import Usuario from "../models/Usuario";

export const validateRole = async (rol: string) => {
  if (!(await Rol.exists({ rol })))
    throw new Error(`El rol ${rol} no es un rol válido.`);
};

export const userIsUnique = async (correo: string) => {
  if (await Usuario.exists({ correo }))
    throw new Error(
      `El correo ${correo} ya está registrado en la base de datos.`
    );
};

export const userIdIsValid = async (id: string) => {
  if (!(await Usuario.exists({ _id: id })))
    throw new Error(`El usuario con ID ${id} no existe.`);
};