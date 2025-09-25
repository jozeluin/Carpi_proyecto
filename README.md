# Hooks #
Antes de empezar recordemos que para poder crear rapidamente las funciones usaremos los "snipptes" de nuestra extension, escriviremos rafce, para que nos escriva rapidamente una funcion flecha .

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