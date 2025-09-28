import { useEffect, useState } from "react";
import pedirProductos from "./pedirProductos";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  // console.log(data);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    /**
     * Llamada a la promesa
     */
    pedirProductos().then((res) => {
      setProductos(res);
    });
  }, []);

  return (
    <div>
     <ItemList productos={productos}/>
    </div>
  );
};

export default ItemListContainer;
