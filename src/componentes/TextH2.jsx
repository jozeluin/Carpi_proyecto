import { useState, useEffect} from "react";

const TextH2 = () => {

  const [text,setText]= useState("");

  const handleText=(e)=>{ //es el evento
    console.log(e.target.value);//salida en consola de lo que escribimos
    setText(e.target.value);
  }

  useEffect(()=>{

    console.log("Componente montado");//se ejecuta una sola vez al montar el componente

    return()=>{
      console.log("Componente desmontado");//se ejecuta al desmontar el componente
    }
  },[]);//argumentos, una funcion flecha y un array vacio para que se ejecute una sola vez

  useEffect(()=>{
    console.log("El estado text ha cambiado:");
  },[text])

  return (
    <div>
      <input type="text" onChange={handleText}/>
       <p>{text}</p>
    </div>
   
  )
}

export default TextH2