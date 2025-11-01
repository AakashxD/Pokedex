import React from 'react'
import './Pokedex.css'
import Search from '../Search/Search'
import PokemonList from '../PokemonList/PokemonList'
import './Pokedex.css'
const Pokedex = () => {
  return (
   <>
   <div className='pokedex-wrapper'>
    <div>
    <h1>P o k e d e x</h1>
    </div>
   <Search/>
    <PokemonList/>
   </div>
   </>
  )
}

export default Pokedex