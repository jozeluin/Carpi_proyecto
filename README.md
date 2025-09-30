# Consumiendo Apis #
Primero iremos  a ver una web [pokeapi](https://pokeapi.co/). Donde alli nos explica como se le pide informacion a esa web.
Usaremos en nuestro programa el comando "fetch", que nos ayuda a trabajar con direcciones web.

Dentro de la web pokeapi, veremos cuales son sus endpoints para trabajar. 

~~~~
GET https://pokeapi.co/api/v2/pokemon/{id or name}/
~~~~
Aqui al coloclar una id o un nombre de pokemon, nos devolvera la informacion de ese pokemon.

~~~~
https://pokeapi.co/api/v2/pokemon?limit=50
~~~~
Aqui nos da una lista con la url de 50 pokemon

Ahora vamos a ver todo esto aplicado a nuestro proyecto.

Colocamos un fetch con la url, si lo colocamos dentro de un console.log, veremos desde la consola de la pag web que trabaja como una promesa.

~~~~
 console.log(fetch('https://pokeapi.co/api/v2/pokemon/1'));
~~~~

Para capturar ese resultado lo tenemos que tratar como una promesa con .then.

~~~~
  fetch("https://pokeapi.co/api/v2/pokemon/1")
  .then((resp) => {
    console.log(resp);
  });
~~~~
Nos da un objeto que nos devuelve cosas pero no lo que estamos buscando

Si nosotros intentamos consologear esto mismo pero con .json, no da algo parecido ya que sigue esperando que resolvamos una promesa.
Por eso tenemos que colocar otro .then para poder tratar la informacion.

~~~~
fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Esto es data", data);
    });

~~~~

Nos daba un fallo por que en el primer then teniamos que colocar un return, por que llevaba llaver 
"{}", si quitamos las llaves en una funcion flecha y dejamos los parentesis devolvemos directamente lo del otro lado de la flecha.

Vamos a intentar mostrar el nombre del pokemon bajado de la pag web por pantalla.

~~~~
  const [pokemon, setPokemon] = useState();

  fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then((resp) => resp.json())
    .then((data) => {
      setPokemon(data);
    });

  return <div>{pokemon.name}</div>;

~~~~

Creamos un estado que se actualiza cuando consigue la "data", pero nos va a tirar un error ya que es tan rapido el programa que no da tiempo a bajar de internet la informacion. El fetch es una operacion asincrona y demora un tiempo.

~~~~
return <div>{pokemon && pokemon.name}</div>;
~~~~
Podriamos hacer esto, pero aunque consiguiriamos el nombre, la consola nos daria muchos errores, por que se genera un ciclo infinito.

Si colocamos un log despues del useState lo podemos comprobar

~~~~
  const [pokemon, setPokemon] = useState();
  console.log(pokemon);

  fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then((resp) => resp.json())
    .then((data) => {
      setPokemon(data);
    });
~~~~

Cada vez que setPokemon(data) se ejecuta cambia el valor de pokemon, y cada vez que cambia todo se vuelve a ejecutar y se vuelve a actualizar.

Para hacer que se ejecute una vez cuando el compoenente se monta utilizamos el useEffect.
~~~~
 useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/1")
      .then((resp) => resp.json())
      .then((data) => {
        setPokemon(data);
      });
  }, []);
~~~~

Ahora vamos a mostrar mas informacion:

~~~~
 <div>
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      )}
    </div>
~~~~

Ahora vamos a colocar 2 botones, "Anterior", "Siguitente". Con ellos iremos pasando de pokemon en pokemon:
~~~~
 const [id, setId] = useState(1);

  const handleSiguiente = () => {
      setId(id + 1);
    }

  const handleAnterior = () => {
      setId(id - 1);
    }
.
.
.
        <button onClick={handleAnterior}>Anterior</button>
        <button onClick={handleSiguiente}>Siguiente</button>

~~~~

Pero aunque colocamos un console.log vemos en consola que el id cambia pero no se cambia el pokemon. Ese error es por el UseEffect, ya que se ejecuta solo una vez. Hay que decirle que sea sensible a los cambios, entonces le vamos a decir que se ha sensible a los cambios de "id", para que se vuelva a ejecutar todo lo que tiene dentro (del useEffect) cada vez que cambia este "id".

~~~~
 useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) //Para que lea ${id}, se han de colocar las comillas invertidas ``.
      .then((resp) => resp.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [id]);
~~~~

Despues hacemos una modificacion para que cuando el numero llegue a 1, el boton de Anterio quede deshabilitado

~~~~
 {id > 1 ? (
            <button onClick={handleAnterior}>Anterior</button>
          ) : (
            <button disabled>Anterior</button>
          )}
~~~~

## PokemonList ##
Vamos a crear un nuevo componente llamado PokemonList.jsx, utilizaremos un "fetch" de la web pokeApi que nos genera 20 nombres de pokemon : [fecth utilizado](https://pokeapi.co/api/v2/pokemon?limit=20&offset=0)

Si vemos en la consola al pulsar en consola para que se desplegue la salida. Vemos que nos da una url donde podemos ver los siguientes 20 porque tiene un comando de offset donde coloca 20.

Aunque con la primera url tambien contiene offset y sale. Con la segunda no me sale.

Bueno hemos tenido problemas para implementar el codigo del amigo "Carpi". A la hora de renderizar el hacia una comprobacion para saber si teniamos ya cargado el array que viene de la api con el fetch, el lo hacia asi:

~~~~
currentList && ...y lo que sea
~~~~

Pues bien , a mi esto no me funciona, ah de ser asi

~~~~
currentList.length !== 0 &&
~~~~

A partir que lo he hecho asi a salido. Despues hay varias opciones, o enseñar un nombre o con el .map recorrer el array en su totalidad:

~~~~
 <div>
    <h2>Pokemon List</h2>
    <ul>
      {currentList.length !== 0 &&
        currentList.results.map((pokemon, index) => ( //index viene del map, aprovechamos como key
          <li key={index}>{pokemon.name}</li>
        ))}
    </ul>
  </div>
~~~~

Ahora que hemos cargado esos 5, vamos a poner unos botones para poder cargar los 5 siguiente o ver los 5 anteriores.
Tambien tenemos que pensar que tenemos que cambiar el endpoint de la url, lo que es el limite y el offset. El limite es la cantidad que se pide, el offset es por donde se empieza.
Tenemos que cambiar la url de forma dinamica. Nos vamos a poyar en unas de las informaciones que nos devuelve .resul, ademas de devolvernos el array tenemos "next" y "previus". Alli tenemos las url que con el limite que hayamos colocado, en nuestro caso es 5, nos devuelve la url con los 5 siguiente o los 5 anteriores.
Creamos una serie de estados, next, previus y url. Asi iremos cambiando segun pulsemos handleSiguiente o handleAnterior, los valores de la url, next y previus:

~~~~
function PokemonList() {
  const [currentList, setCurrentList] = useState([]);
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
  );
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  const handleSiguiente = () => {
    setUrl(next);
  };
  const handleAnterior = () => {
    previous && setUrl(previous);
  }

  console.log("Esto es el currentList", currentList);

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCurrentList(data);
        setNext(data.next);
        setPrevious(data.previous);
      });
  }, [url]);//cada vez que cambie useEffect se volvera a actualizar

  if (currentList.length !== 0) {
    console.log("currentList entero", currentList.results[0].name);
  }

  return (
    <div>
      <h2>Pokemon List</h2>
      <ul>
        {currentList.length !== 0 &&
          currentList.results.map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
      </ul>
      <button onClick={handleAnterior}>Anterior</button>
      <button onClick={handleSiguiente}>Siguiente</button>
    </div>
  );
}
~~~~