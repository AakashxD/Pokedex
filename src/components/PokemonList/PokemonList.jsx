import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonList.css";

const PokemonList = () => {
  const [pokedexApiUrl,setPokedexApiUrl ]= useState("https://pokeapi.co/api/v2/pokemon");

  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextUrl,setNextUrl]= useState(null);
  const [prevUrl,setPrevUrl]= useState(null);


  async function fetchPokemons() {
   setIsLoading(true);
      // this download the list of pokemon
    const response = await axios.get(pokedexApiUrl);
  

    const pokemonResults = response.data.results;
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    // iterating over the array of pokemon using map, to create an array of promises 
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
   // waiting for all the promises to resolve. axios.all can be uses here as well
    const pokemonData = await Promise.all(pokemonResultPromise);
   // mapping over the resolved promises to extract relevant data
    const res = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        name: pokemon.name,
        image:
          pokemon.sprites.other.dream_world.front_default ||
          pokemon.sprites.front_default,
        types: pokemon.types,
        id: pokemon.id,
      };
    });
    setPokemons(res);
    setIsLoading(false);
  }

  useEffect(() => {
    console.log("Fetching pokemons from:", pokedexApiUrl);
    fetchPokemons();
  }, [pokedexApiUrl]);
  return (
    <div className="pokemon-list-wrapper">

      <h1>List of pokemon</h1>
      <div className="pokemon-cards">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        pokemons.map((pokemon) => (
          <PokemonCard 
            key={pokemon.id}
            name={pokemon.name}
            url={pokemon.image}
          />
        ))
      )}
      </div>
      <div className="pagination-button">
        <button className="button-prev" 
        disabled={prevUrl==null}onClick={()=>setPokedexApiUrl(prevUrl)}>prev</button>
        <button className="button-next"
        disabled={nextUrl==null} onClick={()=>setPokedexApiUrl(nextUrl)}>next</button>
      </div>
    </div>
  );
};

export default PokemonList;
