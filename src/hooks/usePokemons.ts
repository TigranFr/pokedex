import {
  type PokemonListResponse,
  type IndexedPokemon,
  type ListPokemon,
} from '../interfaces/pokemon.interface'
import { useState, useEffect } from 'react'
import { POKEMON_API_POKEMON_URL, POKEMON_IMAGES_BASE_URL } from '../constants'
import axios from 'axios'

interface ReturningValues {
  pokemons: ListPokemon[]
  goToPage: (pageNumber: number) => void
  currentPage: number
  totalPages: number
}

const usePokemons = (pokemonsPerPage: number): ReturningValues => {
  const [pokemons, setPokemons] = useState<ListPokemon[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    void fetchPokemons(pokemonsPerPage)
  }, [currentPage, pokemonsPerPage])

  const indexedPokemonToListListPokemon = (
    indexedPokemon: IndexedPokemon
  ): ListPokemon => {
    const pokedexNumber = parseInt(
      indexedPokemon.url
        .replace(`${POKEMON_API_POKEMON_URL}/`, '')
        .replace('/', '')
    )

    const listPokemon: ListPokemon = {
      name: indexedPokemon.name,
      url: indexedPokemon.url,
      image: `${POKEMON_IMAGES_BASE_URL}/${pokedexNumber}.png`,
      pokedexNumber,
    }
    return listPokemon
  }

  const fetchPokemons = async (pokemonsPerPage: number): Promise<void> => {
    try {
      const result = await axios.get<PokemonListResponse>(
        `${POKEMON_API_POKEMON_URL}?offset=${
          (currentPage - 1) * pokemonsPerPage
        }&limit=${pokemonsPerPage}`
      )
      const listPokemons = result.data.results.map((indexedPokemon) =>
        indexedPokemonToListListPokemon(indexedPokemon)
      )
      setPokemons(listPokemons)
      setTotalPages(Math.ceil(result.data.count / pokemonsPerPage))
    } catch (error) {
      console.error('Error fetching pokemons:', error)
    }
  }

  const goToPage = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  return {
    pokemons,
    goToPage,
    currentPage,
    totalPages,
  }
}

export default usePokemons
