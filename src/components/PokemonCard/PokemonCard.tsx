import { Link } from 'react-router-dom'
import React from 'react'
import { type ListPokemon } from '../../interfaces/pokemon.interface'
import styles from "./PokemonCard.module.scss"
import usePokemon from '../../hooks/usePokemon'
interface PokemonCardProps {
  pokemonForCard: ListPokemon
}

const PokemonCard = ({ pokemonForCard }: PokemonCardProps): JSX.Element => {
  const pokemonName: string|undefined = pokemonForCard.name;
  const {pokemon} = usePokemon({pokemonName});

  return (

    <>
    <Link to={`pokemon/${pokemonForCard.name}`} style={{textDecoration:'none' , color:'black'}}>
      <div className={styles.maincontainer}>
        <div className={styles.theCard}>
          <div className={styles.theFront}>
            <img src={pokemonForCard.image}/>
            <span># {pokemonForCard.pokedexNumber}</span>
            <span>{pokemonForCard.name}</span>
          </div>
          <div className={styles.theBack}>
            <span>{pokemon?.name.toUpperCase()}</span>
            <span>Height: {pokemon?.height}</span>
            <span>Weight: {pokemon?.weight}</span>
            <span>Base experience: {pokemon?.base_experience}</span>
          </div>
        </div>
      </div>
      </Link>
    </>
  )
}

export default PokemonCard
