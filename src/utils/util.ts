type KeyVal = { [key: string]: any };

/**
 * # Ice Ice Baby
 * Congela de forma recursiva todos los objetos dentro de un objeto, además del objeto entregado.
 * @param obj Objeto a congelar.
 */
export const fullFreeze = (obj: KeyVal) => {
  Object.keys(obj).forEach((key) => {
    const current = obj[key];
    const objects = hasAnyObjects(current);

    if (objects) objects.forEach((obj) => fullFreeze(obj));
  });

  Object.freeze(obj);
};

/**
 * # ¿Objeto tiene objetos?
 * Chequea si un objeto contiene más objetos dentro.
 * @param obj Objeto a revisar.
 * @returns `false`, si el objeto solo contiene entradas simples.
 * @returns `KeyVal[]`, Si el objeto contiene uno o más objetos, retorna un arreglo con estos objetos.
 */
const hasAnyObjects = (obj: KeyVal): false | KeyVal[] => {
  const foundObjects: KeyVal[] = [];

  Object.keys(obj).forEach((key) => {
    const current = obj[key];
    typeof current === "object" && foundObjects.push(current);
  });

  return foundObjects.length === 0 ? false : foundObjects;
};
