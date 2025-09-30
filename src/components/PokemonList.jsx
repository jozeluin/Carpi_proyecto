import React, { useEffect, useState } from "react";

const PokemonList = () => {
  const [currentList, setCurrentList] = useState({});
 
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0")
      .then((resp) => resp.json())
      .then((data) => {setCurrentList(data)});
      
  }, []);
console.log(currentList);
  return(
    <div>
        {
            currentList && 
            <div>
                {currentList.results[1].name}
            </div>

        }
        </div>
  ) 
};

export default PokemonList;
