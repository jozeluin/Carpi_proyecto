import React from "react";
import Item from "./Item";
import { toCapital } from "../helpers/toCapital";

const ItemList = ({ productos, titulo }) => {
  
  return (
    <div className="container">
      <h2 className="main-title">
        {toCapital(titulo)}
        <div className="productos">
            {productos.map((prod) => <Item producto={prod} key={prod.id} />)}
        </div>
      </h2>
    </div>
  );
};

export default ItemList;
