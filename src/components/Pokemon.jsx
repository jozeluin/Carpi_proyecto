import React, { useEffect, useState } from "react";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState();
  const [id, setId] = useState(1);

  const handleSiguiente = () => {
    setId(id + 1);
  };

  const handleAnterior = () => {
    id > 1 && setId(id - 1);
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`) //Para que lea ${id}, se han de colocar las comillas invertidas ``.
      .then((resp) => resp.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [id]);
  console.log(id);

  return (
    <div>
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <p>{pokemon.id}</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <br />
          {id > 1 ? (
            <button onClick={handleAnterior}>Anterior</button>
          ) : (
            <button disabled>Anterior</button>
          )}

          <button onClick={handleSiguiente}>Siguiente</button>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
