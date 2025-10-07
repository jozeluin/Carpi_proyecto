import React, { useState } from "react";

const Contacto = () => {
   

    const[valores, setValores] = useState({ 
        nombre:"",
        email:""
    });

    const handlValores = (e) => {
        console.log(e.target.value)
    }



  const handleSubmit = (e) => {
    e.preventDefault(); //prevenimos que se recargue la pagina
    console.log("Enviado",valores);
  };
  
  return (
    <div className="container">
      <h1 className="main-title">Contacto</h1>
      <form className="formulario" onSubmit={handleSubmit}>

        <input
         type="text"
        placeholder="Ingresa tu nombre" 
        value={valores.nombre}
        onChange={handlValores}
        />

        <input 
        type="email" 
        placeholder="Ingresa tu email"
        value={valores.email}
        onChange={handlValores}
        />

        <button className="enviar" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
