import React from "react";
import Item from "./Item";

const ItemList = ({ productos }) => {
  console.log(productos);
  return (
    <div class="container">
      <h2 class="main-title">
        Productos
        <div className="productos">
            {productos.map((prod) => <Item producto={prod} key={prod.id} />)}
        </div>
      </h2>
    </div>
  );
};

export default ItemList;
