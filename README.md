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