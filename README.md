# Promesas y .map() #
En el "ItemListContaner.jsx", utilizamos una promesa , "pedirProductos", si resuelve es decir en este si lee data.
Se llama con "pedirProductos", si resuelve:
~~~
 .then((res) => {
    productos = res;
    console.log(productos);
  });
~~~
Entonces, ".then()" devuelve la respuesta "res", que en este caso es data.

Vamos a intentar mostrar el titulo del primer registro de data, para ello primero en el return tenemos que colocar una condicion para que se muestro solo si realmente hay algun registro ya que al principio al hacer el useState productos esta como un array vacio.
Despues tenemos que colcoar un *useEffect*, para que la resolucion de la promesa se haga solo una vez cuando se monte el componente.

Ahora como vemos que sale, vamos a hacer que se muestre en un div toda la informacion del primer registro
~~~~
  return (
    <div>
      {productos.length > 0 && (
        <div>
          <img src={productos[0].image}alt={productos[0].title}width="200px" />
          <h2>{productos[0].title}</h2>
          <p>Precio: ${productos[0].price}</p>
          <p>{productos[0].description}</p>
        </div>
      )}
    </div>
  );
~~~~

## .map() ##

Ahora vamos a mostrar mas de un registro. Vamos a utilizar .map():
~~~~
 <div>
      {productos.length > 0 &&
        productos.map((producto) => {
          return (
            <div>
              <img src={producto.image} alt={producto.title} width="200px" />
              <h2>{producto.title}</h2>
              <p>Precio: ${producto.price}</p>
              <p>{producto.description}</p>
            </div>
          );
        })}
    </div>
~~~~

En consola nos dara un error, que cada hijo tiene que tener una unica "key".

Bueno vamos a modularizar mejor el codigo
Primero vamos a llevar a un archivo la funcion "pedirProductos", y tambien creamos un componenete ItemList que contiene el resultatado Html.

Hemos querido seguir modulerizando y hemos creado un comoponente de item que contiene el resultado final , dejando la logica del .map en "ItemList.jsx "
