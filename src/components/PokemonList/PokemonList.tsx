import React from 'react'
import { type ListPokemon } from '../../interfaces/pokemon.interface'
import PokemonCard from '../PokemonCard/PokemonCard'
import styles from './PokemonList.module.scss'
interface PokemonListProps {
  pokemons: ListPokemon[]
}

const PokemonList = ({ pokemons }: PokemonListProps): JSX.Element => {
  return (
    <div
      className={styles.pokemonsList}
    >
      {pokemons.map((p) => (
        <PokemonCard pokemonForCard={p} key={p.name} />
      ))}
    </div>
  )
}

export default PokemonList
