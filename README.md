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