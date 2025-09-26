# Hooks #
Antes de empezar recordemos que para poder crear rapidamente las funciones usaremos los "snipptes" de nuestra extension, escriviremos rafce, para que nos escriva rapidamente una funcion flecha .

Los Hooks son elementos que nos ayudan a controlar los ciclos de vida de nuestros componentes

## useState ##
Vamos a crear una pequeña aplicacion con un  titulo <h2> que contiene una variable {number}, y crearemos un boton que al pulsar sume un numero al anterior.

~~~
const Counter = () => {
  let number = 0;

  const sumar = () => {
    number += 1;
    console.log(number);
  };

  return (
    <div>
      <h2>{number}</h2>
      <button onClick={sumar}>Sumar</button>
    </div>
  );
};
~~~

Si pulsamos vemos que no suma, pero si vamos a la consola vemos que si que suma. No se actualiza en la pantalla. Necesitamos los estados. Con los estados hacemos que se actualize. Los estados al cambiar de valor fuerza al componente a actualizarse, a volver a renderizarse.

Para crear un estado se importa "useState". I se hace una destructuracion, de useState. Siempre llevara una variable y una funcion.

~~~
import { useState } from 'react';

const Counter = () => {
  const [variable,funcion] = useState(0);
}
~~~

Dentro de useState(), se coloca el valor inicial de la variable

Nuestro ejemplo quedaria de la siguiente manera:

~~~
const Counter = () => {
  const [number,setNumber] = useState(0);

  const sumar = () => {
   setNumber(15);
  };

  return (
    <div>
      <h2>{number}</h2>
      <button onClick={sumar}>Sumar</button>
    </div>
  );
};
~~~

Se sule formar el nombre de la funcion colocando setNombreVariable.
Como esta puesto al pulsar, el 0 pasara a 15

Finalmente si queremos que sume:
~~~
 const sumar = () => {
   setNumber(number + 1);
  };
~~~

Finalmente se actualizar en el Dom.

Agregando boton restar:
~~~
 const sumar = () => {
    setNumber(number + 1);
  };

  const restar = () => {
    setNumber(number - 1);
  };

  return (
    <div>
      <button onClick={restar}>REstar</button>
      <h2>{number}</h2>
      <button onClick={sumar}>Sumar</button>
    </div>
  );
~~~

Creamos otro componente para mostrar/oculatar un texto mediante useState.
Tambien utlizamos unas llaves para poder colcar javaScript y asi poder colocar condicionales. Coloco dos maneras de hacerlo aunque la segunda no hay plan B

~~~
return (
    <div>
      <button onClick={handleShow}>{show === true ? "Mostrar":"Ocultar"}</button>
      {show === true ? <h2>Hola Mundo</h2>:null} // tambien al ser booleano { show ?}
      
      {/* {show && <h2>Hola Mundo</h2>} */}
    </div>
  );
~~~
Hay que decir que cuando desaparece un componente a causa de la programacion en React, el componente verdaderamente desaparece del Html de la pagina, no se oculta como si hicieramos algo en Css.
##  useEffect ##

Primero vamos  hacer que nuestro TextH2 se actualize mediante estados. Colocamos un div y dentro colocamos un input con un h2, queremos que lo que escrivamos en el input se coloque en el h2.
~~~
import { useState } from "react";

const TextH2 = () => {

  const [text,setText]= useState("");

  const handleText=(e)=>{ //es el evento
    console.log(e.target.value);//salida en consola de lo que escribimos
    setText(e.target.value);
  }

  return (
    <div>
      <input type="text" onChange={handleText}/>
       <p>{text}</p>
    </div>
   
  )
}

export default TextH2
~~~

Para que no nos estorve vamos a App.jsx y quitamos el componente counter, tambien en Text.jsx colocamos el valor por defecto del useState=false. Tambien en main.jsx, comentamos el componente Stritmode para que en consola no se duplique lo que mostramos con el console.log.

Podemos comprobar como se monta y desmontan componentes al pulsar el boton ocultar/mostrar. Cada componente en React tienen un ciclo de vida el cual consta de las siguientes etapas:

  - montaje
  - actualizacion
  - desmontaje

Con useEffect, podemos controlar estos estados.

Primero lo tenemos que importar, despues se le tienen que colocar dos parametros:
- una funcion flecha.
- un array

Si no usamos un array como segundo parametro, el useEffect queda inutilizado.
Pero si colocamos un array vacio,[]. Solo se ejecutara al montar el componente. Si queremos hacer algo cuando se desmonte
, tenemos que colcar un return que devuelva una funcion flecha y se ejecutara cuando el componente se desmonte.

Si colocamos dentro del array por ejemplo una variable, cada vez que cambie esa variable, tambien se ejecutara lo que hay dentro del useEffect. En nuestro caso se ejecutaran tanto el primer conoselog como el segundo.
~~~
 useEffect(()=>{

    console.log("Componente montado");//se ejecuta una sola vez al montar el componente

    return()=>{
      console.log("Componente desmontado");//se ejecuta al desmontar el componente
    }
  },[text])//se ejecutara todo lo anterior cada vez que cambie la variable "text"
~~~

### StrictMode ###
Este componente es el que hemos anulado dentro de main.jsx, para que no se dupliquen los mensajes en consola.
Se duplican porque React hace una prueba montando,desmontando y volvieno a montar los componentes para comprobar que no existe un error que provoque un loop infinito, esto cuando se lleve a produccion no se colocara.

