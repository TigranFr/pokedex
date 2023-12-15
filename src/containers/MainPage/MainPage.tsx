import React, { useEffect } from 'react'
import { getAllPokemons } from '../../data/AsyncThunks'
import { useAppDispatch, useAppSelector } from '../../hooks'
import PokemonPage from '../PokemonPage/PokemonPage'

const MainPage = (): JSX.Element => {
  const pokemons = useAppSelector(state => state.allPokemons);
  const dispatch = useAppDispatch()

  useEffect(() => {
    void dispatch(getAllPokemons())
  }, [dispatch])


  return (
    <div>
      {pokemons.isLoading ? (
        <div>Loading...</div>
      ) : (
        pokemons.pokemons.map((pokemon) => (
          <PokemonPage key={pokemon.name} pokemon={pokemon} />
        ))
      )}

    </div>
  )
}

export default MainPage
