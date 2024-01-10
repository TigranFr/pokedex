import React, { useState } from 'react'
import { Container } from '@mui/material'
import PokemonList from '../components/PokemonList'
import usePokemons from '../hooks/usePokemons'
import Pagination from '../components/Pagination' // Import your Pagination component
import Navbar from './Navbar/Navbar'

const Home = (): JSX.Element => {
  const [pokemonPerPage, setPokemonPerPage] = useState<number>(10)
  const { pokemons, goToPage, currentPage, totalPages } = usePokemons(pokemonPerPage)

  const handleSelectChange = (pokemonPerPage:number): void => {
    setPokemonPerPage(pokemonPerPage);
  }

  return (
    <Container>
      <Navbar handleOnClick={handleSelectChange}/>
      <PokemonList pokemons={pokemons} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </Container>
  )
}

export default Home
