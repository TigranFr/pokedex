import React, { useState } from 'react'
import PokemonList from '../components/PokemonList/PokemonList'
import usePokemons from '../hooks/usePokemons'
import Pagination from '../components/Pagination'
import Navbar from './Navbar/Navbar'
import {type ListPokemon, type IType } from '../interfaces/pokemon.interface'

const Home = (): JSX.Element => {
  const [pokemonPerPage, setPokemonPerPage] = useState<number>(10);
  const [filteredPokemon, setFilteredPokemn] = useState<ListPokemon[] | null>(null)
 
  const {
    pokemons,
    goToPage,
    currentPage,
    totalPages,
    selectedType,
    setSelectedType,
    setPokemons,
    fetchPokemons,
    fetchPokemonsByType
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
  


  const handleChange = (pName:string):void => {
    if(pName !== ""){
     const pokemon = pokemons.filter((pokemon) => {
        return pokemon.name === pName;
      })
      setFilteredPokemn(pokemon);
    }else{
      setFilteredPokemn(null);
      if(selectedType !== null){
        void fetchPokemonsByType()
      }else{
        void fetchPokemons(pokemonPerPage);
      }
    }
  }

  return (
    <>
      <Navbar
        handleOnClickPerPage={handleSelectChange}
        handleOnClickType={handleTypeChange}
        handleOnChange = {handleChange}
        selectedType={selectedType}
        pokemonPerPage={pokemonPerPage}
      />
      {filteredPokemon !== null ? <PokemonList pokemons={filteredPokemon} /> :  <PokemonList pokemons={pokemons} />
}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </>
  )
}

export default Home
