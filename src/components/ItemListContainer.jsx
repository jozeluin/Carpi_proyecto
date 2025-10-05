import { pedirDatos } from "../helpers/pedirDatos";
import { use, useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [titulo, setTitulo] = useState("Productos");
  const categoria=useParams().categoria;
  
 

  useEffect(() => {
    pedirDatos().then((res) => {
      if(categoria){
        setProductos(res.filter(producto=>producto.categoria===categoria));
        setTitulo(categoria);
      } else {
        setProductos(res);
        setTitulo("Productos");
      } 

      
    });
  }, [categoria]);

  return (<div><ItemList productos={productos} titulo={titulo}/></div>) 
};

export default ItemListContainer;
