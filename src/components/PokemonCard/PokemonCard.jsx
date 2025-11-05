import React from 'react'
import './PokemonCard.css'
import { Link } from 'react-router-dom'
const PokemonCard = ({name,url,id}) => {
  return (
    
    <Link to={`/pokemon/${id}`} style={{ textDecoration: "none" }}>  <div className='pokemon-card'>
        <h2 className='pokemon-name'>{name}</h2>
      <img  className="card-wrapper"src={url} alt="pokemon" />
    </div>
    </Link>
    
  )
}

export default PokemonCard