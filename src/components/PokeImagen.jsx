import { useEffect, useState } from "react";

function PokeImagen (url) {
    console.log("Pokeimage,Esto es la url",url);
   let url1 = url.url;
   console.log("Pokeimage,Esto es url1",url1);

  const [pokemon, setPokemon] = useState();
  //const [id, setId] = useState(1);
//console.log("Esto es id en PokeImagen", id);
  useEffect(() => {
    fetch(url1) //Para que lea ${id}, se han de colocar las comillas invertidas ``.
      .then((resp) => resp.json())
      .then((data) => {
        setPokemon(data);
      });
  },[url1] );
 

  return (
    <div>
      {pokemon != null && (
        <div>
          
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          
        </div>
      )}
      hola
    </div>
  );
};

export default PokeImagen;
