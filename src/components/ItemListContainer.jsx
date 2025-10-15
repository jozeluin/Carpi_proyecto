import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("Productos");
  const categoria = useParams().categoria;

  useEffect(() => {
    const productosRef = collection(db, "productos"); //db es la base de datos, y "productos" es la coleccion que queremos
    const q = categoria
      ? query(productosRef, where("categoria", "==", categoria)) //filtra los productos por categoria
      : productosRef;//si no hay categoria, trae todos los productos

    getDocs(q).then((resp) => {
      //es una promesa

      setProductos(
        resp.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }; //id es el id del documento y data es el contenido del documento
        })
      );
    });
  }, [categoria]);

  return (
    <div>
      <ItemList productos={productos} titulo={titulo} />
    </div>
  );
};

export default ItemListContainer;
