import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(carritoInicial);

  const agregarAlCarrito = (item, cantidad) => {
    const itemAgregado = { ...item, cantidad };

    const nuevoCarrito = [...carrito];
    const estaEnCarrito = nuevoCarrito.find(
      (producto) => producto.id === itemAgregado.id
    );

    if (estaEnCarrito) {
      estaEnCarrito.cantidad += cantidad;
    } else {
      nuevoCarrito.push(itemAgregado);
    }
    setCarrito(nuevoCarrito);
    

  };

  const cantidadEnCarrito = () => {
    return carrito.reduce((acc, prod) => acc + prod.cantidad, 0); //reduce recorre el array y acumula. En este caso acumula la cantidad de productos en el carrito
  };

  const precioTotal = () => {
    let deposito = carrito.reduce(
      (acc, prod) => acc + prod.precio * prod.cantidad,
      0
    ); //acumula el precio total del carrito
    console.log("Estoy en App.deposito", deposito);
    return deposito;
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);    


  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cantidadEnCarrito,
        precioTotal,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
