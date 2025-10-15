import React, { useEffect, useState } from "react";
// import { pedirItemPorId } from "../helpers/pedirDatos";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const id = useParams().id;
  console.log("ItemDetailContainer",id);

  useEffect(() => {
    // pedirItemPorId(Number(id))
    //   .then((res) => {
    //   setItem(res);
    // });
    const docRef = doc(db, "productos", id);
    getDoc(docRef).then((resp) => {
      setItem({ id: resp.id, ...resp.data() });
     });
    
  }, [id]);

  return <div>{item && <ItemDetail item={item} />}</div>;
};

export default ItemDetailContainer;
