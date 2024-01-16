import {
  type PokemonListResponse,
  type IndexedPokemon,
  type ListPokemon,
  type IType,
  type  PokemonByTypeListResponse,
} from '../interfaces/pokemon.interface'
import { useState, useEffect, type Dispatch } from 'react'
import { POKEMON_API_POKEMON_URL, POKEMON_IMAGES_BASE_URL } from '../constants'
import axios from 'axios'

interface ReturningValues {
  pokemons: ListPokemon[]
  goToPage: (pageNumber: number) => void
  currentPage: number
  totalPages: number
  setPokemons:Dispatch<React.SetStateAction<ListPokemon[]>>
  setSelectedType:Dispatch<React.SetStateAction<IType | null>>
  selectedType:IType | null
  fetchPokemons: (pokemonPerPage:number) => Promise<void>;
  fetchPokemonsByType: () => Promise<void>;
}

const usePokemons = (pokemonsPerPage: number): ReturningValues => {

  const [pokemons, setPokemons] = useState<ListPokemon[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedType , setSelectedType] = useState<IType | null>(null);
  
  useEffect(() => {
    if(selectedType != null){
      void fetchPokemonsByType()
    }else{
      void fetchPokemons(pokemonsPerPage);
    }
  }, [currentPage, pokemonsPerPage , selectedType])

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

  const fetchPokemonsByType = async (): Promise<void> => {
    if (selectedType !== null) {
      try {
        const result = await axios.get<PokemonByTypeListResponse>(selectedType.url);
        const listPokemons = result.data.pokemon.map((p) =>
          indexedPokemonToListListPokemon(p.pokemon)
        );
  
        const startIndex = (currentPage - 1) * pokemonsPerPage;
        const endIndex = startIndex + pokemonsPerPage;
        const paginatedPokemons = listPokemons.slice(startIndex, endIndex);
  
        setPokemons(paginatedPokemons);
        setTotalPages(Math.ceil(listPokemons.length / pokemonsPerPage));
      } catch (error) {
        console.error('Error fetching pokemons by type:', error);
      }
    }
  };
  
  

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
    setPokemons,
    setSelectedType,
    selectedType,
    fetchPokemons,
    fetchPokemonsByType
  }
}

export default usePokemons
