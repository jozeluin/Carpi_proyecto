import data from "../data/data.json";

export const pedirDatos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // delay de 500ms
      resolve(data);
    }, 500);
  });
};

export const pedirItemPorId = (id) => {
  return new Promise((resolve, reject) => {

    const item = data.find((el) => el.id === id);
    
    if (item) {
      console.log("Se encontro el item, pedirItemPorId",item);
      resolve(item);
    } else {
      reject({
        error: "No se encontró el producto",
      });
    }
  });
};
