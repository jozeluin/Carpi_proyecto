import data from "../data/productos.json";

/**
 * Promesa que simula una consulta a una base de datos. Si resuelve devuelve los productos.
 * si rechaza podria devolver un mensaje de error.
 * @returns
 */
const pedirProductos = () => {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
};
export default pedirProductos;
