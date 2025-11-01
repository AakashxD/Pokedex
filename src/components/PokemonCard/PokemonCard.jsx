import React from 'react'
import './PokemonCard.css'
const PokemonCard = ({name,url}) => {
  return (
    <div className='pokemon-card'>
        <h2>{name}</h2>
        <img  className="card-wrapper"src={url} alt="pokemon" />
    </div>
  )
}

export default PokemonCard