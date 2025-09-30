import React, { useEffect, useState } from "react";
import PokeImagen from "./PokeImagen";

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
  }, [url]);

  if (currentList.length !== 0) {
    console.log("currentList entero", currentList.results[0].name);
  }

  return (
    <div>
      <h2>Pokemon List</h2>
      <ul>
        {currentList.length !== 0 &&
          currentList.results.map((pokemon, index) => (
            <li key={index}>{pokemon.name}
            <br />
            <PokeImagen url={pokemon.url} />
            
           
            </li>
            
           
            
          ))}
        
      </ul>
      <button onClick={handleAnterior}>Anterior</button>
      <button onClick={handleSiguiente}>Siguiente</button>
    </div>
  );
}
export default PokemonList;
