import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../PokemonCard/PokemonCard";
import "./PokemonList.css";

const INITIAL_URL = "https://pokeapi.co/api/v2/pokemon";

const PokemonList = () => {
  const [state, setState] = useState({
    pokemons: [],
    isLoading: true,
    pokedexApiUrl: INITIAL_URL,
    nextUrl: null,
    prevUrl: null,
  });

  async function fetchPokemons() {
    
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await axios.get(state.pokedexApiUrl);

      const { next, previous, results } = res.data;

      // fetch details of each pokemon in parallel
      const detailPromises = results.map((p) => axios.get(p.url));
      const detailRes = await Promise.all(detailPromises);

      const pokemons = detailRes.map(({ data: pokemon }) => ({
        id: pokemon.id,
        name: pokemon.name,
        image:
          pokemon.sprites.other.dream_world.front_default ||
          pokemon.sprites.front_default,
        types: pokemon.types || [],
      }));

      setState((prev) => ({
        ...prev,
        pokemons,
        nextUrl: next,
        prevUrl: previous,
        isLoading: false,
      }));
    } catch (e) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      console.log("Error fetching pokemons", e);
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, [state.pokedexApiUrl]);

  return (
    <div className="pokemon-list-wrapper">
      <h1>List of Pokemon</h1>

      <div className="pokemon-cards">
        {state.isLoading ? (
          <h2>Loading...</h2>
        ) : (
          state.pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              url={pokemon.image}
              id={pokemon.id}
            />
          ))
        )}
      </div>

      <div className="pagination-button">
        <button className="button-prev"
          disabled={!state.prevUrl}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              pokedexApiUrl: prev.prevUrl,
            }))
          }
        >
          Prev
        </button>

        <button className="button-next"
          disabled={!state.nextUrl}
          onClick={() =>
            setState((prev) => ({
              ...prev,
              pokedexApiUrl: prev.nextUrl,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
