import React from "react";

const Item = ({producto}) => {
  return (
    <div>
      <img src={producto.image} alt={producto.title} width="200px" />
      <h2>{producto.title}</h2>
      <p>Precio: ${producto.price}</p>
      <p>{producto.description}</p>
    </div>
  );
};

export default Item;
