import React,{useEffect,useState} from 'react'
import axios from 'axios';
import PokemonCard from '../PokemonCard/PokemonCard'
import './PokemonList.css'
const api=import.meta.env.VITE_POKEMON_API_URL;
const PokemonList = () => {
  const [pokemons,setPokemons]=useState([]);
  const [isLoading,setIsLoading]=useState(true);

    async function fetchPokemons(){
        const data = await axios.get(api);
        setPokemons(data.data.results);
        setIsLoading(false);
        console.log(data.data.results);
    }
    useEffect(()=>{
        fetchPokemons();
    },[]);
  return (
    <div className='pokemon-list-wrapper'>
        <h1>List of pokemon</h1>
        { isLoading ? <h2>Loading...</h2> :
          pokemons.map((pokemon,index)=>{
            return <PokemonCard key={index} name={pokemon.name} url={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`} />
          })
        }
    
    </div>
  )
}

export default PokemonList