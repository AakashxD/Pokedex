import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonList.css";
const POKEDEX_API_URL = "https://pokeapi.co/api/v2/pokemon";
const PokemonList = () => {

  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  async function fetchPokemons() {

    const response = await axios.get(POKEDEX_API_URL); // this download the list of pokemon

    const pokemonResults = response.data.results;

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
    fetchPokemons();
  }, []);
  return (
    <div className="pokemon-list-wrapper">

      <h1>List of pokemon</h1>
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
  );
};

export default PokemonList;
