import React, { useState } from 'react'
import PokemonList from '../components/PokemonList/PokemonList'
import usePokemons from '../hooks/usePokemons'
import Pagination from '../components/Pagination'
import Navbar from './Navbar/Navbar'
import { type ListPokemon, type IType } from '../interfaces/pokemon.interface'

const Home = (): JSX.Element => {
  const [pokemonPerPage, setPokemonPerPage] = useState<number>(10)
  const [filteredPokemon, setFilteredPokemn] = useState<ListPokemon[] | null>(
    null
  )

  const {
    pokemons,
    goToPage,
    currentPage,
    totalPages,
    selectedType,
    setSelectedType,
    setPokemons,
    fetchPokemons,
    fetchPokemonsByType,
  } = usePokemons(pokemonPerPage)

  const handleSelectChange = (pokemonPerPage: number): void => {
    setPokemonPerPage(pokemonPerPage)
  }

  const handleTypeChange = (pokemonByType: IType | null): void => {
    if (pokemonByType != null) {
      setSelectedType(pokemonByType)
    } else {
      setPokemons([])
      setSelectedType(null)
    }
  }

  const handleChange = (pName: string): void => {
    if (pName !== '') {
      const pokemon = pokemons.filter((pokemon) => {
        return pokemon.name === pName
      })
      setFilteredPokemn(pokemon)
    } else {
      setFilteredPokemn(null)
      if (selectedType !== null) {
        void fetchPokemonsByType()
      } else {
        void fetchPokemons(pokemonPerPage)
      }
    }
  }

  const sortfromAtoZ = (): void => {
    const n = pokemons.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (pokemons[j].name > pokemons[j + 1].name) {
          const temp = pokemons[j];
          pokemons[j] = pokemons[j + 1];
          pokemons[j + 1] = temp;
        }
      }
    }
    setPokemons([...pokemons]);  
  };
  
  const sortfromZtoA = (): void => {
    const n = pokemons.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (pokemons[j].name < pokemons[j + 1].name) {
          const temp = pokemons[j];
          pokemons[j] = pokemons[j + 1];
          pokemons[j + 1] = temp;
        }
      }
    }
    setPokemons([...pokemons]);
  };
  

  return (
    <>
      <Navbar
        handleOnClickPerPage={handleSelectChange}
        handleOnClickType={handleTypeChange}
        handleOnChange={handleChange}
        handleAtoZ = {sortfromAtoZ}
        handleZtoA = {sortfromZtoA}
        selectedType={selectedType}
        pokemonPerPage={pokemonPerPage}
      />
      {filteredPokemon !== null ? (
        <PokemonList pokemons={filteredPokemon} />
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </>
  )
}

export default Home
