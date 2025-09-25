# JSX #
Para poder utilizar variables JSX en nuestro codigo cuando estamos en html, tenemos que utilizar las llaves


~~~
const nombre="Carpi";
return (

    <div className= "App">
        <h1>{nombre}</h1>
    </div>
)
~~~

tambien valdria esto:

~~~
const nombre=<h1>Carpi</h1>;
return (

    <div className= "App">
        {nombre}
    </div>
)
~~~
Esto tambien es correcto
~~~
  const nombre = <h1>Carpi2</h1>;
  const edad=<p>27</p>
  const email=<p>hola@carpicoder.com</p>;
  const usuario=<div>{nombre}{edad}{email}</div>

 

  return (
    <>
     <div className='App'>
      {usuario}
      {usuario}
      {usuario}

      </div>
    </>
  )
~~~

## Funcion Java Script normal
~~~
const MostrarNombre =()=>
{
  return  "Carpi";
}
~~~

## Funcion Java Script que retorna un componente
Los componentes en React han de empezar por mayuscula
~~~

const MostrarNombreComponentes=()=>
{
  return <h1>Carpi</h1>;
}
~~~

Para poder utilizarlo lo haremos como si fuera un componente Html
~~~
 <MostrarNombreComponentes/> 
 o
<MostrarNombreComponentes></MostrarNombreComponentes> 
~~~

# Componentes y props #

## Componentes ##

Creamos una nueva carpeta llamada "components" alli, creamos un nuevo archivo llamado "Usuario", alli colocaremos el codigo de la funcion usuario. Alli le colocamos la palabra "export" delante de const para poder exportalo.
I para importarlo en App.jsx, colocamos la siguiente instruccion al principio.
Asi creamos y utilizamos los componentes. HAy que recordar que en un componente solo puede retornar un   \<div>

~~~
import { Usuario } from "./components/Usuario";
~~~

## Props ##

Siempre pasamos propiedades desde los llamamos, de padre a hijo. Colocamos dentro del parentesis del componente o hijo la palabra "props", o cualquier otra palabra.

Donde se llama se colocan las props:
~~~
function App() {
  return (
    <div>
      <Usuario nombre="Carpi" edad="27" nacionalidad="Argentina"/>
     
    </div>
  );
}
~~~

En edad estamos colocando el numero como si fuera un string, si quisieramos pasarlo como numero usuariamos {}, si quisiera pasar un objeto de javaScript
deberia pasarlo asi {{}}, si fuera un array {[]}.

Colocamos props en el padre y si la llamamos en el hijo, si le damos a inspeccionar en la web, veremos que se muestran.

Padre
~~~
function App() {
  return (
    <div>
      <Usuario nombre="Carpi" edad={34} nacionalidad="Argentina"/>
     
    </div>
  );
}
~~~
hijo
~~~
export const Usuario = (props) => {
console.log(props);

  return (
    <div>
      <h1>Nombre: Carpi</h1>
      <p>Edad: 28</p>
      <p>Nacionalidad: Argentino</p>
    </div>
  );
};
~~~
Si colocaramos solo una prop en el hijo, recibiriamos solo una. Y si no colocaramos ninguna, en la conola recibiriamos un objeto vacio.

En cambio si colocamos esto:
~~~
console.log(props.nombre);
~~~

En consola apareceran los nombres, solo.

Ahora si queremos llamar en los campos a las props. Las tenemos que colcar dentro de llaves:
~~~
<div>
      <h1>Nombre: {props.nombre}</h1>
      <p>Edad: {props.edad}</p>
      <p>Nacionalidad: {props.nacionalidad}</p>
    </div>
~~~

## Como destructurara un objeto ##

~~~
const {nombre, edad, nacionalidad} = props; // Destructuracion de objetos
  console.log(nombre);
~~~

Son las props pero las colocamos en unas variables con su nombre. 
Asi podriamos realizar lo mismo que antes de la siguiente manera.

~~~
 return (
    <div>
      <h1>Nombre: {nombre}</h1>
      <p>Edad: {edad}</p>
      <p>Nacionalidad: {nacionalidad}</p>
      <hr/>
    </div>
 )
~~~

Aun existe otra manera y es destructurarlo directamene en el parentesis inicial del comopoente:

~~~
export const Usuario = ({nombre, edad, nacionalidad}) => {
  
  return (
    <div>
      <h1>Nombre: {nombre}</h1>
      <p>Edad: {edad}</p>
      <p>Nacionalidad: {nacionalidad}</p>
      <hr/>
    </div>
  );
};
~~~

### Utilizando Css ###
Para utilizar el archivo App.css, se tiene que importar dentro de nuestro App.jsx. 

Asi para poder cambiar nuestro fondo de Card colocariamos en App.css.
(Ya que tiene su className a "card")

~~~
.card{
  background-color: blue;
}
~~~

Aunque tambien suele hacer de otra manera. Se crea una carpeta para cada componente y alli se crea un archivo personalizado para ese componente.

Tambien se podria crear otra carpeta donde se guardaran todos los archivos .css. o sass o cualquier otro tipo de archivo de estilo

