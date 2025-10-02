import React from "react";
import Item from "./Item";

const ItemList = ({ productos }) => {
  
  return (
    <div className="container">
      <h2 className="main-title">
        Productos
        <div className="productos">
            {productos.map((prod) => <Item producto={prod} key={prod.id} />)}
        </div>
      </h2>
    </div>
  );
};

export default ItemList;
