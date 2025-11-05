import "./PokemonDetails.css";
import axios from "axios";
import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";

const PokemonDetails = () => {
  const [pokemonDetails,setPokemonDetails]=useState(null);
  const {id}=useParams();

  useEffect(() => {
    (async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const d = res.data;
      setPokemonDetails({
        name: d.name,
        image: d.sprites.other.dream_world.front_default || d.sprites.front_default,
        types: d.types.map(t => t.type.name),
        weight: d.weight,
        height: d.height,
        id: d.id,
      });
    })();
  }, [id]);

  const toFeetIn = (h) => { // h is decimeters; convert to feet"
    const inches = Math.round(h * 3.937);
    const ft = Math.floor(inches/12);
    const inch = inches % 12;
    return `${ft}' ${inch}"`;
  };

  if (!pokemonDetails) return <p className="loading">Loading Pokédex…</p>;

  return (
    <div className="poke-page">
      <header className="poke-header">
        <h1 className="poke-name">{pokemonDetails.name}</h1>
        <span className="poke-id">#{String(pokemonDetails.id).padStart(4,"0")}</span>
      </header>

      <section className="poke-grid">
        {/* Left: artwork */}
        <div className="poke-art">
          <img src={pokemonDetails.image} alt={pokemonDetails.name}/>
        </div>

        {/* Right: info */}
        <div className="poke-info">
          <div className="poke-desc">
            The more sunlight {pokemonDetails.name} bathes in, the more strength wells up within it.
          </div>

          <div className="spec-card">
            <div className="spec-grid">
              <div>
                <div className="spec-label">Height</div>
                <div className="spec-value">{toFeetIn(pokemonDetails.height)}</div>
              </div>
              <div>
                <div className="spec-label">Weight</div>
                <div className="spec-value">{(pokemonDetails.weight/4.536).toFixed(1)} lbs</div>
              </div>
              <div style={{gridColumn:"1 / -1"}}>
                <div className="spec-label">Type</div>
                <div className="type-row">
                  {pokemonDetails.types.map(t => (
                    <span key={t} className={`badge ${t}`}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PokemonDetails;
